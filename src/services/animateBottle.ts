

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
  Ahumado: "#777885",
  Alcanforado: "#76D7C4",
  Aldehídico: "#c8cfcf",
  Almizclado: "#a98ced",
  Amaderado: "#935116",
  Ámbar: "#f5b27f",
  Cítrico: "#ebda7a",
  Empolvado: "#d6cadb",
  Especiado: "#CD6155",
  Floral: "#EC407A",
  Gourmand: "#f0bdcf",
  Herbal: "#7cc265",
  "Hierbas aromáticas": "#2c7366",
  Marino: "#60d8f0",
  Mentolado: "#48C9B0",
  Terroso: "#8a6c4c",
};

export function getColorByFamily(family: string): string {
  return familyColors[family] || "#8e44ad"; 
}


