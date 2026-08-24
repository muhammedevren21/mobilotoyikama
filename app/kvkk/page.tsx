import Link from "next/link";

export default function KVKK() {
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
        <h1 className="text-4xl font-extrabold mb-3">KVKK Aydınlatma Metni</h1>
        <p className="text-blue-100">Son güncelleme: Ağustos 2026</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 space-y-8 text-gray-600 leading-relaxed">

        {[
          {
            baslik: "1. Veri Sorumlusu",
            icerik: "6698 sayılı Kişisel Verilerin Korunması Kanunu ('KVKK') uyarınca kişisel verileriniz; veri sorumlusu sıfatıyla mobilotoyıkama.com tarafından aşağıda açıklanan kapsamda işlenmektedir.",
          },
          {
            baslik: "2. İşlenen Kişisel Veriler",
            icerik: "Platformumuzu kullanmanız sürecinde; ad-soyad, e-posta adresi, telefon numarası, adres bilgileri, araç plakası, ödeme bilgileri (kart numarası hariç) ve konum verileri işlenmektedir.",
          },
          {
            baslik: "3. Kişisel Verilerin İşlenme Amacı",
            icerik: "Kişisel verileriniz; sipariş ve hizmet süreçlerinin yürütülmesi, ödeme işlemlerinin gerçekleştirilmesi, müşteri hizmetleri ve destek sağlanması, yasal yükümlülüklerin yerine getirilmesi ve platform güvenliğinin sağlanması amaçlarıyla işlenmektedir.",
          },
          {
            baslik: "4. Kişisel Verilerin Aktarılması",
            icerik: "Kişisel verileriniz; ödeme altyapısı sağlayıcıları (İyzico), SMS/e-posta bildirim hizmet sağlayıcıları ve yasal zorunluluk halinde ilgili kamu kurumlarıyla paylaşılabilir. Yurt dışına veri aktarımı açık rızanız olmadan gerçekleştirilmez.",
          },
          {
            baslik: "5. Kişisel Verilerin Saklanması",
            icerik: "Kişisel verileriniz, hizmet ilişkisinin devamı süresince ve akabinde yasal saklama yükümlülükleri çerçevesinde muhafaza edilir. Yasal yükümlülük sona erdikten sonra verileriniz silinir, yok edilir veya anonim hale getirilir.",
          },
          {
            baslik: "6. KVKK Kapsamındaki Haklarınız",
            icerik: "KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenen verileriniz hakkında bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içi veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenen verilerin düzeltilmesini isteme, silinmesini veya yok edilmesini isteme haklarına sahipsiniz.",
          },
          {
            baslik: "7. İletişim",
            icerik: "KVKK kapsamındaki taleplerinizi destek@mobilotoyıkama.com adresine veya 0850 123 45 67 numaralı telefona iletebilirsiniz. Başvurularınız en geç 30 gün içinde sonuçlandırılır.",
          },
        ].map((bolum) => (
          <div key={bolum.baslik}>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{bolum.baslik}</h2>
            <p>{bolum.icerik}</p>
          </div>
        ))}

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
