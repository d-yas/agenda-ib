import ShootingStars from "./ShootingStars";
import Header from "./Header";
import Particles from "./Particles";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { guestList } from "../data/guestList";
import TimeLine from "./TimeLine";
import { useState } from "react";

const FineDiningAgenda = () => {
  const { guestId } = useParams();
  const currentGuest = guestList.find((guest) => guest.id === guestId);
  const guest = guestList.find((g) => g.id === guestId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!guest) {
    return (
      {/* <div className="min-h-screen bg-[#000317] text-[#8BE6FF] overflow-hidden relative">
        <Header guest={currentGuest} />

        <ShootingStars />

        <TimeLine />
        
        <Particles />

        <Footer />
      </div> */} /* İptal ettik */
    );
  }
};

export default FineDiningAgenda;