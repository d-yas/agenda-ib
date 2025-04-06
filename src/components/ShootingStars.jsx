import { motion } from 'framer-motion';
import React from 'react'

// Add this above your header component
const ShootingStars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#8BE6FF] to-transparent"
          initial={{
            opacity: 0,
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            rotate: Math.random() * 360,
            width: "0px",
          }}
          animate={{
            opacity: [0, 1, 0],
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100 + 100}vh`,
            width: `${Math.random() * 100 + 50}px`,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            ease: "linear",
          }}
          style={{
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStars