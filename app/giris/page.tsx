"use client";

import { useState } from "react";
import Link from "next/link";

export default function GirisPage() {
  const [form, setForm] = useState({ email: "", sifre: "" });
  const [hata, setHata] = useState("");

  const handleSubmit = () => {
    if (!form.email || !form.sifre) {
      setHata("Lütfen tüm alanları doldurun.");
      return;
    }
    setHata("");
    alert("Giriş başarılı!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-blue-600 font-bold text-xl">mobilotoyıkama.com</Link>
        <Link href="/kayit" className="text-gray-600 text-sm hover:text-blue-600">Hesabın yok mu? Kayıt ol</Link>
      </header>

      {/* FORM */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Giriş Yap</h1>
          <p className="text-gray-500 text-sm mb-6">Hesabınıza giriş yapın</p>

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

          <div className="mb-5">
            <label className="text-sm text-gray-600 block mb-1">Şifre</label>
            <input
              type="password"
              value={form.sifre}
              onChange={(e) => setForm({ ...form, sifre: e.target.value })}
              placeholder="Şifreniz"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
            />
            <div className="text-right mt-1">
              <Link href="/sifremi-unuttum" className="text-xs text-blue-500 hover:underline">Şifremi unuttum</Link>
            </div>
          </div>

          {hata && (
            <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">{hata}</div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Giriş Yap
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-white px-2">veya</div>
          </div>

          <p className="text-sm text-center text-gray-500">
            Hesabın yok mu?{" "}
            <Link href="/kayit" className="text-blue-600 font-medium hover:underline">Kayıt ol</Link>
          </p>
        </div>
      </div>
    </div>
  );
}