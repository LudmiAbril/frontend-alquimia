/*################OLFACTORY TEST###################*/
export const fragranceFamilies = {
  aquatic: {
    text: "Marinas/Cítricas.",
    color: "#66cccc",
    description: "Fragancias frescas inspiradas en el mar, ideales para días cálidos.",
    image: "./img/familias/acuatica.jpg",
  },
  fruity: {
    text: "Frutales/Florales.",
    color: "#ff6699",
    description: "Notas jugosas y dulces como frutas del trópico y flores exóticas.",
    image: "./img/familias/frutal.jpg",
  },
  woody: {
    text: "Amaderadas/Especiadas.",
    color: "#cc9966",
    description: "Aromas cálidos y terrosos, elegantes y envolventes.",
    image: "./img/familias/madera.jpg",
  },
  ambery: {
    text: "Gourmand/Ambaradas.",
    color: "#9966cc",
    description: "Esencias dulces, profundas y sensuales como la vainilla y el ámbar.",
    image: "./img/familias/ambarada.jpg",
  },
};

export const potionSvgPaths = [
  "/potion/potion00.svg",
  "/potion/potion01.svg",
  "/potion/potion03.svg",
  "/potion/potion04.svg",
];

/*################################SUPPLIERS#############################################################*/
export const bestSellingProducts = [
  {
    name: "Esencia Vainilla",
    price: 5900,
    category: "Aromática",
    image: "/productos/esencia-vainilla.png",
  },
  {
    name: "Alcohol etílico",
    price: 2000,
    category: "Disolvente",
    image: "/productos/alcohol.png",
  },
  {
    name: "Recipiente artesanal",
    price: 16200,
    category: "Botella",
    image: "/productos/frasco-artesanal.png",
  },
  {
    name: "Esencia Vainilla Premium",
    price: 9500,
    category: "Aromática",
    image: "/productos/esencia-vainilla-premium.png",
  },
];

export const productCategories = [
  "Esencias",
  "Packaging",
  "Envases",
  "Alcoholes",
  "Aguas Destiladas",
];

export const mockProducts = {
  "Más vendidos": [
    {
      name: "Esencia Vainilla",
      price: 9500,
      category: "por AROMATIKA",
      image: "/imgProductos/esenciaVainilla.png",
    },
    {
      name: "Alcohol etílico",
      price: 2000,
      category: "por AROMATIKA",
      image: "/imgProductos/alcohol.png",
    },
    {
      name: "Esencia Coco",
      price: 9200,
      category: "por BASICO",
      image: "/imgProductos/coco.png",
    },
    {
      name: "Recipiente artesanal",
      price: 16200,
      category: "por ILU PUR",
      image: "/imgProductos/artesanalbottle.png",
    },
  ],
  Essences: [
    {
      name: "Esencia Vainilla",
      price: 9500,
      category: "por AROMATIKA",
      image: "/imgProductos/esenciaVainilla.png",
    },
    {
      name: "Esencia Lavanda",
      price: 9800,
      category: "por NOW",
      image: "/imgProductos/lavanda.png",
    },
    {
      name: "Esencia Coco",
      price: 9200,
      category: "por BASICO",
      image: "/imgProductos/coco.png",
    },
    {
      name: "Esencia Jazmín",
      price: 9900,
      category: "por AROMATIKA",
      image: "/imgProductos/esenciaJazmin.png",
    },
    {
      name: "Esencia Sándalo",
      price: 9700,
      category: "por CAVALL",
      image: "/imgProductos/esenciaSandalo.png",
    },
    {
      name: "Esencia Frutilla",
      price: 9600,
      category: "por MR",
      image: "/imgProductos/esenciaFrutilla.png",
    },
    {
      name: "Esencia Manzana Verde",
      price: 9900,
      category: "por AAN PUR",
      image: "/imgProductos/esenciaManzana.png",
    },
    {
      name: "Esencia Naranja",
      price: 9500,
      category: "por EL CASTILLO",
      image: "/imgProductos/esenciaNaranja.png",
    },
  ],
  Bottles: [
    {
      name: "Recipiente artesanal",
      price: 16200,
      category: "por ILU PUR",
      image: "/imgProductos/artesanalbottle.png",
    },
    {
      name: "Envase vidrio",
      price: 9400,
      category: "por GLASSBOTTLES",
      image: "/imgProductos/glassbottle.png",
    },
    {
      name: "Envase blanco",
      price: 13200,
      category: "por GLASSBOTTLES",
      image: "/imgProductos/whitebottl.png",
    },
  ],
};

/*################################LANDING-CARDS#############################################################*/

export const creationSteps = [
  { image: "/steps/seleccionar.png", alt: "Seleccioná", text: "Seleccioná las esencias" },
  { image: "/steps/combinar.png", alt: "Combiná", text: "Combiná las notas" },
  { image: "/steps/diseniar.png", alt: "Diseñá", text: "Diseñá tu packaging" },
  { image: "/steps/provedores.png", alt: "Contactate", text: "Contactate con los proveedores" },
  { image: "/steps/entrega.png", alt: "Recibí", text: "Recibí tus ingredientes" },
];

/*################################FAQ-LANDING#############################################################*/

export const faqQuestions = [
  {
    question: "¿Por qué elegir Alquimia para crear tu perfume?",
    answer:
      "Porque ofrecemos una experiencia creativa, accesible y guiada para que cualquier persona pueda crear su fragancia personalizada sin necesidad de conocimientos previos.",
  },
  {
    question: "¿Cómo crear tu propio perfume online?",
    answer:
      "Usá nuestro editor interactivo para elegir tus notas favoritas, combinarlas en una fórmula y personalizar tu envase antes de conectarte con proveedores.",
  },
  {
    question: "¿Cómo funciona Alquimia?",
    answer:
      "Alquimia te permite crear perfumes eligiendo tus notas favoritas, combinándolas y personalizando tu envase desde nuestra plataforma interactiva.",
  },
  {
    question: "¿Necesito conocimientos previos?",
    answer:
      "No, nuestra experiencia está diseñada para guiarte paso a paso en todo momento.",
  },
  {
    question: "¿Puedo comprar ingredientes desde la plataforma?",
    answer:
      "Sí. Te conectamos con proveedores registrados que ofrecen materias primas como esencias, frascos y más.",
  },
];

/*################################NAVBAR-DROPDOWN#############################################################*/

export const userMenuItems = [
  { label: "Mis Fórmulas", href: "/perfil/formulas" },
  { label: "Mi Biblioteca", href: "/perfil/biblioteca" },
  { label: "Mi Cuenta", href: "/perfil/cuenta" },
  { label: "Cerrar Sesión", href: "/logout" },
];



