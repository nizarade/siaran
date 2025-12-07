import React, { useState, useEffect } from 'react';
import { Search, Info, User } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <header className="w-full border-b-4 border-black">
      {/* Top Bar */}
      <div className="bg-yellow-400 px-4 py-1 flex justify-between items-center text-xs font-bold border-b-2 border-black font-sans">
        <div>{formatDate(date)}</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Webmail Dinas</a>
          <a href="#" className="hover:underline">LPSE</a>
          <a href="#" className="hover:underline">Login Admin</a>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-official-green text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl border-4 border-yellow-400 shadow-lg">
            🙂
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-shadow tracking-wider text-yellow-400">
              SIARAN
            </h1>
            <p className="text-sm md:text-base font-serif italic tracking-widest mt-1 opacity-90">
              SISTEM ASPIRASI RAKYAT SANTUN
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="p-2 border-2 border-yellow-400 bg-official-green hover:bg-green-900 text-yellow-400 shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] active:translate-y-1 active:shadow-none transition-all">
            <Search size={24} />
          </button>
          <button className="p-2 border-2 border-yellow-400 bg-official-green hover:bg-green-900 text-yellow-400 shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] active:translate-y-1 active:shadow-none transition-all">
            <Info size={24} />
          </button>
          <button className="p-2 border-2 border-yellow-400 bg-official-green hover:bg-green-900 text-yellow-400 shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] active:translate-y-1 active:shadow-none transition-all">
            <User size={24} />
          </button>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-red-600 text-white py-2 overflow-hidden border-t-4 border-black border-b-4">
        <motion.div
          className="whitespace-nowrap font-bold font-mono text-lg"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          🔴 SELAMAT DATANG DI SIARAN • MOHON GUNAKAN BAHASA YANG SESUAI NORMA • DILARANG MENGKRITIK PEJABAT YANG SEDANG TIDUR • AWAS UU ITE MENGINTAI ANDA •
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
