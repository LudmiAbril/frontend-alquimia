/*################TEST OLFATIVO###################*/
export const familias = {
  acuatica: {
    texto: "Marinas/Cítricas.",
    color: "#66cccc",
    descripcion: "Fragancias frescas inspiradas en el mar, ideales para días cálidos.",
    imagen: "./img/familias/acuatica.jpg",
  },
  frutal: {
    texto: "Frutales/Florales.",
    color: "#ff6699",
    descripcion: "Notas jugosas y dulces como frutas del trópico y flores exóticas.",
    imagen: "./img/familias/frutal.jpg",
  },
  madera: {
    texto: "Amaderadas/Especiadas.",
    color: "#cc9966",
    descripcion: "Aromas cálidos y terrosos, elegantes y envolventes.",
    imagen: "./img/familias/madera.jpg",
  },
  ambarada: {
    texto: "Gourmand/Ambaradas.",
    color: "#9966cc",
    descripcion: "Esencias dulces, profundas y sensuales como la vainilla y el ámbar.",
    imagen: "./img/familias/ambarada.jpg",
  },
};

export const svgPaths = [
  "/potion/potion00.svg",
  "/potion/potion01.svg",
  "/potion/potion03.svg",
  "/potion/potion04.svg",
];
/*################################PROVEEDORES#############################################################*/
export const productosMasVendidos = [
  {
    nombre: "Esencia Vainilla",
    precio: 5900,
    categoria: "Aromática",
    imagen: "/productos/esencia-vainilla.png",
  },
  {
    nombre: "Alcohol etílico",
    precio: 2000,
    categoria: "Disolvente",
    imagen: "/productos/alcohol.png",
  },
  {
    nombre: "Recipiente artesanal",
    precio: 16200,
    categoria: "Botella",
    imagen: "/productos/frasco-artesanal.png",
  },
  {
    nombre: "Esencia Vainilla Premium",
    precio: 9500,
    categoria: "Aromática",
    imagen: "/productos/esencia-vainilla-premium.png",
  },
];
  export const categorias = ["Esencias", "Packaging", "Envases", "Alcoholes", "Aguas Destiladas"];


/*################################CARDS-LANDING#############################################################*/

  export const pasos = [
    { image: "/steps/seleccionar.png", alt: "Seleccioná", text: "Seleccioná las esencias" },
    { image: "/steps/combinar.png", alt: "Combiná", text: "Combiná las notas" },
    { image: "/steps/diseniar.png", alt: "Diseñá", text: "Diseñá tu packaging" },
    { image: "/steps/provedores.png", alt: "Contactate", text: "Contactate con los proveedores" },
    { image: "/steps/entrega.png", alt: "Recibí", text: "Recibí tus ingredientes" },
  ];

/*################################Preguntas-LANDING#############################################################*/

  export const preguntas = [
    {
        pregunta: "¿Por qué elegir Alquimia para crear tu perfume?",
        respuesta:
            "Porque ofrecemos una experiencia creativa, accesible y guiada para que cualquier persona pueda crear su fragancia personalizada sin necesidad de conocimientos previos.",
    },
    {
        pregunta: "¿Cómo crear tu propio perfume online?",
        respuesta:
            "Usá nuestro editor interactivo para elegir tus notas favoritas, combinarlas en una fórmula y personalizar tu envase antes de conectarte con proveedores.",
    },
    {
        pregunta: "¿Cómo funciona Alquimia?",
        respuesta:
            "Alquimia te permite crear perfumes eligiendo tus notas favoritas, combinándolas y personalizando tu envase desde nuestra plataforma interactiva.",
    },
    {
        pregunta: "¿Necesito conocimientos previos?",
        respuesta:
            "No, nuestra experiencia está diseñada para guiarte paso a paso en todo momento.",
    },
    {
        pregunta: "¿Puedo comprar ingredientes desde la plataforma?",
        respuesta:
            "Sí. Te conectamos con proveedores registrados que ofrecen materias primas como esencias, frascos y más.",
    },
];

/*################################ElementosNube-LANDING#############################################################*/

export const elementosMenu = [
  { etiqueta: "Mis Fórmulas", href: "/perfil/formulas" },
  { etiqueta: "Mi Biblioteca", href: "/perfil/biblioteca" },
  { etiqueta: "Mi Cuenta", href: "/perfil/cuenta" },
  { etiqueta: "Cerrar Sesión", href: "/logout" },
];


