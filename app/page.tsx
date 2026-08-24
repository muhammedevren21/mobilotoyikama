import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HEADER ── */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-blue-600 font-bold text-xl tracking-tight">
          💧 mobilotoyıkama.com
        </div>
        <div className="flex gap-3">
          <Link href="/giris" className="text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium">
            Giriş Yap
          </Link>
          <Link href="/kayit" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
            Kayıt Ol
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-24 px-6 text-center overflow-hidden">
        {/* Dekoratif daireler */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-white/5 rounded-full" />

        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            🚀 İstanbul genelinde hizmet veriyoruz
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            Arabanızı Kapınızda <br />
            <span className="text-blue-200">Yıkayalım</span>
          </h1>
          <p className="text-blue-100 text-lg mb-10">
            En yakın profesyonel yıkama ekibi dakikalar içinde kapınızda. <br className="hidden sm:block" />
            Sipariş ver, gerisini biz halledelim.
          </p>

          <div className="max-w-lg mx-auto bg-white rounded-2xl p-2 flex gap-2 shadow-xl">
            <input
              type="text"
              placeholder="Adresinizi girin..."
              className="flex-1 text-gray-700 text-sm focus:outline-none px-4 py-3 bg-transparent"
            />
            <Link
              href="/siparis"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition whitespace-nowrap"
            >
              Sipariş Ver →
            </Link>
          </div>

          <p className="text-blue-200 text-xs mt-4">💳 Kredi kartı, havale veya kapıda ödeme</p>
        </div>
      </section>

      {/* ── İSTATİSTİKLER ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { sayi: "2.400+", label: "Mutlu Müşteri" },
            { sayi: "120+", label: "Aktif Yıkayıcı" },
            { sayi: "4.8★", label: "Ortalama Puan" },
            { sayi: "30 dk", label: "Ortalama Varış" },
          ].map((ist) => (
            <div key={ist.label}>
              <div className="text-2xl font-extrabold text-blue-600">{ist.sayi}</div>
              <div className="text-sm text-gray-500 mt-1">{ist.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HİZMETLER ── */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Paketler</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Size Uygun Paketi Seçin</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🚿", title: "Dış Yıkama", price: "₺150", desc: "Araç dışı tamamen temizlenir", popular: false, items: ["Dış yıkama", "Cam temizliği", "Lastik parlatma"] },
            { icon: "✨", title: "İç + Dış Yıkama", price: "₺250", desc: "İç ve dış komple temizlik", popular: true, items: ["Dış yıkama", "İç temizlik", "Koltuk süpürme", "Gösterge paneli"] },
            { icon: "💎", title: "Detaylı Temizlik", price: "₺450", desc: "Profesyonel detaylı temizlik", popular: false, items: ["Komple temizlik", "Buharlı temizlik", "Deri bakımı", "Motor temizliği"] },
          ].map((hizmet) => (
            <div
              key={hizmet.title}
              className={`relative rounded-2xl p-6 transition-all ${
                hizmet.popular
                  ? "bg-blue-600 text-white shadow-2xl scale-105"
                  : "border border-gray-200 hover:border-blue-300 hover:shadow-lg bg-white"
              }`}
            >
              {hizmet.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  En Popüler
                </span>
              )}
              <div className="text-4xl mb-4">{hizmet.icon}</div>
              <div className={`font-bold text-xl mb-1 ${hizmet.popular ? "text-white" : "text-gray-800"}`}>{hizmet.title}</div>
              <div className={`font-extrabold text-3xl mb-3 ${hizmet.popular ? "text-white" : "text-blue-600"}`}>{hizmet.price}</div>
              <ul className="space-y-2 mb-6">
                {hizmet.items.map((item) => (
                  <li key={item} className={`text-sm flex items-center gap-2 ${hizmet.popular ? "text-blue-100" : "text-gray-500"}`}>
                    <span className={hizmet.popular ? "text-blue-200" : "text-blue-500"}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/siparis"
                className={`block text-center py-3 rounded-xl text-sm font-semibold transition ${
                  hizmet.popular
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Hemen Sipariş Ver
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="text-center mb-12">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Süreç</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Nasıl Çalışır?</h2>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { step: "1", icon: "📍", title: "Adres Gir", desc: "Bulunduğunuz adresi girin" },
            { step: "2", icon: "🚗", title: "Araç Bilgisi", desc: "Plaka ve fotoğraf ekleyin" },
            { step: "3", icon: "💳", title: "Ödeme Yap", desc: "Güvenli online ödeme" },
            { step: "4", icon: "🧹", title: "Yıkama", desc: "Ekibimiz kapınıza gelir" },
          ].map((adim, i) => (
            <div key={adim.step} className="flex flex-col items-center relative">
              {i < 3 && <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-blue-200" />}
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-4 shadow-md relative z-10">
                {adim.step}
              </div>
              <div className="text-3xl mb-2">{adim.icon}</div>
              <div className="font-bold text-gray-800 mb-1 text-sm">{adim.title}</div>
              <div className="text-gray-400 text-xs">{adim.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MÜŞTERİ YORUMLARI ── */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Yorumlar</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Müşterilerimiz Ne Diyor?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { ad: "Mehmet Y.", puan: "★★★★★", yorum: "Harika hizmet! Arabam tertemiz oldu, üstelik çok hızlıydılar. Kesinlikle tekrar kullanacağım.", bolge: "Kadıköy" },
            { ad: "Ayşe K.", puan: "★★★★★", yorum: "Sipariş verdikten 25 dakika sonra geldiler. Fiyat-kalite dengesi mükemmel. Tavsiye ederim!", bolge: "Beşiktaş" },
            { ad: "Ali D.", puan: "★★★★☆", yorum: "Detaylı temizlik paketi gerçekten çok iyi. İç mekan pırıl pırıl oldu. Teşekkürler!", bolge: "Üsküdar" },
          ].map((yorum) => (
            <div key={yorum.ad} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="text-amber-400 text-lg mb-3">{yorum.puan}</div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{yorum.yorum}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                  {yorum.ad[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{yorum.ad}</div>
                  <div className="text-gray-400 text-xs">{yorum.bolge}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── YIKAYICI OL ── */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-4xl mb-4 block">🧹</span>
          <h2 className="text-3xl font-extrabold mb-4">Yıkayıcı Olarak Katıl</h2>
          <p className="text-slate-300 text-lg mb-8">
            Kendi işinin patronu ol. Esnek çalışma saatleriyle istediğin zaman, istediğin kadar kazan.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
            {["Esnek Saatler", "Hızlı Ödeme", "Ekipman Desteği"].map((item) => (
              <div key={item} className="bg-white/10 rounded-xl py-3 px-2 text-sm font-medium text-slate-200">
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/yikayici-kayit"
            className="inline-block bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-slate-100 transition text-base shadow-lg"
          >
            Hemen Başvur →
          </Link>
        </div>
      </section>

   {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="text-white font-bold text-lg mb-3">💧 mobilotoyıkama.com</div>
              <p className="text-sm text-gray-500">Türkiye'nin ilk mobil araç yıkama platformu.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Hizmetler</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="/siparis" className="hover:text-white transition">Sipariş Ver</Link>
                <Link href="/giris" className="hover:text-white transition">Giriş Yap</Link>
                <Link href="/kayit" className="hover:text-white transition">Kayıt Ol</Link>
                <Link href="/yikayici-kayit" className="hover:text-white transition">Yıkayıcı Ol</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Kurumsal</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="/hakkimizda" className="hover:text-white transition">Hakkımızda</Link>
                <Link href="/kariyer" className="hover:text-white transition">Kariyer</Link>
                <Link href="/iletisim" className="hover:text-white transition">İletişim</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Yasal</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="/kvkk" className="hover:text-white transition">KVKK</Link>
                <Link href="/sss" className="hover:text-white transition">S.S.S.</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            © 2026 mobilotoyıkama.com — Tüm hakları saklıdır.
          </div>
        </div>
      </footer>

    </div>
  );
}