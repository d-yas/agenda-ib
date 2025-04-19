import React from 'react';
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import { guestList } from "../data/guestList";

const Header = () => {
  const { guestId } = useParams();
  
  // Find the guest by ID across all firms
  let guest = null;
  let firmName = "";
  
  for (const firm of guestList) {
    const foundGuest = firm.members.find(member => member.id === guestId);
    if (foundGuest) {
      guest = foundGuest;
      firmName = firm.firm;
      break;
    }
  }

  return (
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
        {guest ? `${firmName}` : 'Annual Legal Summit'}
      </motion.h1>
      
      <motion.div
        className="w-24 h-px bg-gradient-to-r from-transparent via-[#8BE6FF] to-transparent mx-auto my-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
      />
      
      {guest ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <p className="text-[#8BE6FF]/80 text-sm font-serif">
            {guest.title}
          </p>
          <p className="text-[#8BE6FF]/60 text-xs mt-2">
            {guest.name}
          </p>
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-[#8BE6FF]/80 text-sm font-serif"
        >
          December 15, 2023 | Grand Ballroom
        </motion.p>
      )}

      
    </motion.header>
  );
};

export default Header;