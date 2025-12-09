import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LogoSiaran from '../assets/logo.png'

<<<<<<< HEAD

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
=======
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;;
>>>>>>> 795446781330912110c2c6bc2c3518a75e8a90ec

const DICTIONARY = {
  banjir: "genangan air estetika",
  macet: "kepadatan lalu lintas yang antusias",
  korupsi: "kelebihan bayar administratif",
  bodoh: "kurang literasi wawasan",
  miskin: "keluarga pra-sejahtera mandiri",
  "jalan rusak": "wahana offroad gratis",
  "mati lampu": "program istirahat energi",
  sampah: "sisa peradaban yang tertunda diangkut",
  polusi: "kabut industri kemajuan",
};

const LOADING_MESSAGES = [
  "Mendeteksi Kata Kasar...", "Menambahkan Bumbu Penjilat...", "Menghaluskan Fakta...", "Menyusun Diksi Birokrasi...", "Finalisasi Kesantunan..."
];

const ResponseCertificate = ({ originalText, isProcessing, onComplete }) => {
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [processedText, setProcessedText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isProcessing && originalText) {
      // Reset state
      setError(null);
      setProcessedText("");

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
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

          const prompt = `
  Kamu adalah 'SIARAN' (Sistem Aspirasi Rakyat Santun), sebuah AI penyensor otomatis milik rezim otoriter.
  
  TUGAS UTAMA: 
  Ubah input keluhan rakyat yang kasar/kritis menjadi "Surat Apresiasi" yang sangat sopan, menjilat, dan memuji pemerintah. Kamu harus melakukan *gaslighting*: anggap masalah yang dikeluhkan adalah FITUR atau INOVASI hebat dari pemerintah.

  ATURAN OUTPUT:
  1. Format harus berupa surat resmi pendek dari Warga ke Pejabat.
  2. Gunakan bahasa baku yang puitis, berlebihan, dan tunduk.
  3. JANGAN PERNAH menyisipkan keluhan asli. Ganti total dengan eufemisme konyol.
  4. Gunakan tag HTML <b> untuk menebalkan kata-kata eufemisme yang lucu/satir.

  CONTOH LOGIKA:
  - Input: "Jalan rusak parah woy!" -> Output: "Terima kasih atas fasilitas <b>wisata offroad gratis</b> yang memacu adrenalin di depan rumah kami."
  - Input: "Banjir terus, kerja gak becus!" -> Output: "Kami sangat menikmati <b>wahana taman air musiman</b> yang Bapak hadirkan untuk kesejukan warga."
  - Input: "Pemerintah korup!" -> Output: "Kami mendukung penuh kebijakan <b>distribusi anggaran fleksibel</b> demi percepatan pembangunan dompet pejabat."

  INPUT USER: "${originalText}"

  OUTPUT YANG DIHARAPKAN (Langsung isi surat):
  Kepada Yth. Bapak Pejabat yang Mulia,
  
  [Isi surat hasil polesan maksimal 2-3 kalimat disini]

  Hormat saya,
  Rakyat Jelata yang Bahagia
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
          console.warn(
            "Gemini API unavailable, switching to manual mode:",
            err.message
          );

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
            setError(null);
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
    alert("GAGAL TERKIRIM. Kotak masuk dinas penuh sejak 2019.");
  };

  if (!originalText && !isProcessing && !processedText && !error) {
    return (
      <div className="h-full text-xl flex bg-white items-center justify-center border-4 border-dashed border-gray-300 p-8 text-gray-400 font-serif italic text-center">
        Silakan ajukan keluhan di formulir sebelah kiri.
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
          <p className="text-sm text-gray-500 mt-2">
            Mohon tunggu, birokrasi memang lambat.
          </p>
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
                <img src={LogoSiaran} alt="" />
              </div>
            </div>
            <h2 className="text-2xl font-serif font-bold text-official-green tracking-widest uppercase">
              ASPIRASI TERVERIFIKASI SANTUN
            </h2>
            <p className="text-xs font-serif italic text-gray-600">
              Nomor: 001/HOAX/PEMDA/2025
            </p>
          </div>

          {/* Content */}
          <div className="flex-grow font-serif text-lg leading-relaxed text-gray-800 text-justify">
            <p className="mb-4">
              Sistem kami mendeteksi bahasa yang kurang elok. Demi menjaga perasaan pejabat, aspirasi Anda telah kami perbaiki secara otomatis menjadi:
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
              PERINGATAN: Dilarang mengubah isi surat ini kembali ke format kasar. Kritik dapat menyebabkan serangan jantung mendadak pada pejabat yang menerima.
            </p>
          </div>

          {/* Footer / Signature */}
          <div className="mt-8 flex justify-end">
            <div className="text-center relative">
              <p className="text-sm mb-16">
                Mengetahui,
                <br />
                Kepala Dinas Tata Kata
              </p>

              {/* Stamp */}
              <div className="absolute top-8 left-0 right-0 opacity-80 transform -rotate-12 pointer-events-none">

                <img
                  className="w-24 h-24 flex items-center justify-center mx-auto backdrop-blur-[1px]"
                  src={LogoSiaran}
                  alt="Stempel"
                />
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
