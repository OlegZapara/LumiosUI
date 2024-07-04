import { getPhoto } from "@/actions/auth-actions";
import { useEffect, useState } from "react";

async function getChatPhoto(chatId: number): Promise<[string, boolean]> {
  try {
    const data = await getPhoto(chatId);
    const image = new Blob(data, { type: "image/jpeg" });
    return [URL.createObjectURL(image), true];
  } catch (e) {
    console.error("Failed to get chat photo", e);
    return ["", false];
  }
}

export function useChatImage(chatId: number) {
  const [image, setImage] = useState("");
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      const [image, isImage] = await getChatPhoto(chatId);
      setImage(image);
      setIsImage(isImage);
    };
    fetchPhoto();
  }, [chatId]);

  return { image, isImage };
}
