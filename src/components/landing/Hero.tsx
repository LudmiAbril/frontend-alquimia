"use client";

import { useState } from "react";
import Button from "@/components/general/Button";
import DiscoverModal from "../modals/DiscoverModal";

export default function Hero() {
    const [showModal, setShowModal] = useState(false);

    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat text-white min-h-[100vh] flex items-center px-6 md:px-20"
            style={{ backgroundImage: "url('/landingImagenes/hero.jpg')" }}
        >
            <div className="relative z-10">
                <div className="max-w-lg md:max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4 pb-5">
                        DISEÑÁ PERFUMES QUE HABLEN DE VOS.
                    </h1>
                    <p className="text-lg md:text-xl mb-5 pb-5">
                        Creatividad, emoción y aroma. Todo desde una plataforma hecha para no expertos.
                    </p>
                   <Button label="Empezar a crear" onClick={() => setShowModal(true)} />

                    
                </div>
            </div>

            {showModal && <DiscoverModal onClose={() => setShowModal(false)} />}
        </section>
    );
}
