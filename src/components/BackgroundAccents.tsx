"use client";

import { motion } from "framer-motion";

export function BackgroundAccents() {
  return (
    <>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="fixed top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full border-[8px] border-mint/10 -z-10 mix-blend-screen"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        className="fixed top-[-5%] right-[-10%] w-[45vw] h-[45vw] rounded-full border-[8px] border-peri/10 -z-10 mix-blend-screen"
      />
    </>
  );
}
