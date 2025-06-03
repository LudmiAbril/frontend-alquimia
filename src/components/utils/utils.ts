import { StepData } from "@/components/utils/typing";
import { Supplier } from "@/components/utils/typing";


/*################OLFACTORY TEST###################*/
export const colorMap: Record<string, string> = {
  A: "border-customA hover:bg-customA",
  B: "border-customB hover:bg-customB",
  C: "border-customC hover:bg-customC",
  D: "border-customD hover:bg-customD",
}


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

export const howSteps: StepData[] = [
  {
    image: "/LandingImage/Steps/Step1Creation.svg",
    alt: "Diseñá tu fragancia",
    text: "Crea tu propio perfume.",
  },
  {
    image: "/LandingImage/Steps/Step2Supplier.svg",
    alt: "Personalizá el frasco",
    text: "Contactate con los proveedores.",
  },
  {
    image: "/LandingImage/Steps/Step3Materials.svg",
    alt: "Recibí tus esencias",
    text: "Recibi tus insgredientes.",
  },
];
/*################################FAQ-LANDING#############################################################*/

export const faqQuestions = [
  {
    question: "¿Cómo funciona Alquimia?",
    answer:
      "Alquimia te permite crear perfumes eligiendo tus notas favoritas, combinándolas y personalizando tu envase desde nuestra plataforma interactiva.",

  },
  {
    question: "¿Cómo funciona el proceso de creación?",
    answer: "Elegís tus notas favoritas, las combinás en una fórmula y personalizás el frasco. Nosotros te guiamos en cada paso."

  },
  {
    question: "¿Es seguro comprar en Alquimia?",
    answer: "Sí, usamos sistemas de pago seguros como Mercado Pago y cumplimos con estándares de protección de datos."
  },
  {
    question: "¿Qué pasa si tengo un problema con mi pedido?",
    answer: "Contamos con soporte para ayudarte en caso de errores o problemas con tu entrega."
  },
  {
    question: "¿Cómo me registro como proveedor?",
    answer: "Desde el botón 'Quiero ser proveedor' en el menu de perfil,  completás tus datos y seguís un proceso de validación."
  },
  {
    question: "¿Cuántos perfumes puedo guardar en mi biblioteca?",
    answer: "No hay un límite definido por ahora."
  },
];

/*################################NAVBAR-DROPDOWN#############################################################*/

export const userMenuItems = [
  { label: "Mis Fórmulas", href: "/perfil/formulas" },
  { label: "Mi Biblioteca", href: "/perfil/biblioteca" },
  { label: "Mi Cuenta", href: "/perfil/cuenta" },
  { label: "Cerrar Sesión", href: "/logout" },
];



/*################################ - TEST LANDING IMAGES - #############################################################*/

export const families = [
  { name: "Orientales", src: "/LandingImage/Test/oriental.png", alt: "orientalFamily" },
  { name: "Floral", src: "/LandingImage/Test/floral.png", alt: "floralFamily" },
  { name: "Frescas", src: "/LandingImage/Test/fresca.png", alt: "frescasFamily" },
  { name: "Amaderada", src: "/LandingImage/Test/amaderada.png", alt: "amaderadaFamily" },
];


export const suppliers: Supplier[] = [
  {
    name: "Le Flour",
    imageSrc: "/LandingImage/Suplier/leflour.jpeg",
  },
  {
    name: "Aromatika",
    imageSrc: "/LandingImage/Suplier/aromatika.jpeg",
  },
  {
    name: "Glassbottles",
    imageSrc: "/LandingImage/Suplier/glass.jpeg",
  },
  {
    name: "Aromaskym",
    imageSrc: "/LandingImage/Suplier/aromaskym.png",
  },
  {
    name: "Essentia",
    imageSrc: "/LandingImage/Suplier/glass.jpeg",
  },
  {
    name: "NaturaLab",
    imageSrc: "/LandingImage/Suplier/aromatika.jpeg",
  },
];

/*################################ - MENSAJES QUIMI - #############################################################*/
export const messages = [
 "¡Bienvenide al mundo de los aromas!",
  "Tu esencia perfecta está cerca...",
  "Explorá las notas... yo cuido la magia",
  "Tu fragancia habla por vos, ¡creala!"
];
