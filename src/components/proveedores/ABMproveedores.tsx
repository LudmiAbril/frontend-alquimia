import Button from "../general/Button";
import Navbar from "../general/Navbar";




export default function ProveedoresPage() {
    return (
        <>
            <Navbar />
            <main className="bg-[#f5f1ee] min-h-screen pb-20">
                <section className="max-w-7xl mx-auto px-6 py-12">
                    <h1 className="text-center text-3xl font-bold mb-2"> PERFIL PROVEEDORES</h1>
                    <p className="text-center text-gray-700 mb-10">
                        Aca cargá tus productos y ofrecé tus servicios 
                    </p>

                </section>

                {/* Beneficio fijo */}
                <div className="fixed bottom-6 left-6 z-50">
                    <Button label={"CREÁ TU CÓDIGO DE DESCUENTO"}>

                    </Button>
                </div>
            </main>

        </>
    );
}
