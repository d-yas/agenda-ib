import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 py-3 text-center bg-[#000317]/90 backdrop-blur-sm border-t border-[#8BE6FF]/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
    >
      <div className="flex items-center justify-between px-6">
        {/* Left Logo */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.7, x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex items-center"
        >
          <img src="logotam.png" alt="logo" width={130} />
        </motion.div>

        {/* Clock on the right */}
        <motion.div
          className="text-[#8BE6FF]/80 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          {formatTime(currentTime)}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
