import React, { useState } from "react";
import Header from "./components/Header";
import ComplaintForm from "./components/ComplaintForm";
import ResponseCertificate from "./components/ResponseCertificate";
import Footer from "./components/Footer";
import LogoSiaran from "/logo.png"

function App() {
  const [complaintText, setComplaintText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleComplaintSubmit = (text) => {
    setComplaintText(text);
    setIsProcessing(true);
    setShowResult(false);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setShowResult(true);
  };

  return (
    <div className="relative min-h-screen bg-paper-white overflow-hidden">
      {/* --- BACKGROUND LAYER (Watermark) --- */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <img
          src={LogoSiaran}
          alt="Watermark Dinas"
          className="w-[80%] md:w-[600px] opacity-[0.1] grayscale contrast-150"
        />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <div className="inline-block bg-red-600 px-8 py-3 border-4 border-luxury-gold shadow-retro">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                LAYANAN PENYAMPAIAN ASPIRASI ONLINE
              </h2>
            </div>
            <p className="text-muted-foreground mt-4 text-lg italic">
              Kami akan menerima segala bentuk Aspirasi masyarakat dalam bentuk
              kalimat yang Santun
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Left Column: Input */}
            <div className="w-full lg:w-1/2">
              <ComplaintForm
                onSubmit={handleComplaintSubmit}
                isSubmitting={isProcessing}
              />

              {/* Satirical Banner */}
              <div className="mt-8 bg-red-600 text-white p-4 border-4 border-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                <h3 className="font-bold text-xl font-serif mb-2">
                  PENGUMUMAN
                </h3>
                <p className="text-sm">
                  Layanan ini buka setiap hari Senin - Kamis (08.00 - 08.15
                  WIB). <br />Di luar jam tersebut, admin sedang main Solitaire.
                </p>
              </div>
            </div>

            {/* Right Column: Output */}
            <div className="w-full lg:w-1/2 min-h-[500px]">
              <ResponseCertificate
                originalText={complaintText}
                isProcessing={isProcessing}
                onComplete={handleProcessingComplete}
              />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default App;
