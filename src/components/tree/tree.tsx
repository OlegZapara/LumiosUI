"use client";
import { InterFont } from "@/lib/fonts";
import { ActiveNode, useTreeStore } from "@/state/tree-state";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import gridGuide from "cytoscape-grid-guide";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { data } from "./data";
import { v4 as uuid } from "uuid";

// import { ActiveNode, useTreeContext } from "./tree-context";

cytoscape.use(dagre);
gridGuide(cytoscape);

export default function Tree() {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const theme = useTheme();
  const state = useTreeStore();
  const treeColor = theme.theme === "dark" ? "#FFF" : "#000";
  const fontColor = theme.theme === "dark" ? "#000" : "#FFF";

  const [newNode, setNewNode] = useState<any>();

  useEffect(() => {
    cyRef.current = cytoscape({
      container: document.getElementById("cy"),
      maxZoom: 5,
      minZoom: 0.75,
      elements: data,
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
            label: "data(displayedValue)",
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
      snapToGridOnRelease: false,
      gridStackOrder: -1,
      gridColor: "#dedede",
      panGrid: true,
      lineWidth: 1.0,
      gridSpacing: 50,
    });

    cyRef.current.on("tap", "node", (event) => {
      const node = event.target;
      state.setActive({
        id: node.id(),
        value: node.data("value"),
      });
    });

    // cyRef.current.on("mouseover", "node", (event) => {
    //   const node = event.target;
    //   const newId = uuid();
    //   // TODO: display new nodes
    //   setNewNode(newId);
    //   const newNode = [
    //     { data: { id: newId, value: "0", displayedValue: "0" } },
    //     { data: { source: node.id(), target: newId } },
    //   ];
    //   data.push(...newNode);

    //   cyRef.current?.add(newNode);

    //   cyRef.current?.layout({ name: "dagre" }).run();

    //   updateNodeStyles(cyRef, state.activeNode);

    //   node.style("border-color", "#FFD700");
    // });

    // cyRef.current.on("mouseout", "node", (event) => {
    //   const node = event.target;
    //   const nodeToRemove = cyRef.current?.$(`node[id = "${newNode}"]`);
    //   if (nodeToRemove) {
    //     cyRef.current?.remove(nodeToRemove);
    //   }
    //   setNewNode(null);
    //   updateNodeStyles(cyRef, state.activeNode);
    // });

    cyRef.current.on("tap", (event) => {
      if (event.target === cyRef.current) {
        console.log("Background clicked");
        state.setActive(null);
      }
    });

    cyRef.current.layout({ name: "dagre" }).run();
    adjustTextSize(cyRef);
    updateNodeStyles(cyRef, state.activeNode);

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.theme, data]);

  useEffect(() => {
    displayChange(cyRef);
    adjustTextSize(cyRef);
    updateNodeStyles(cyRef, state.activeNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeNode, state.change]);

  function displayChange(cyRef: React.MutableRefObject<cytoscape.Core | null>) {
    if (!cyRef.current) return;
    cyRef.current.nodes().forEach((node) => {
      let change = 0;
      if (node.id() == state.activeNode?.id) {
        change = state.change;
      }
      const text = node.data("value");
      const value = parseInt(text);
      node.data("displayedValue", `${value + change}`);
    });
  }

  function adjustTextSize(
    cyRef: React.MutableRefObject<cytoscape.Core | null>,
  ) {
    if (!cyRef.current) return;
    cyRef.current.nodes().forEach((node) => {
      const nodeWidth = node.width();
      const nodeHeight = node.height();
      const text = node.data("displayedValue");

      let fontSize = Math.min((nodeWidth / text.length) * 1.5, nodeHeight / 2);
      if (fontSize < 6) fontSize = 6;

      node.style("font-size", `${fontSize}px`);
    });
  }

  function updateNodeStyles(
    cyRef: React.MutableRefObject<cytoscape.Core | null>,
    active: ActiveNode | null,
  ) {
    if (!cyRef.current) return;
    cyRef.current.nodes().forEach((node) => {
      const adjacentCount = node.outgoers("node").size();
      let borderColor = "#000";

      if (adjacentCount === 2) {
        borderColor = "#22c55e"; // green-500
      } else if (adjacentCount === 1) {
        borderColor = "#3b82f6"; // blue-500
      } else if (adjacentCount === 0) {
        borderColor = "#ef4444"; // red-500
      }
      node.style("border-color", borderColor);
    });
  }

  return <div id="cy" className="z-10 h-[calc(100vh-4rem)] w-full" />;
}
