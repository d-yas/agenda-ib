import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaLink, FaTimes } from "react-icons/fa";

const Interactive = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div
      className="relative mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.1 }}
    >
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          isMenuOpen
            ? "bg-[#8BE6FF] text-[#000317]"
            : "bg-[#8BE6FF]/20 text-[#8BE6FF] hover:bg-[#8BE6FF]/30"
        } transition-all`}
      >
        {isMenuOpen ? (
          <>
            <FaTimes /> Close Menu
          </>
        ) : (
          <>
            <FaLink /> Quick Links
          </>
        )}
      </button>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-[#000317] border border-[#8BE6FF]/30 rounded-lg p-3 shadow-lg min-w-[200px]"
        >
          <div className="flex flex-col gap-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-[#8BE6FF] hover:bg-[#8BE6FF]/10 rounded transition-all text-sm whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const StaticKahoot = () => {
  return (
    <motion.div
      className="relative mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.1 }}
    >
      <a
        href="https://kahoot.it/"
        target="_blank"
        className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold
             bg-[#8BE6FF] text-[#000317] transition-all animate-pulse`}
      >
        Kahoot
      </a>
    </motion.div>
  );
};

const StaticMenti = () => {
  return (
    <motion.div
      className="relative mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.1 }}
    >
      <a
        href="https://www.menti.com/altxz3qpo1w6"
        target="_blank"
        className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold
             bg-[#8BE6FF] text-[#000317] transition-all animate-pulse`}
      >
        Menti
      </a>
    </motion.div>
  );
};

const StaticMenti2 = () => {
  return (
    <motion.div
      className="relative mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.1 }}
    >
      <a
        href="https://www.menti.com/alenwbhcdjjx"
        target="_blank"
        className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold
             bg-[#c78bff] text-[#000317] transition-all animate-pulse`}
      >
        Menti
      </a>
    </motion.div>
  );
};

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Replace these with your actual links
  const interactiveLinks = [
    { name: "Mavi", url: "https://www.menti.com/altxz3qpo1w6" },
    { name: "Mor", url: "https://www.menti.com" },
    
  ];

  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 py-3 text-center bg-[#000317]/90 backdrop-blur-sm border-t border-[#8BE6FF]/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
    >
      <div className="flex flex-col items-center">
        {/* Bottom row with logo and time */}
        <div className="flex items-center justify-between w-full px-6">
          {/* Left Logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex items-center"
          >
            <img src="logotam.png" alt="logo" width={100} />
          </motion.div>

          
          {/* <StaticMenti />
          <StaticMenti2 /> */}

          {/* Clock */}
          <motion.div
            className="text-[#8BE6FF]/80 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            {formatTime(currentTime)}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
