"use client";

import { useState } from "react";
import Link from "next/link";

export default function KayitPage() {
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    sifre: "",
    sifreTekrar: "",
  });
  const [hata, setHata] = useState("");

  const handleSubmit = () => {
    if (!form.ad || !form.soyad || !form.email || !form.telefon || !form.sifre) {
      setHata("Lütfen tüm alanları doldurun.");
      return;
    }
    if (form.sifre !== form.sifreTekrar) {
      setHata("Şifreler eşleşmiyor.");
      return;
    }
    setHata("");
    alert("Kayıt başarılı! Giriş yapabilirsiniz.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-blue-600 font-bold text-xl">mobilotoyıkama.com</Link>
        <Link href="/giris" className="text-gray-600 text-sm hover:text-blue-600">Zaten hesabın var mı? Giriş yap</Link>
      </header>

      {/* FORM */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Hesap Oluştur</h1>
          <p className="text-gray-500 text-sm mb-6">Arabanızı kapınızda yıkayalım</p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Ad</label>
              <input
                type="text"
                value={form.ad}
                onChange={(e) => setForm({ ...form, ad: e.target.value })}
                placeholder="Adınız"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Soyad</label>
              <input
                type="text"
                value={form.soyad}
                onChange={(e) => setForm({ ...form, soyad: e.target.value })}
                placeholder="Soyadınız"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="text-sm text-gray-600 block mb-1">E-posta</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ornek@email.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-3">
            <label className="text-sm text-gray-600 block mb-1">Telefon</label>
            <input
              type="tel"
              value={form.telefon}
              onChange={(e) => setForm({ ...form, telefon: e.target.value })}
              placeholder="05XX XXX XX XX"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-3">
            <label className="text-sm text-gray-600 block mb-1">Şifre</label>
            <input
              type="password"
              value={form.sifre}
              onChange={(e) => setForm({ ...form, sifre: e.target.value })}
              placeholder="En az 6 karakter"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-5">
            <label className="text-sm text-gray-600 block mb-1">Şifre Tekrar</label>
            <input
              type="password"
              value={form.sifreTekrar}
              onChange={(e) => setForm({ ...form, sifreTekrar: e.target.value })}
              placeholder="Şifrenizi tekrar girin"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          {hata && (
            <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">{hata}</div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Kayıt Ol
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Kayıt olarak{" "}
            <Link href="/kvkk" className="text-blue-500 hover:underline">Gizlilik Politikası</Link>
            {" "}ve{" "}
            <Link href="/kullanim-kosullari" className="text-blue-500 hover:underline">Kullanım Koşulları</Link>
            {"'nı"} kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
}