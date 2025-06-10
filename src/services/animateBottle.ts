

export async function animateBottle(svgPaths: string[], color: string, container: HTMLDivElement) {

  const audio = new Audio("/sounds/pop.mp3");
  audio.play();

  for (let i = 0; i < svgPaths.length; i++) {
    const res = await fetch(svgPaths[i]);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");

    if (!svg) continue;

    svg.setAttribute("width", "300");
    svg.setAttribute("height", "300");

    const fill = svg.querySelectorAll(".fill");
    if (fill.length > 0) {
      fill.forEach(el => el.setAttribute("fill", color));
    } else {
      svg.style.color = color;
    }

    container.innerHTML = "";
    container.appendChild(svg);
    await new Promise(res => setTimeout(res, 300));
  }
}



export const familyColors: Record<string, string> = {
  Frutal: "#FF7A00",              // Naranja vibrante tipo durazno
  Ahumado: "#4B3621",             // Marrón oscuro profundo con toque carbón
  Alcanforado: "#1ABC9C",         // Verde azulado fresco e intenso
  Aldehídico: "#BDC3C7",          // Gris metálico claro, limpio y sintético
  Almizclado: "#9B59B6",          // Lila profundo, más sensual
  Amaderado: "#6E4712",           // Marrón cálido con matiz verde musgoso
  Ámbar: "#C0392B",               // Rojo oscuro ámbar resinoso
  Cítrico: "#F1C40F",             // Amarillo cítrico vibrante (limón/mandarina)
  Empolvado: "#A569BD",           // Violeta empolvado pero más saturado
  Especiado: "#D35400",           // Naranja rojizo tipo canela/pimienta
  Floral: "#E91E63",              // Rosa fuerte tipo pétalo intenso
  Gourmand: "#D68910",            // Caramelo tostado dorado
  Herbal: "#229954",              // Verde hoja fresco e intenso
  "Hierbas aromáticas": "#1E8449", // Verde más profundo, tipo romero o albahaca
  Marino: "#1F618D",              // Azul marino con matices oceánicos
  Mentolado: "#17A589",           // Verde mentolado frío y brillante
  Terroso: "#5D6D3D",             // Verde-marrón tipo musgo o tierra húmeda
};

export function getColorByFamily(family: string): string {
  return familyColors[family] || "#8e44ad"; 
}


