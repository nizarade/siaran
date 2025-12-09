import React, { useState, useEffect } from 'react';
import { Search, Info, User } from 'lucide-react';
import { motion } from 'framer-motion';
import LogoSiaran from '../assets/logo.png'

const Header = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <header className="bg-gradient-to-b from-red-600 via-red-800 to-red-800 py-4 border-b-4 border-luxury-gold">
      

      {/* Main Header */}
      <div className=" text-white p-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="flex items-center gap-4">
        
          <div>
            <div className="flex justify-center items-center">
            <img className='size-20 mr-3' src={LogoSiaran} alt="Logo SIARAN" />
            <h1 
            className="text-3xl flex  justify-center md:text-5xl font-bold text-putih tracking-wide uppercase"
            style={{ textShadow: "2px 2px 0px #facc15 " }}
          >
            SIARAN
          </h1>
          </div>
           <h2 className="text-xl text-luxury-gold font-bold mt-1 tracking-widest">
            SISTEM ASPIRASI RAKYAT SANTUN
          </h2>
          </div>
        </div>

        
      </div>

      {/* Marquee */}
      <div className="bg-red-600 text-white py-2 overflow-hidden  border-luxury-gold border-2">
        <motion.div
          className="whitespace-nowrap font-bold font-mono text-lg"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          SELAMAT DATANG DI SIARAN • MOHON GUNAKAN BAHASA YANG SESUAI NORMA • DILARANG MENGKRITIK PEJABAT YANG SEDANG TIDUR • AWAS UU ITE MENGINTAI ANDA •
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
