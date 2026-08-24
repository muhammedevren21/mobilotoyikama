import Link from "next/link";

export default function Hakkimizda() {
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
        <h1 className="text-4xl font-extrabold mb-3">Hakkımızda</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">Türkiye'nin ilk mobil araç yıkama platformu olarak araç sahipleriyle profesyonel yıkayıcıları buluşturuyoruz.</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Hikayemiz</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              mobilotoyıkama.com, 2025 yılında İstanbul'da kuruldu. Araç sahiplerinin oto yıkamaya gitmek için vakit kaybetmesi ve oto yıkamacıların müşteri bulmakta zorlanması sorununa çözüm üretmek amacıyla yola çıktık.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Bugün 120'den fazla profesyonel yıkayıcımız ve 2.400'ü aşkın mutlu müşterimizle İstanbul genelinde hizmet veriyoruz. Hedefimiz, tüm Türkiye'ye yayılmak.
            </p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">💧</div>
            <p className="text-blue-700 font-semibold text-lg">"Aracınız temiz, zamanınız değerli."</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🤝", baslik: "Güven", aciklama: "Müşterilerimize ve yıkayıcılarımıza karşı her zaman şeffaf ve dürüstüz." },
              { icon: "⚡", baslik: "Hız", aciklama: "Siparişinizi aldıktan sonra ortalama 30 dakikada kapınızdayız." },
              { icon: "🌍", baslik: "Çevre", aciklama: "Su tasarruflu yöntemler ve çevre dostu ürünler kullanıyoruz." },
            ].map((d) => (
              <div key={d.baslik} className="border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">{d.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{d.baslik}</h3>
                <p className="text-gray-500 text-sm">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center bg-slate-50 rounded-2xl p-8">
          {[
            { sayi: "2025", label: "Kuruluş Yılı" },
            { sayi: "120+", label: "Yıkayıcı" },
            { sayi: "2.400+", label: "Müşteri" },
            { sayi: "İstanbul", label: "Hizmet Bölgesi" },
          ].map((ist) => (
            <div key={ist.label}>
              <div className="text-2xl font-extrabold text-blue-600">{ist.sayi}</div>
              <div className="text-sm text-gray-500 mt-1">{ist.label}</div>
            </div>
          ))}
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
