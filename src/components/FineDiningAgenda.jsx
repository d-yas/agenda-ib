import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventSchedule } from '../data/eventSchedule';

const LegalGourmetEvening = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const constraintsRef = useRef(null);

  // Animation variants
  const itemVariants = {
    collapsed: { 
      opacity: 0.9,
      scale: 0.98,
      transition: { duration: 0.3 }
    },
    expanded: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  const contentVariants = {
    collapsed: { 
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  const dotVariants = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.2, 1],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#000317] text-[#8BE6FF] overflow-hidden">
      {/* Animated Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative py-16 px-6 text-center border-b border-[#8BE6FF]/10"
      >
        <motion.h1 
          className="text-4xl font-light tracking-widest mb-2"
          initial={{ letterSpacing: '0.5em' }}
          animate={{ letterSpacing: '0.2em' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          LEGAL EPICUREAN
        </motion.h1>
        <motion.div 
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#8BE6FF] to-transparent mx-auto my-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        ></motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-[#8BE6FF]/80 text-sm font-serif"
        >
          An Evening of Refined Discourse
        </motion.p>
      </motion.header>

      {/* Timeline with Motion */}
      <motion.div 
        ref={constraintsRef}
        className="relative px-6 py-12 max-w-2xl mx-auto"
      >
        <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-[#8BE6FF]/10 to-[#8BE6FF]/0"></div>
        
        {eventSchedule.map((item, index) => (
          <motion.div 
            key={item.id} 
            className="relative z-10 mb-12 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            drag="y"
            dragConstraints={constraintsRef}
            whileHover={{ y: -3 }}
          >
            {/* Animated Timeline Dot */}
            <motion.div 
              className={`absolute left-6 top-5 w-3 h-3 rounded-full 
                ${item.highlight ? 'bg-[#8BE6FF]' : 'bg-[#8BE6FF]/70'}`}
              variants={dotVariants}
              initial="initial"
              animate={item.highlight ? "pulse" : "initial"}
            ></motion.div>

            {/* Event Card with Motion */}
            <motion.div 
              className={`ml-12 p-6 rounded-lg border border-[#8BE6FF]/10 cursor-pointer
                ${expandedItem === item.id ? 
                  'bg-[#8BE6FF]/10' : 
                  'bg-[#000317] hover:bg-[#000317]/50'}`}
              onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              variants={itemVariants}
              initial="collapsed"
              animate={expandedItem === item.id ? "expanded" : "collapsed"}
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
                    transition: { duration: 0.6 }
                  }}
                >
                  {item.icon}
                </motion.span>
              </div>

              {/* Animated Expanded Content */}
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
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeSpacingjoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {item.dressCode}
                        </span>
                      </motion.div>
                      <motion.button
                        className="mt-4 text-xs tracking-wider text-[#8BE6FF] hover:text-white flex items-center transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ADD TO CALENDAR
                        <motion.svg 
                          className="w-3 h-3 ml-2"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 1.5
                          }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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
        className="fixed bottom-0 left-0 right-0 py-4 text-center bg-[#000317]/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div 
          className="text-xs text-[#8BE6FF]/60 tracking-widest"
          animate={{ 
            opacity: [0.6, 1, 0.6],
            transition: { 
              duration: 4,
              repeat: Infinity 
            } 
          }}
        >
          COUNSEL & CUISINE • 2024
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default LegalGourmetEvening;