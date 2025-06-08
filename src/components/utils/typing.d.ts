/*GENERAL*/

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  colorClass?: string;
href?: string

}

/*SUPPLIERS*/
export interface ProductCardProps {
  id: number;
  name: string;
  category?: string;
  image: string;
  variants?: {
    price: number;
    volume: number;
    unit: string;
        stock?: number;
  }[];
}




export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  productType: string;
  provider: ProviderDTO;
  variants: ProductVariantDTO[];
  price?: number;
  volume?: number;
  unit?: string;
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

export interface WelcomeFamiliesProps {
  onStart: () => void;
  loading: boolean;
}
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
export type VisualType = "cards" | "grid" | "list" | "two" | "bubbles";
export interface SummaryItem  {
  label: string
  value: string
  icon: string
  color: string
};
export interface QuestionDTO {
  Id: number
  Pregunta: string
  Opciones: OptionDTO[]
  VisualType?: VisualType // ESTO PARA QUE PUEDA CAMBIAR FORMATO DE RENDERIZADO...atte Celu
}
export interface AnswerDTO {
  questionId: number;
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
export interface FormulaResult {
  TopNote: string
  HeartNote: string
  BaseNote: string
}

export interface FamilyResult {
  nombre: string
  descripcion: string
  imagen: string | null
  formulas?: FormulaResult[]
  subfamilias?: string[]
  concentracion?: string
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

/**************************** INTERFACES DEL BACK CON LOGUIN -REGISTER  ****************************/


export interface BackendErrorResponse {
  mensaje?: string;
  errors?: {
    [key: string]: string[];
  };
}

export interface BackendSuccessResponse<T = any> {
  exito?: boolean;
  mensaje?: string;
  token?: string;
  data?: T;
}

export interface AuthResponse {
  token: string;
  usuario: {
    id: number;
    name: string;
    email: string;
    rol: string;
  };
}

export interface RegisterDTO {
  Email: string;
  Password: string;
  Name: string;
  Rol: string;
}

//interfaz de mascota
export interface FloatingMascotProps {
  messages: string[];
    imageSrc?: string;
}

//********************************** INTERFACES DE PROVEDOR REGISTRO ******************************************** */

export interface ProviderFormData {
  email: string;
  password: string;
  empresa: string;
  cuil: string;
  productosSeleccionados: string[];
  otroProducto: string;
  rubro: string;
  tarjeta: {
    nombre: string;
    numero: string;
    vencimiento: string;
    cvc: string;
  };
}


export interface Paso1Props {
  onContinue: () => void;
  formData: ProviderFormData;
  setFormData: (data: ProviderFormData) => void;
}

export interface Paso2Props {
  onContinue: () => void;
  onBack: () => void;
  formData: ProviderFormData;
  setFormData: (data: ProviderFormData) => void;
}

export interface Paso3Props {
  onContinue: () => void;
  onBack: () => void;
  formData: ProviderFormData;
  setFormData: (data: ProviderFormData) => void;
}


export interface Paso4Props {
  onFinish: () => void;
}
export interface PropsInput {
  query: string
  setQuery: (q: string) => void
}


export interface Provider {
  id: number
  name: string
  description: string
  stock: number
}

export interface ProviderDTO {
  Id: number
  Nombre: string
  Email: string
  EsAprobado: boolean
}



export const API_ROUTES = {
  LIST_PROVIDERS: "http://localhost:5035/admin/listProviders",
  APPROVE_PROVIDER: (id: number) => `http://localhost:5035/admin/approveProvider/${id}`,
  DEACTIVATE_PROVIDER: (id: number) => `http://localhost:5035/admin/deactivateProvider/${id}`,
};

export interface StatCircleCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

export interface ProviderStatsProps {
  total: number
  approved: number
  pending: number
}


export interface ProviderTableProps {
  providers: ProviderDTO[]
  loading: boolean
  onProviderClick: (provider: ProviderDTO) => void
  onApprove: (id: number) => Promise<void>
  onDeactivate: (id: number) => Promise<void>
}


export interface ProviderDetailDialogProps {
  provider: ProviderDTO | null
  open: boolean
  onClose: () => void
  onApprove: (id: number) => void
  onDeactivate: (id: number) => void
}


export interface ProviderFiltersProps {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  statusFilter: "all" | "approved" | "pending"
  setStatusFilter: Dispatch<SetStateAction<"all" | "approved" | "pending">>
  fetchProviders: () => void
}


export interface Option {
  label: string;
  value: string;
}

 export interface PropsSelect {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
 }
/***CREAR PERFUME */
export interface NoteInfoResponse {
  Id: number;
  Name: string;
  Family: string;
  Sector: string;
  Description: string;
  Duration: string;
}

export interface UserDTO {
  id: number;
  username: string;
  email: string;
  role: string;
  isProvider: boolean;
}
