

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
  Frutal: "#F5A623",
  Ahumado: "#6E2C00",
  Alcanforado: "#76D7C4",
  Aldehídico: "#E5E8E8",
  Almizclado: "#D7BDE2",
  Amaderado: "#935116",
  Ámbar: "#D98880",
  Cítrico: "#F9E79F",
  Empolvado: "#F5EEF8",
  Especiado: "#CD6155",
  Floral: "#EC407A",
  Gourmand: "#F8C471",
  Herbal: "#58D68D",
  "Hierbas aromáticas": "#45B39D",
  Marino: "#5DADE2",
  Mentolado: "#48C9B0",
  Terroso: "#935116",
};

export function getColorByFamily(family: string): string {
  return familyColors[family] || "#8e44ad"; 
}


