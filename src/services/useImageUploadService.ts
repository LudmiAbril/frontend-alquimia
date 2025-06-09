

import { CloudinaryResponse } from "@/components/utils/typing";
import { useState } from "react";


export function useImageUpload() {
  const [images, setImages] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const cloudName = "dxnwcmh1j";
  const uploadPreset = "alquimia-productos"; 

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setMessage("");
    setImages(files);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data: CloudinaryResponse = await res.json();

        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          setMessage("Error al subir la imagen.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        setMessage("Error de red al subir la imagen.");
      }
    }

    setUrls(uploadedUrls);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const fileInputEvent = {
      target: { files },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleImageUpload(fileInputEvent);
  };

  return {
    images,
    urls, //  acá accedés a las URLs de Cloudinary
    message,
    handleImageUpload,
    handleRemoveImage,
    handleDrop,
  };
}
