"use client";
import CloseIcon from "@mui/icons-material/Close";
import { AuthModalWrapperProps } from "@/components/utils/typing";



export default function AuthModalWrapper({ children, title, onClose }: AuthModalWrapperProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="relative bg-[#f1eae2] p-8 rounded-xl w-full max-w-md">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-600 hover:text-black">
                    <CloseIcon />
                </button>
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-[var(--violeta)] text-white flex items-center justify-center rounded-full">
                        <span className="text-2xl font-bold">A</span>
                    </div>
                    <h2 className="text-xl font-bold mt-2 uppercase">{title}</h2>
                </div>
                {children}
            </div>
        </div>
    );
}
