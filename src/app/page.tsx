
import Hero from "@/components/landing/Hero";
<<<<<<< HEAD
import PorqueAlquimia from "@/components/landing/PorqueAlquimia";
=======
import Pasos from "@/components/landing/Pasos";
import SeccionConImagen from "@/components/landing/SeccionConImagen";
import SeccionHechoAMedida from "@/components/landing/SeccionHechoAMedida";
import SeccionProveedor from "@/components/landing/SeccionProveedor";
import SeccionInicioFragrancia from "@/components/landing/SeccionInicioFragrancia";


>>>>>>> origin/main


export default function Home() {
  return (
    <>
      <Hero />
<<<<<<< HEAD
      <PorqueAlquimia />


=======
      <SeccionConImagen
        titulo="¿POR QUÉ ALQUIMIA?"
        descripcion={`Alquimia nace para que el arte de crear perfumes esté al alcance de todos.
        Diseñamos una experiencia que te permite transformar tus ideas en aromas.`}
        imagen="/chicoAlquimista.png"
        alt="Ilustración Alquimia"
      />
      <Pasos />
      <SeccionInicioFragrancia />

      <SeccionConImagen
        titulo="TODOS LOS INSUMOS A TU ALCANCE"
        descripcion="Te conectamos con distintos proveedores registrados en nuestra plataforma, de forma que tendrás acceso a un extenso catálogo de materia prima, como envases, esencias y alcoholes. Contamos con una gran variedad de opciones y precios adecuados para vos."
        imagen="/pociones.png"
        alt="Insumos"
        botonTexto="QUIERO REGISTRARME"
      />
      <SeccionHechoAMedida />
      <SeccionProveedor />
>>>>>>> origin/main

    </>
  )
}