"use client";

import Link from "next/link";
import { useState } from "react";

export default function Iletisim() {
  const [form, setForm] = useState({ ad: "", email: "", telefon: "", mesaj: "" });
  const [gonderildi, setGonderildi] = useState(false);

  const handleGonder = () => {
    setGonderildi(true);
    setTimeout(() => setGonderildi(false), 3000);
    setForm({ ad: "", email: "", telefon: "", mesaj: "" });
  };

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
        <h1 className="text-4xl font-extrabold mb-3">İletişim</h1>
        <p className="text-blue-100 text-lg">Size yardımcı olmaktan mutluluk duyarız.</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Bize Ulaşın</h2>
            <div className="space-y-4">
              {[
                { icon: "📧", baslik: "E-posta", deger: "destek@mobilotoyıkama.com" },
                { icon: "📞", baslik: "Telefon", deger: "0850 123 45 67" },
                { icon: "📍", baslik: "Adres", deger: "Kadıköy, İstanbul" },
                { icon: "🕐", baslik: "Çalışma Saatleri", deger: "Pazartesi–Pazar 08:00–22:00" },
              ].map((item) => (
                <div key={item.baslik} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.baslik}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{item.deger}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-extrabold text-gray-900">Mesaj Gönder</h2>
            {[
              { label: "Ad Soyad", key: "ad", type: "text", placeholder: "Adınız Soyadınız" },
              { label: "E-posta", key: "email", type: "email", placeholder: "ornek@email.com" },
              { label: "Telefon", key: "telefon", type: "tel", placeholder: "0532 xxx xx xx" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Mesajınız</label>
              <textarea
                rows={4}
                placeholder="Mesajınızı yazın..."
                value={form.mesaj}
                onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
              />
            </div>
            <button
              onClick={handleGonder}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              {gonderildi ? "✅ Mesajınız İletildi!" : "Gönder"}
            </button>
          </div>

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
