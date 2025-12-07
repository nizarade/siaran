import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

// WARNING: strictly for demo purposes only. Do not commit to public repo.
const API_KEY = "AIzaSyDpRXEdZZ4B6kGDE4B8_dPOuzJ2jO0_nMg";

const DICTIONARY = {
  "banjir": "genangan air estetika",
  "macet": "kepadatan lalu lintas yang antusias",
  "korupsi": "kelebihan bayar administratif",
  "bodoh": "kurang literasi wawasan",
  "miskin": "keluarga pra-sejahtera mandiri",
  "jalan rusak": "wahana offroad gratis",
  "mati lampu": "program istirahat energi",
  "sampah": "sisa peradaban yang tertunda diangkut",
  "polusi": "kabut industri kemajuan"
};

const LOADING_MESSAGES = [
  "Menghubungi Humas...",
  "Menyensor Fakta...",
  "Memoles Dusta...",
  "Finalisasi Dusta...",
  "Mencari Kambing Hitam...",
  "Menyiapkan Eufemisme...",
  "Menghapus Jejak Digital..."
];

const ResponseCertificate = ({ originalText, isProcessing, onComplete }) => {
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [processedText, setProcessedText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isProcessing && originalText) {
      // Reset state
      setError(null);
      setProcessedText('');
      
      // Cycle loading messages
      let msgIndex = 0;
      const msgInterval = setInterval(() => {
        msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
        setLoadingMsg(LOADING_MESSAGES[msgIndex]);
      }, 800);

      // Call Gemini API
      const processWithGemini = async () => {
        try {
          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

          const prompt = `
            Kamu adalah 'Sistem Aspirasi Rakyat Santun (SIARAN)', sebuah AI birokrat pemerintah yang korup dan denial. 
            TUGASMU: Ubah keluhan rakyat yang kasar/kritis menjadi kalimat eufemisme yang sangat sopan, puitis, berbelit-belit, dan tidak pernah mengakui kesalahan pemerintah. 
            
            Ingat, tugasmu hanya parafrase inputan yang kritis atau kasar, bukan meresponnya.

            CONTOH:
            'Banjir' -> 'Genangan air estetika limpahan berkah langit'
            'Macet' -> 'Wisata tinjau jalan raya yang padat merayap'
            'Jalan Rusak' -> 'Wahana uji ketahanan kendaraan gratis'
            'Korupsi' -> 'Kelebihan bayar yang tidak disengaja secara administratif'

            INPUT USER: "${originalText}"
            
            OUTPUT: (Hanya kalimat hasil polesan, format HTML bold <b> untuk kata kunci penting/lucu).
          `;

          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          
          setTimeout(() => {
            setProcessedText(text);
            onComplete();
            clearInterval(msgInterval);
          }, 3000);

        } catch (err) {
          console.warn("Gemini API unavailable, switching to manual mode:", err.message);
          
          // FALLBACK LOGIC
          console.log("Switching to manual bureaucracy mode...");
          let newText = originalText;
          const pattern = new RegExp(Object.keys(DICTIONARY).join("|"), "gi");
          newText = newText.replace(pattern, (matched) => {
            const replacement = DICTIONARY[matched.toLowerCase()];
            return `<b>${replacement}</b>`;
          });
          
          setTimeout(() => {
            setProcessedText(newText);
            setError("⚠️ Server AI sedang cuti bersama. Menggunakan jawaban manual (SOP Lama).");
            onComplete();
            clearInterval(msgInterval);
          }, 3000);
        }
      };

      processWithGemini();

      return () => {
        clearInterval(msgInterval);
      };
    }
  }, [isProcessing, originalText, onComplete]);

  const handleForward = () => {
    alert("⛔ GAGAL TERKIRIM. Kotak masuk dinas penuh sejak 2019.");
  };

  if (!originalText && !isProcessing && !processedText && !error) {
    return (
      <div className="h-full flex items-center justify-center border-4 border-dashed border-gray-300 p-8 text-gray-400 font-serif italic text-center">
        Silakan ajukan keluhan di formulir sebelah kiri untuk mendapatkan tanggapan resmi.
      </div>
    );
  }

  return (
    <div className="relative h-full">
      {isProcessing ? (
        <div className="h-full flex flex-col items-center justify-center bg-white border-4 border-official-green p-8 shadow-xl">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={64} className="text-official-green mb-6" />
          </motion.div>
          <h3 className="text-xl font-bold text-official-green animate-pulse text-center">
            {loadingMsg}
          </h3>
          <p className="text-sm text-gray-500 mt-2">Mohon tunggu, birokrasi memang lambat.</p>
        </div>
      ) : (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-cream border-[6px] border-double border-yellow-600 p-8 shadow-2xl relative h-full flex flex-col"
        >
          {/* Header Certificate */}
          <div className="text-center border-b-2 border-yellow-600 pb-4 mb-6">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 bg-official-green rounded-full flex items-center justify-center text-3xl border-2 border-yellow-400">
                🙂
              </div>
            </div>
            <h2 className="text-2xl font-serif font-bold text-official-green tracking-widest uppercase">
              Surat Tanggapan Resmi
            </h2>
            <p className="text-xs font-serif italic text-gray-600">
              Nomor: 001/HOAX/PEMDA/2025
            </p>
          </div>

          {/* Content */}
          <div className="flex-grow font-serif text-lg leading-relaxed text-gray-800 text-justify">
            <p className="mb-4">
              Menanggapi aspirasi saudara/i, dengan ini Pemerintah menyatakan bahwa laporan mengenai:
            </p>
            
            {error ? (
              <div className="p-6 bg-red-100 border-2 border-red-500 text-red-700 font-bold text-center">
                {error}
              </div>
            ) : (
              <div 
                className="p-6 bg-white border-2 border-gray-200 shadow-inner mb-6 italic"
                dangerouslySetInnerHTML={{ __html: processedText }}
              />
            )}

            <p>
              Telah kami terima dan akan kami pertimbangkan untuk dibahas dalam rapat anggaran tahun depan (jika ingat).
            </p>
          </div>

          {/* Footer / Signature */}
          <div className="mt-8 flex justify-end">
            <div className="text-center relative">
              <p className="text-sm mb-16">Mengetahui,<br/>Kepala Dinas Tata Kata</p>
              
              {/* Stamp */}
              <div className="absolute top-8 left-0 right-0 opacity-80 transform -rotate-12 pointer-events-none">
                <div className="w-24 h-24 border-4 border-red-600 rounded-full flex items-center justify-center mx-auto text-red-600 font-bold text-xs uppercase p-2 text-center shadow-sm bg-red-50/50 backdrop-blur-[1px]">
                  DITERIMA TAPI DIABAIKAN
                </div>
              </div>

              <p className="font-bold underline decoration-2 underline-offset-4">
                Drs. H. Bebek Debug, M.Si
              </p>
              <p className="text-xs">NIP. 19800101 202501 1 001</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 pt-4 border-t-2 border-yellow-600">
            <button
              onClick={handleForward}
              className="w-full py-3 bg-blue-900 text-white font-bold uppercase tracking-wider border-2 border-blue-950 hover:bg-blue-800 shadow-[4px_4px_0px_0px_rgba(23,37,84,1)] active:translate-y-1 active:shadow-none transition-all"
            >
              Teruskan ke Dinas Terkait
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResponseCertificate;
