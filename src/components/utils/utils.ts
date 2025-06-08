import { ProviderFormData, StepData } from "@/components/utils/typing";
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
  "Esencia",
  "Packaging",
  "Envase",
  "Alcohol",
  "Agua Destilada",
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
    alt: "Creá tu fragancia",
    text: "Creá tu propio perfume.",
  },
  {
    image: "/LandingImage/Steps/Step2Supplier.svg",
    alt: "Personalizá el frasco",
    text: "Contactate con los proveedores.",
  },
  {
    image: "/LandingImage/Steps/Step3Materials.svg",
    alt: "Recibí tus esencias",
    text: "Recibí tus ingredientes.",
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
  { label: "Mis Fórmulas", href: "/profile/Formulas" },
  { label: "Mi Biblioteca", href: "/profile/Library" },
  { label: "Mi Cuenta", href: "/profile/Account" },
  { label: "Cerrar Sesión", href: "/logout" },
];

export const providerMenuItems = [
  { href: "/home", label: "Home" },
  { href: "/subirProducto", label: "Subir Producto" },
  { href: "/cuenta", label: "Mi Cuenta" },
  { href: "/logout", label: "Cerrar Sesión" },
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
export const messagesLanding = [
 "¡Bienvenidos al mundo de los aromas!",
  "Tu esencia perfecta está cerca...",
  "Explorá las notas... yo cuido la magia",
  "Tu fragancia habla por vos, ¡creala!"
];


export const proveedorMessages = [
  "¿Listo para vender tus creaciones?",
  "Subí tus productos y empezá a perfumar el mundo.",
  "¡Los aromas esperan por vos, proveedor!",
];

/*################################ - CONSTANTES RREGISTRO PROVEDOR - #############################################################*/

export const initialFormData: ProviderFormData = {
  email: "",
  password: "",
  empresa: "",
  cuil: "",
  productosSeleccionados: [],
  otroProducto: "",
  rubro: "",
  tarjeta: {
    nombre: "",
    numero: "",
    vencimiento: "",
    cvc: "",
  },
};


export const PRODUCT_OPTIONS = [
  "Esencias",
  "Envases",
  "Alcohol",
  "Fijadores",
  "Etiquetas",
  "Otro",
];
/*################################ - QUIZ - #############################################################*/
export const familyDescriptions: Record<string, string> = {
  Fresca:
    "¿A qué huele? A una ráfaga de aire puro después de una tormenta de verano. Notas chispeantes de limón, menta y hojas verdes que despiertan tus sentidos como si tomaras una poción de vitalidad líquida. Son fragancias que limpian el alma y refrescan el día como magia embotellada.",

  Floral:
    "¿A qué huele? A un jardín secreto al amanecer. Rosas aterciopeladas, jazmines enredados y peonías en flor danzan en el viento. Las fragancias florales son como un conjuro de ternura: románticas, etéreas y cargadas de poesía.",

  Amaderada:
    "¿A qué huele? A senderos escondidos entre árboles antiguos. Cedro, sándalo y vetiver te envuelven como un hechizo cálido y terroso. Son perfumes con alma de bosque encantado, donde cada nota parece susurrar una historia ancestral.",

  Oriental:
    "¿A qué huele? A misterios bajo la luz de las velas. Canela, ámbar, vainilla y especias envuelven el aire como un conjuro dulce y seductor. Las fragancias orientales son hechizos sensuales, que dejan un aura encantada tras cada paso.",
}


  export const familyPet: Record<string, string> = {
    "Fresca": "/mascotas/fresca.png",
    "Floral": "/mascotas/floral.png",
    "Amaderada": "/mascotas/amaderada.png",
    "Oriental": "/mascotas/oriental.png",
  }
export const backgroundByFamily: Record<string, string> = {
  "Fresca": "/quiz/familia-fondos/frescaBack.png",
  "Floral": "/quiz/familia-fondos/floralBack.png",
  "Amaderada": "/quiz/familia-fondos/amaderadaBack.png",
  "Oriental": "/quiz/familia-fondos/orientalBack.png",
}

export const answerSummaryMap: Record<number, Record<string, {
  label: string
  value: string
  icon: string
  color: string
}>> = {
  1: {
    "1": { label: "Tipo de piel", value: "Muy clara → tiende a fresca o floral", icon: "🧴", color: "#CFE2F3" },
    "2": { label: "Tipo de piel", value: "Clara a media → tiende a floral o cítrica", icon: "💧", color: "#D9EAD3" },
    "3": { label: "Tipo de piel", value: "Morena → tiende a oriental o gourmand", icon: "🔥", color: "#FCE5CD" },
    "4": { label: "Tipo de piel", value: "Muy oscura → tiende a amaderada o especiada", icon: "🌳", color: "#EAD1DC" },
  },
  2: {
    "1": { label: "Estilo de presencia", value: "Que me recuerden cuando paso → Oriental, Amaderada", icon: "👃", color: "#F4CCCC" },
    "2": { label: "Estilo de presencia", value: "Que solo quien se acerque lo note → Fresca, Floral", icon: "🌸", color: "#D9EAD3" },
  },
  3: {
    "1": { label: "Sensación preferida", value: "Limpieza y frescura → Fresca, Cítrica", icon: "🧼", color: "#C9DAF8" },
    "2": { label: "Sensación preferida", value: "Suavidad y ternura → Floral, Almizclada", icon: "🧸", color: "#EAD1DC" },
    "3": { label: "Sensación preferida", value: "Intensidad y misterio → Oriental, Ámbar", icon: "🌙", color: "#FCE5CD" },
    "4": { label: "Sensación preferida", value: "Calidez y profundidad → Amaderada, Terrosa", icon: "🌲", color: "#D0E0E3" },
  },
  4: {
    "1": { label: "Estación favorita", value: "Verano → Cítrica, Marina, Frutal", icon: "☀️", color: "#FFF2CC" },
    "2": { label: "Estación favorita", value: "Primavera → Floral, Herbal", icon: "🌼", color: "#D9EAD3" },
    "3": { label: "Estación favorita", value: "Otoño → Amaderada, Especiada", icon: "🍂", color: "#F9CB9C" },
    "4": { label: "Estación favorita", value: "Invierno → Oriental, Almizclada", icon: "❄️", color: "#D0E0E3" },
  },
  5: {
    "1": { label: "Aroma evocador", value: "Un ramo de flores → Floral", icon: "💐", color: "#EAD1DC" },
    "2": { label: "Aroma evocador", value: "Un bosque húmedo → Amaderada, Terrosa", icon: "🌲", color: "#CFE2F3" },
    "3": { label: "Aroma evocador", value: "Frutas dulces o caramelos → Gourmand, Frutal", icon: "🍭", color: "#FCE5CD" },
    "4": { label: "Aroma evocador", value: "Aire puro y mentolado → Mentolado, Herbal", icon: "🍃", color: "#D9EAD3" },
  },
  6: {
    "1": { label: "Experiencia sensorial", value: "Spa con aceites frescos → Herbal, Mentolado", icon: "💆", color: "#D9EAD3" },
    "2": { label: "Experiencia sensorial", value: "Casa cálida con dulces y especias → Oriental, Gourmand", icon: "🍪", color: "#FCE5CD" },
    "3": { label: "Experiencia sensorial", value: "Jardín al atardecer → Floral", icon: "🌷", color: "#EAD1DC" },
    "4": { label: "Experiencia sensorial", value: "Playa solitaria con brisa marina → Marino, Fresca", icon: "🌊", color: "#CFE2F3" },
  },
  7: {
    "1": { label: "Ambiente de paz", value: "Naturaleza con aves y árboles → Herbal, Terroso, Amaderado", icon: "🌳", color: "#D9EAD3" },
    "2": { label: "Ambiente de paz", value: "Habitación cálida y envolvente → Oriental, Empolvado, Gourmand", icon: "🕯️", color: "#FCE5CD" },
    "3": { label: "Ambiente de paz", value: "Entorno limpio y fresco → Fresca, Mentolado, Marino", icon: "💨", color: "#C9DAF8" },
    "4": { label: "Ambiente de paz", value: "Flores y música tranquila → Floral, Almizclado", icon: "🎶", color: "#EAD1DC" },
  },
  8: {
    "1": { label: "Sensación ideal", value: "Refrescado y ligero → Fresca, Cítrica", icon: "🧊", color: "#C9DAF8" },
    "2": { label: "Sensación ideal", value: "Atractivo y seductor → Oriental, Ámbar", icon: "💋", color: "#F4CCCC" },
    "3": { label: "Sensación ideal", value: "Abrazado y cómodo → Floral, Almizclado", icon: "🫂", color: "#EAD1DC" },
    "4": { label: "Sensación ideal", value: "Confiado y fuerte → Amaderada, Ahumada", icon: "💪", color: "#D9D2E9" },
  },
  9: {
    "1": { label: "Fragancia especial", value: "Dulce y especiada → Oriental, Especiada, Gourmand", icon: "🍰", color: "#FCE5CD" },
    "2": { label: "Fragancia especial", value: "Suave y floral → Floral, Empolvado", icon: "🌸", color: "#EAD1DC" },
    "3": { label: "Fragancia especial", value: "Naturaleza y pureza → Fresca, Herbal", icon: "🌿", color: "#D9EAD3" },
    "4": { label: "Fragancia especial", value: "Profundo y elegante → Amaderada, Almizclada", icon: "🎩", color: "#D9D2E9" },
  },
  10: {
    "1": { label: "Duración del perfume", value: "Suave como Body Splash", icon: "🫧", color: "#CFE2F3" },
    "2": { label: "Duración del perfume", value: "Equilibrado como Eau de Toilette", icon: "🧴", color: "#D9D2E9" },
    "3": { label: "Duración del perfume", value: "Intenso como Eau de Parfum", icon: "🌌", color: "#F4CCCC" },
  }
};


export const familiesQuiz = [
  {
    id: 1,
    name: "Amaderada",
    image: "/mascotas/amaderada.png",
    description: "Profunda, misteriosa y cálida. Ideal para quienes aman la elegancia natural."
  },
  {
    id: 2,
    name: "Floral",
    image: "/mascotas/floral.png",
    description: "Delicada, romántica y luminosa. Un bouquet que celebra la sensibilidad."
  },
  {
    id: 3,
    name: "Fresca",
    image: "/mascotas/fresca.png",
    description: "Pura, revitalizante y ligera. Para quienes irradian energía."
  },
  {
    id: 4,
    name: "Oriental",
    image: "/mascotas/oriental.png",
    description: "Exótica, intensa y envolvente. Perfecta para almas magnéticas."
  }
]

 export const messages = [
    [
      "Las familias olfativas son grupos de perfumes con aromas parecidos porque comparten ingredientes clave.",
    ],    [
      "Te ayudan a entender qué fragancias van con vos. ¡Es como tener una brújula aromática!"
    ],
    [
      "Cada familia tiene su personalidad. Algunas son frescas y chispeantes, otras cálidas y misteriosas.",
    ],
        [
      "Explorarlas es descubrir un poco más sobre vos."
    ]
  ]


export const PROVIDER_TABS = [
  { label: "Home", value: "home" },
  { label: "Productos", value: "products" },
  { label: "Tipo de productos", value: "types" },
  
]

export const STATUS_OPTIONS = [
  { label: "Todos", value: "all" },
  { label: "Aprobados", value: "approved" },
  { label: "Pendientes", value: "pending" },
] as const;


export const attributesProduct = [
  { label: "Vegano", value: "vegano" },
  { label: "Hipoalergénico", value: "hipo" },
  { label: "Sin parabenos", value: "paraben" },
];

