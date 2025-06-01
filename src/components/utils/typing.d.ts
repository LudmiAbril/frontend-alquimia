/*GENERAL*/

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  colorClass?: string;

}

/*SUPPLIERS*/
export interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  image: string;
}

export type PageProps = {
  params: {
    slug: string;
  };
};

export interface Product {
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface ProductDetailProps {
  name: string;
  price: number;
  image: string;
  category: string;
  supplier: string;
  mainCategory: string;
  subCategory?: string;
}

/*LANDING*/
export interface Supplier {
  name: string;
  imageSrc: string;
}

/*PROFILE*/
export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mainButton: string;
  children: React.ReactNode;
  secondaryText: string;
  secondaryActionLabel: string;
  onSecondaryAction: () => void;
}

export interface EmptySectionProps {
  title: string;
  description1: string;
  description2: string;
  buttonText: string;
  onClick?: () => void;
}

export interface AuthModalWrapperProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
}

export interface FormToggleProps {
  toggleForm: () => void;
}
export type PropsTextSectionWithButton = {
  title: string;
  description: string;
  buttonText: string;
  className?: string;
};

export interface FamilyButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}


export type StepCardProps = {
  image: string;
  alt: string;
  text: string;
};

/**QUIZ */


export interface OptionDTO {
  Letra: string
  Texto: string
  ImagenUrl: string  
}

export interface PropsDynamic {
  question: QuestionDTO
  selectedOption: string
  onSelect: (option: string) => void
}
export type VisualType = "cards" | "grid" | "list" | "buttons" | "bubbles";

export interface QuestionDTO {
  Id: number
  Pregunta: string
  Opciones: OptionDTO[]
  VisualType?: VisualType // ESTO PARA QUE PUEDA CAMBIAR FORMATO DE RENDERIZADO...atte Celu
}
export interface AnswerDTO {
  preguntaId: number;
  selectedOption: string;
}
export interface PropsCurrent {
 currentQuestionIndex: number
  questions: QuestionDTO[]
  selectedOption: string
  onSelect: (option: string) => void
  onNext: () => void
  onPrev: () => void
  loading: boolean
}
export interface PropsResult {
  result: FamilyResult
  answers: AnswerDTO[]
  onReset: () => void
}
 export interface FamilyResult {
  nombre: string;
  descripcion: string;
  imagen: string | null;
}


export interface PropsQC {
  option: OptionDTO 
  selected: boolean
  onClick: () => void
}


export interface PropsAS {
  currentQuestionIndex: number
  questions: QuestionDTO[]
  selectedOption: string
  onSelect: (option: string) => void
  onNext: () => void
  onPrev: () => void
  loading: boolean
}

/**LANDING-HOWitWork */

export interface StepData {
  image: string;
  alt: string;
  text: string;
}
