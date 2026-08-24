"use client";

import Link from "next/link";
import { useState } from "react";

const sorular = [
  {
    soru: "Hizmet bölgeniz neresi?",
    cevap: "Şu an İstanbul genelinde hizmet veriyoruz. Anadolu ve Avrupa yakasının tüm ilçelerinde aktif yıkayıcılarımız bulunmaktadır. Yakında diğer şehirlere de genişleyeceğiz.",
  },
  {
    soru: "Sipariş verdikten ne kadar sürede geliyorsunuz?",
    cevap: "Siparişinizi onayladıktan sonra ortalama 20-45 dakika içinde kapınızdayız. Yoğunluk durumuna göre bu süre değişebilir, uygulama üzerinden anlık takip yapabilirsiniz.",
  },
  {
    soru: "Ödeme yöntemleriniz nelerdir?",
    cevap: "Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm ödemeler İyzico güvencesiyle gerçekleştirilir.",
  },
  {
    soru: "Aracımın yanında olmam gerekiyor mu?",
    cevap: "Hayır. Siparişte aracınızın konumunu ve anahtarla ilgili bilgileri belirtmeniz yeterli. Yıkama tamamlandığında SMS ve uygulama üzerinden bildirim alırsınız.",
  },
  {
    soru: "Yıkama sırasında araçta hasar oluşursa ne olur?",
    cevap: "Tüm yıkayıcılarımız sigortalıdır. Olası bir hasar durumunda 24 saat içinde müşteri hizmetlerimize bildirmeniz yeterli, gerekli işlemler başlatılır.",
  },
  {
    soru: "İptal veya erteleme yapabilir miyim?",
    cevap: "Yıkayıcı yola çıkmadan önce siparişinizi ücretsiz iptal veya erteleyebilirsiniz. Yıkayıcı yola çıktıktan sonra iptalde %50 ücret uygulanır.",
  },
  {
    soru: "Hangi araç tipleri için hizmet veriyorsunuz?",
    cevap: "Sedan, SUV, hatchback, pick-up ve minibüs dahil tüm binek araçlar için hizmet veriyoruz. Ticari araçlar için lütfen müşteri hizmetleriyle iletişime geçin.",
  },
  {
    soru: "Yıkayıcı olmak için ne yapmalıyım?",
    cevap: "Sitemizin 'Yıkayıcı Ol' bölümünden başvurunuzu yapabilirsiniz. Başvurunuz incelendikten sonra ekibimiz sizi arayacaktır.",
  },
];

export default function SSS() {
  const [acik, setAcik] = useState<number | null>(null);

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
        <h1 className="text-4xl font-extrabold mb-3">Sıkça Sorulan Sorular</h1>
        <p className="text-blue-100 text-lg">Aklınızdaki soruların cevapları burada.</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16 space-y-3">
        {sorular.map((item, i) => (
          <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
            <button
              onClick={() => setAcik(acik === i ? null : i)}
              className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-gray-800 hover:bg-slate-50 transition"
            >
              <span>{item.soru}</span>
              <span className={`text-blue-500 text-xl transition-transform ${acik === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {acik === i && (
              <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                {item.cevap}
              </div>
            )}
          </div>
        ))}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center mt-8">
          <p className="text-blue-700 font-medium mb-1">Sorunuz cevapsız mı kaldı?</p>
          <p className="text-blue-500 text-sm mb-4">Müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyar.</p>
          <Link href="/iletisim" className="inline-block bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition">
            Bize Yazın
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
