import React, { useState } from 'react'
import { motion } from "framer-motion";

const Particles = () => {
  const [particles] = useState(() => 
    Array.from({ length: 202 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#174a58]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  )
}

export default Particles