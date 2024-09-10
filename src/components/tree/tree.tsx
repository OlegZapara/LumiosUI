"use client";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import gridGuide from "cytoscape-grid-guide";
import { useTheme } from "next-themes";
import { useContext, useEffect, useRef } from "react";
import { InterFont } from "@/lib/fonts";
import { TreeContext } from "./tree-context";

cytoscape.use(dagre);
gridGuide(cytoscape);

export default function Tree() {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const theme = useTheme();
  const { setActive } = useContext(TreeContext)!;

  useEffect(() => {
    // Initialize Cytoscape with Dagre layout
    const treeColor = theme.theme === "dark" ? "#FFF" : "#000";
    const fontColor = theme.theme === "dark" ? "#000" : "#FFF";
    cyRef.current = cytoscape({
      container: document.getElementById("cy"), // Container for Cytoscape
      maxZoom: 5,
      minZoom: 0.75,
      elements: [
        { data: { id: "a", value: "123123123" } },
        { data: { id: "b", value: "12323" } },
        { data: { id: "c", value: "123" } },
        { data: { id: "d", value: "1232" } },
        { data: { id: "e", value: "123" } },
        { data: { source: "a", target: "b" } },
        { data: { source: "a", target: "c" } },
        { data: { source: "b", target: "d" } },
        { data: { source: "c", target: "e" } },
      ],

      layout: {
        name: "dagre",
      },

      style: [
        {
          selector: "node",
          style: {
            "z-index": 10,
            color: `${fontColor}`,
            "padding-bottom": "5px",
            "padding-top": "5px",
            "padding-left": "5px",
            "padding-right": "5px",
            "background-color": `${treeColor}`,
            "text-valign": "center",
            "text-halign": "center",
            "text-max-width": "80%",
            "font-size": "10px",
            label: "data(value)",
            "border-width": "1px",
            "border-color": "#000", // Default border color
            "border-style": "double",
            ...InterFont.style,
          },
        },
        {
          selector: "edge",
          style: {
            "z-index": 9,
            width: 3,
            "line-color": `${treeColor}`,
            "target-arrow-color": `${treeColor}`,
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
    });

    cyRef.current.gridGuide({
      drawGrid: true,
      snapToGridOnRelease: false, // Snap to grid on release
      gridStackOrder: -1, // Namely z-index
      gridColor: "#dedede", // Color of grid lines
      panGrid: true,
      lineWidth: 1.0, // Width of grid lines
      gridSpacing: 50,
    });

    const adjustTextSize = () => {
      if (!cyRef.current) return;
      cyRef.current.nodes().forEach((node) => {
        const nodeWidth = node.width();
        const nodeHeight = node.height();
        const text = node.data("value");

        // Estimate the font size based on the node size
        let fontSize = Math.min(
          (nodeWidth / text.length) * 1.5,
          nodeHeight / 2,
        );
        if (fontSize < 6) fontSize = 6; // Set a minimum font size

        node.style("font-size", `${fontSize}px`);
      });
    };

    const updateNodeStyles = () => {
      if (!cyRef.current) return;
      cyRef.current.nodes().forEach((node) => {
        const adjacentCount = node.outgoers("node").size(); // Count of adjacent nodes
        let borderColor = "#000"; // Default border color

        if (adjacentCount === 2) {
          borderColor = "#22c55e"; // green-500
        } else if (adjacentCount === 1) {
          borderColor = "#3b82f6"; // blue-500
        } else if (adjacentCount === 0) {
          borderColor = "#ef4444"; // red-500
        }

        node.style("border-color", borderColor);
      });
    };

    cyRef.current.on("tap", "node", (event) => {
      const node = event.target;
      console.log("Node clicked:", node.id());
      setActive(node.id());
    });

    cyRef.current.on("tap", (event) => {
      if (event.target === cyRef.current) {
        console.log("Background clicked");
        setActive(null);
      }
    });

    cyRef.current.layout({ name: "dagre" }).run();
    adjustTextSize();
    updateNodeStyles();

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.theme]);

  return <div id="cy" className="z-10 h-[calc(100vh-4rem)] w-full" />;
}
