import Link from "next/link";

export default function Kariyer() {
  const ilanlar = [
    { pozisyon: "Mobil Yıkayıcı", bolge: "İstanbul (Tüm İlçeler)", tip: "Serbest Çalışma", aciklama: "Esnek çalışma saatleriyle kendi işinin patronu ol. Ekipman desteği sağlıyoruz." },
    { pozisyon: "Bölge Koordinatörü", bolge: "İstanbul Anadolu Yakası", tip: "Tam Zamanlı", aciklama: "Bölgenizdeki yıkayıcı ekibini yönetin, kalite kontrolü yapın." },
    { pozisyon: "Müşteri Hizmetleri Uzmanı", bolge: "Uzaktan / Remote", tip: "Tam Zamanlı", aciklama: "Müşteri taleplerine hızlı ve etkili şekilde yanıt verin." },
    { pozisyon: "Full Stack Geliştirici", bolge: "Uzaktan / Remote", tip: "Tam Zamanlı", aciklama: "Next.js ve Supabase teknolojileriyle platform geliştirme ekibimize katılın." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="text-blue-600 font-bold text-xl tracking-tight">💧 mobilotoyıkama.com</Link>
        <div className="flex gap-3">
          <Link href="/giris" className="text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium">Giriş Yap</Link>
          <Link href="/kayit" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">Kayıt Ol</Link>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Kariyer</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">Büyüyen ekibimize katıl, Türkiye'nin mobil yıkama sektörünü birlikte şekillendirelim.</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: "🚀", baslik: "Hızlı Büyüme", aciklama: "Startup enerjisiyle büyüyen bir ekibin parçası ol." },
            { icon: "💰", baslik: "Rekabetçi Ücret", aciklama: "Piyasanın üzerinde maaş ve performans bonusu." },
            { icon: "🏖️", baslik: "Esnek Çalışma", aciklama: "Uzaktan çalışma ve esnek saat seçenekleri." },
          ].map((item) => (
            <div key={item.baslik} className="bg-slate-50 rounded-2xl p-6">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{item.baslik}</h3>
              <p className="text-gray-500 text-sm">{item.aciklama}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Açık Pozisyonlar</h2>
          <div className="space-y-4">
            {ilanlar.map((ilan) => (
              <div key={ilan.pozisyon} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-800">{ilan.pozisyon}</h3>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full font-semibold">{ilan.tip}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">📍 {ilan.bolge}</p>
                  <p className="text-sm text-gray-500">{ilan.aciklama}</p>
                </div>
                <Link
                  href="/iletisim"
                  className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
                >
                  Başvur
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <p className="text-blue-700 font-medium">Aradığın pozisyonu bulamadın mı?</p>
          <p className="text-blue-500 text-sm mt-1">CV'ni bize gönder, uygun bir pozisyon açıldığında seni arayalım.</p>
          <Link href="/iletisim" className="inline-block mt-4 bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition">
            CV Gönder
          </Link>
        </div>

      </section>

      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <div className="text-white font-bold text-lg mb-1">💧 mobilotoyıkama.com</div>
            <p className="text-sm">© 2026 Tüm hakları saklıdır.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/hakkimizda" className="hover:text-white transition">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-white transition">İletişim</Link>
            <Link href="/kvkk" className="hover:text-white transition">KVKK</Link>
            <Link href="/ss" className="hover:text-white transition">S.S.S.</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
