/*GENERAL*/

export interface ButtonProps {
  label: string;
  onClick?: () => void;
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
export interface ImageSectionProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  buttonText?: string;
  reverse?: boolean;
  className?: string;
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
  ImagenBase64: string
}

export interface QuestionDTO {
  Id: number
  Pregunta: string
  Opciones: OptionDTO[]
}

export interface AnswerDTO {
  preguntaId: number;
  selectedOption: string;
}


 export interface FamilyResult {
  nombre: string;
  descripcion: string;
  imagen: string | null;
}
export interface PropsQuiz {
  title: string
  subtitle?: string
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
