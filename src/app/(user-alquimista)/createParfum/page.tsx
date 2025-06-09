import CreatePerfumeSteps from "@/components/CreatePerfume/CreatePerfumeSteps";
import { CreatePerfumeProvider } from "@/context/CreatePerfumeContext";


export default function CrearPerfume() {
    return (
        <CreatePerfumeProvider>
            <CreatePerfumeSteps />
        </CreatePerfumeProvider>
    );
}
