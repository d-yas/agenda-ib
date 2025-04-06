import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventSchedule } from "../data/eventSchedule";
import ShootingStars from "./ShootingStars";

const FineDiningAgenda = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  // Animation variants
  const itemVariants = {
    collapsed: {
      opacity: 0.9,
      scale: 0.98,
      transition: { duration: 0.3 },
    },
    expanded: {
      opacity: 1,
      scale: 1,
      zIndex: 10, // Ensure expanded card overlaps others
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  const contentVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  const dotVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Futuristic glow effect for timeline
  const timelineGlow = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      boxShadow: "0 0 10px rgba(139, 230, 255, 0.5)",
    },
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 3,
    },
  };

  return (
    <div className="min-h-screen bg-[#000317] text-[#8BE6FF] overflow-hidden relative">
      {/* Futuristic Particle Background */}
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

      {/* Animated Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative py-16 px-6 text-center border-b border-[#8BE6FF]/10"
      >
        <motion.h1
          className="text-4xl font-light tracking-widest mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#8BE6FF] to-[#00B4D8]"
          initial={{ letterSpacing: "0.5em" }}
          animate={{ letterSpacing: "0.2em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          DCY Hukuk Bürosu
        </motion.h1>
        <motion.div
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#8BE6FF] to-transparent mx-auto my-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-[#8BE6FF]/80 text-sm font-serif"
        >
          Av. Denizcan Yaş
        </motion.p>
      </motion.header>

      <ShootingStars />

      {/* Timeline with Futuristic Glow */}
      <motion.div className="relative px-6 py-12 max-w-2xl mx-auto">
        <motion.div
          className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-[#8BE6FF]/20 to-transparent"
          {...timelineGlow}
        />

        {eventSchedule.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative z-0 mb-12 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            whileHover={{ y: -3 }}
          >
            {/* Holographic Timeline Dot */}
            <motion.div
              className={`absolute left-6 top-5 w-3 h-3 rounded-full 
                ${item.highlight ? "bg-[#8BE6FF]" : "bg-[#8BE6FF]/70"}`}
              variants={dotVariants}
              initial="initial"
              animate={item.highlight ? "pulse" : "initial"}
              whileHover={{ scale: 1.3 }}
            />

            {/* Event Card with 3D Tilt Effect */}
            <motion.div
              className={`ml-12 p-6 rounded-lg border border-[#8BE6FF]/10 cursor-pointer
                ${
                  expandedItem === item.id
                    ? "bg-[#8BE6FF]/10 backdrop-blur-sm"
                    : "bg-[#000317]/70 hover:bg-[#000317]/50"
                }`}
              onClick={() =>
                setExpandedItem(expandedItem === item.id ? null : item.id)
              }
              variants={itemVariants}
              initial="collapsed"
              animate={expandedItem === item.id ? "expanded" : "collapsed"}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                transformPerspective: 1000,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <motion.span
                    className="text-[#8BE6FF]/60 text-xs tracking-wider block"
                    whileHover={{ x: 3 }}
                  >
                    {item.time}
                  </motion.span>
                  <motion.h3
                    className="text-xl font-light mt-1 mb-2"
                    whileHover={{ x: 2 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.div
                    className="flex items-center space-x-3 text-xs"
                    whileHover={{ x: 1 }}
                  >
                    <span className="text-[#8BE6FF]/70">{item.type}</span>
                    <span className="w-1 h-1 rounded-full bg-[#8BE6FF]/40"></span>
                    <span className="text-[#8BE6FF]/70">{item.location}</span>
                  </motion.div>
                </div>
                <motion.span
                  className="text-2xl"
                  animate={{
                    rotate: expandedItem === item.id ? [0, 10, -5, 0] : 0,
                    transition: { duration: 0.6 },
                  }}
                >
                  {item.icon}
                </motion.span>
              </div>

              {/* Expanded Content with VIP Badge */}
              <AnimatePresence>
                {expandedItem === item.id && (
                  <motion.div
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-[#8BE6FF]/10">
                      {item.speaker && (
                        <motion.div
                          className="mb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-[#8BE6FF]/10 to-[#8BE6FF]/20">
                            <motion.span
                              className="text-xs text-[#8BE6FF]"
                              animate={{
                                backgroundPosition: ["0%", "100%"],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                              }}
                            >
                              VIP SPEAKER
                            </motion.span>
                          </div>
                          <span className="ml-2 text-xs text-[#8BE6FF]/80">
                            {item.speaker.name}, {item.speaker.firm}
                          </span>
                        </motion.div>
                      )}

                      <motion.p
                        className="text-[#8BE6FF]/80 font-serif text-sm leading-relaxed mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {item.description}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="px-3 py-1 bg-[#8BE6FF]/10 text-[#8BE6FF]/90 rounded-full text-xs flex items-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {item.dressCode}
                        </span>
                      </motion.div>

                      {/* Laser Button Effect */}
                      <motion.button
                        className="mt-4 relative overflow-hidden text-xs tracking-wider text-[#8BE6FF] hover:text-white flex items-center px-4 py-2 rounded-lg bg-[#8BE6FF]/5"
                        whileHover={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(139, 230, 255, 0.1), transparent)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="absolute top-0 left-0 h-full w-0.5 bg-[#8BE6FF]"
                          initial={{ x: -10 }}
                          animate={{
                            x: [-10, 110, -10],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 0.3,
                            repeat: Infinity,
                          }}
                        />
                        ADD TO CALENDAR
                        <motion.svg
                          className="w-3 h-3 ml-2"
                          animate={{ x: [0, 3, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </motion.svg>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated Footer */}
      <motion.footer
        className="fixed bottom-0 left-0 right-0 py-3 text-center bg-[#000317]/90 backdrop-blur-sm border-t border-[#8BE6FF]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="flex items-center justify-center space-x-4">
          {/* Left Logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex items-center"
          >
            <img src="logotam.png" alt="logo" width={130} />
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default FineDiningAgenda;
