import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventSchedule } from "../data/eventSchedule";
import ShootingStars from "./ShootingStars";
import Header from "./Header";
import Particles from "./Particles";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { guestList } from "../data/guestList";

const TimeLine = () => {
  const { guestId } = useParams();
  const [expandedItem, setExpandedItem] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const currentGuest = guestList.find(guest => guest.id === guestId);
  const guest = guestList.find(g => g.id === guestId);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM
  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Convert time string "HH:MM" to minutes
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Check if current time is within an event's time range
  const isCurrentEvent = (event) => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [start, end] = event.time.split(" - ").map(timeToMinutes);
    return now >= start && now <= end;
  };

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
      zIndex: 10,
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

  const currentEventPulse = {
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
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
    <motion.div className="relative px-6 py-12 max-w-2xl mx-auto">
      <motion.div
        className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-[#8BE6FF]/20 to-transparent"
        {...timelineGlow}
      />

      {eventSchedule.map((item, index) => (
        <motion.div
          key={item.id}
          className="relative z-0 mb-12 last:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.15 }}
          whileHover={{ y: -3 }}
        >
          {/* Holographic Timeline Dot */}
          <motion.div
            className={`absolute left-6 top-5 w-3 h-3 rounded-full 
          ${
            isCurrentEvent(item)
              ? "bg-[#00FFD1] shadow-[0_0_8px_#00FFD1]"
              : item.highlight
              ? "bg-[#8BE6FF]"
              : "bg-[#8BE6FF]/70"
          }`}
            variants={dotVariants}
            initial="initial"
            animate={isCurrentEvent(item) || item.highlight ? "pulse" : "initial"}
            whileHover={{ scale: 1.3 }}
          />

          {/* Event Card - Non-expandable version */}
          <motion.div
            className={`ml-12 p-6 rounded-lg border
          ${
            isCurrentEvent(item)
              ? "bg-[#8BE6FF]/20 border-[#8BE6FF]/50"
              : "bg-[#000317]/70 border-[#8BE6FF]/10"
          }`}
            variants={{
              ...itemVariants,
              pulse: currentEventPulse.pulse,
            }}
            initial="collapsed"
            animate={isCurrentEvent(item) ? "pulse" : "collapsed"}
            whileHover={{ scale: 1.01 }}
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
            </div>

            {/* Always visible content */}
            <div className="mt-4 pt-4 border-t border-[#8BE6FF]/10">
              {isCurrentEvent(item) && (
                <motion.div
                  className="mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-[#00FFD1]/10 to-[#00FFD1]/20">
                    <motion.span className="text-xs text-[#00FFD1]">
                      LIVE NOW
                    </motion.span>
                  </div>
                </motion.div>
              )}

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
                
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TimeLine;