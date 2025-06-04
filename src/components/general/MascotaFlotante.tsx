"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FloatingMascotProps } from "../utils/typing";

export default function FloatingMascot({ messages, imageSrc = "/Quimi/quimiLanding.png" }: FloatingMascotProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      const random = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[random]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    isVisible && (
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 animate-fade-in">
        <div className="bg-white text-sm text-[#444] p-3 rounded-xl shadow-lg max-w-[220px]">
          {currentMessage}
        </div>

        <Image
          src={imageSrc}
          alt="Quimi"
          width={70}
          height={70}
          className="scale-x-[-1] drop-shadow-md cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setIsVisible(false)}
        />
      </div>
    )
  );
}
