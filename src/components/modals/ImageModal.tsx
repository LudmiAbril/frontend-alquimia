
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ImageModalProps } from "../utils/typing";


export default function ImageModal({ selectedImg, onClose }: ImageModalProps) {
  return (
    <AnimatePresence>
      {selectedImg && (
        <motion.div
          key="modal"
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg overflow-hidden max-w-sm w-full"
            initial={{ scale: 0.7 }}
            animate={{ scale: 0.95 }}
            exit={{ scale: 0.7 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImg}
              alt="Vista ampliada"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
