import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t-8 border-yellow-400">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl border-2 border-yellow-400">
                🙂
              </div>
              <h3 className="text-2xl font-serif font-bold text-yellow-400">SIARAN</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Platform digital terdepan dalam menampung aspirasi rakyat untuk kemudian diarsipkan selamanya di server yang lupa dibayar.
            </p>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400 border-b border-slate-700 pb-2 inline-block">
              Tentang Kami
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Profil Pejabat</a></li>
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Karir (Jangan Join)</a></li>
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Budaya Lembur</a></li>
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Korupsi Berjamaah</a></li>
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400 border-b border-slate-700 pb-2 inline-block">
              Pusat Bantuan
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Chat dengan Bot Bodoh</a></li>
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Lapor Polisi</a></li>
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Dukun Santet</a></li>
              <li><a href="#" className="hover:text-yellow-400 hover:underline">FAQ (Tidak Ada Jawaban)</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400 border-b border-slate-700 pb-2 inline-block">
              Legal
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Privasi (Kami Jual Data)</a></li>
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Syarat & Ketentuan (Jebakan)</a></li>
              <li><a href="#" className="hover:text-yellow-400 hover:underline">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm font-mono">
          <p>&copy; 2025 Kerjain. Kami tidak bertanggung jawab atas kerusakan mental Anda.</p>
          <p className="mt-2 text-xs">Dibuat dengan ❤️ dan sedikit 💸 pajak rakyat.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
