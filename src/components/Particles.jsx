import React from 'react'
import { motion, AnimatePresence } from "framer-motion";


const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(152)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#174a58]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
  )
}

export default Particles