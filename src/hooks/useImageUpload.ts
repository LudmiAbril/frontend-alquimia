"use client";

import { useState } from "react";

export function useImageUpload() {
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 10) {
      setMessage("Máximo 10 imágenes");
      return;
    }
    setImages([...images, ...selectedFiles]);
    setMessage("");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (images.length + droppedFiles.length > 10) {
      setMessage("Máximo 10 imágenes");
      return;
    }
    setImages([...images, ...droppedFiles]);
    setMessage("");
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setMessage("");
  };

  return {
    images,
    handleImageUpload,
    handleDrop,
    handleRemoveImage,
    message,
  };
}
