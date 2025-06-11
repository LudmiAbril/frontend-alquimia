"use client";

import { useEffect, useState } from "react";

interface InlineSVGIconProps {
  url: string;
  className?: string;
}

export default function InlineSVGIcon({ url, className }: InlineSVGIconProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchSVG = async () => {
      try {
        const response = await fetch(url);
        let text = await response.text();

        // Eliminar ancho, alto y fills fijos
        text = text
          .replace(/\s(width|height)="[^"]*"/g, "")
          .replace(/\sfill="[^"]*"/g, "");

        // Agregar fill="currentColor" y class al <svg>
        text = text.replace(
          /<svg([^>]+)>/,
          `<svg$1 fill="currentColor" class="${className ?? ""}">`
        );

        setSvgContent(text);
      } catch (error) {
        console.error("Error al cargar SVG:", error);
      }
    };

    fetchSVG();
  }, [url, className]);

  if (!svgContent) return null;

  return (
    <div
      className="inline-block w-6 h-6"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
