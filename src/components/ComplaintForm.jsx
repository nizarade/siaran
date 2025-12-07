import React, { useState } from 'react';

const ComplaintForm = ({ onSubmit, isSubmitting }) => {
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaint.trim()) {
      onSubmit(complaint);
    }
  };

  return (
    <div className="bg-[#fdfbf7] p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
      {/* Paper texture effect overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]"></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-serif font-bold mb-4 border-b-4 border-black pb-2 uppercase tracking-wide">
          Formulir Pengaduan
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="complaint" className="font-bold text-sm uppercase">
              Isi Keluhan Anda:
            </label>
            <textarea
              id="complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Tulis keluhan Anda... Contoh: JAKARTA BANJIR, PEJABAT KORUPSI!"
              className="w-full h-48 p-4 border-2 border-black bg-white font-mono text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 resize-none shadow-inner"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !complaint.trim()}
            className={`
              w-full py-4 px-6 text-xl font-bold uppercase tracking-wider border-4 border-black
              transition-all transform
              ${isSubmitting || !complaint.trim() 
                ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                : 'bg-official-green text-white hover:bg-green-800 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none'
              }
            `}
          >
            {isSubmitting ? 'Sedang Memproses...' : 'Ajukan ke Dinas'}
          </button>
        </form>
        
        <div className="mt-4 text-xs text-gray-500 font-mono text-center border-t-2 border-gray-300 pt-2">
          *Dengan mengisi formulir ini, Anda setuju untuk tidak menuntut jika laporan hilang.
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
