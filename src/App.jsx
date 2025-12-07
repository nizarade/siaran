import React, { useState } from 'react';
import Header from './components/Header';
import ComplaintForm from './components/ComplaintForm';
import ResponseCertificate from './components/ResponseCertificate';
import Footer from './components/Footer';

function App() {
  const [complaintText, setComplaintText] = useState('');
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
    <div className="min-h-screen flex flex-col bg-[#f0f0f0]">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Column: Input */}
          <div className="w-full lg:w-1/2">
            <ComplaintForm 
              onSubmit={handleComplaintSubmit} 
              isSubmitting={isProcessing} 
            />
            
            {/* Satirical Banner */}
            <div className="mt-8 bg-official-green text-yellow-400 p-4 border-4 border-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <h3 className="font-bold text-xl font-serif mb-2">📢 PENGUMUMAN</h3>
              <p className="text-sm">
                Layanan ini buka setiap hari Senin - Kamis (08.00 - 08.15 WIB). 
                Di luar jam tersebut, admin sedang main Solitaire.
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

      <Footer />
    </div>
  );
}

export default App;
