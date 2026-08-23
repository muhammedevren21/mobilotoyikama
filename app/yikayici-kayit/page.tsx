"use client";

import { useState } from "react";
import Link from "next/link";

export default function YikayiciKayitPage() {
  const [adim, setAdim] = useState(1);
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    sifre: "",
    il: "",
    ilce: "",
    aracPlaka: "",
    tcNo: "",
    iban: "",
  });
  const [hata, setHata] = useState("");

  const adimlar = [
    { no: 1, label: "Kişisel" },
    { no: 2, label: "Konum" },
    { no: 3, label: "Araç & Ödeme" },
  ];

  const iller = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep", "Mersin", "Kayseri"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-blue-600 font-bold text-xl">mobilotoyıkama.com</Link>
        <Link href="/giris" className="text-gray-600 text-sm hover:text-blue-600">Zaten hesabın var mı? Giriş yap</Link>
      </header>

      {/* ADIM GÖSTERGESİ */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {adimlar.map((a, i) => (
            <div key={a.no} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  adim > a.no ? "bg-blue-600 text-white" :
                  adim === a.no ? "bg-blue-600 text-white" :
                  "bg-gray-200 text-gray-400"
                }`}>
                  {adim > a.no ? "✓" : a.no}
                </div>
                <span className={`text-xs mt-1 ${adim >= a.no ? "text-blue-600 font-medium" : "text-gray-400"}`}>{a.label}</span>
              </div>
              {i < adimlar.length - 1 && (
                <div className={`h-0.5 w-24 mx-2 mb-4 ${adim > a.no ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 w-full max-w-lg">

          {/* ADIM 1 - KİŞİSEL BİLGİLER */}
          {adim === 1 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Kişisel Bilgiler</h2>
              <p className="text-gray-500 text-sm mb-5">Yıkayıcı olarak kayıt olun, para kazanın</p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Ad</label>
                  <input type="text" value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} placeholder="Adınız" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Soyad</label>
                  <input type="text" value={form.soyad} onChange={(e) => setForm({ ...form, soyad: e.target.value })} placeholder="Soyadınız" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
                </div>
              </div>

              <div className="mb-3">
                <label className="text-sm text-gray-600 block mb-1">E-posta</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ornek@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
              </div>

              <div className="mb-3">
                <label className="text-sm text-gray-600 block mb-1">Telefon</label>
                <input type="tel" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} placeholder="05XX XXX XX XX" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
              </div>

              <div className="mb-5">
                <label className="text-sm text-gray-600 block mb-1">Şifre</label>
                <input type="password" value={form.sifre} onChange={(e) => setForm({ ...form, sifre: e.target.value })} placeholder="En az 6 karakter" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
              </div>

              {hata && <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">{hata}</div>}

              <button
                onClick={() => {
                  if (!form.ad || !form.soyad || !form.email || !form.telefon || !form.sifre) {
                    setHata("Lütfen tüm alanları doldurun.");
                    return;
                  }
                  setHata("");
                  setAdim(2);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Devam Et →
              </button>
            </>
          )}

          {/* ADIM 2 - KONUM */}
          {adim === 2 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Çalışma Bölgesi</h2>
              <p className="text-gray-500 text-sm mb-5">Hangi bölgede hizmet vereceksiniz?</p>

              <div className="mb-3">
                <label className="text-sm text-gray-600 block mb-1">İl</label>
                <select value={form.il} onChange={(e) => setForm({ ...form, il: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-400">
                  <option value="">İl seçin</option>
                  {iller.map((il) => <option key={il} value={il}>{il}</option>)}
                </select>
              </div>

              <div className="mb-5">
                <label className="text-sm text-gray-600 block mb-1">İlçe</label>
                <input type="text" value={form.ilce} onChange={(e) => setForm({ ...form, ilce: e.target.value })} placeholder="İlçe adı" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-5">
                <p className="text-sm text-blue-700">📍 Seçtiğiniz bölgedeki siparişler size iletilecek. Sonradan değiştirebilirsiniz.</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setAdim(1)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50">← Geri</button>
                <button
                  onClick={() => {
                    if (!form.il || !form.ilce) { setHata("Lütfen il ve ilçe seçin."); return; }
                    setHata("");
                    setAdim(3);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                >
                  Devam Et →
                </button>
              </div>
              {hata && <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mt-3">{hata}</div>}
            </>
          )}

          {/* ADIM 3 - ARAÇ & ÖDEME */}
          {adim === 3 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Araç & Ödeme Bilgileri</h2>
              <p className="text-gray-500 text-sm mb-5">Kazancınız doğrudan IBAN'ınıza aktarılır</p>

              <div className="mb-3">
                <label className="text-sm text-gray-600 block mb-1">Araç Plakası</label>
                <input type="text" value={form.aracPlaka} onChange={(e) => setForm({ ...form, aracPlaka: e.target.value.toUpperCase() })} placeholder="34 ABC 123" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
              </div>

              <div className="mb-3">
                <label className="text-sm text-gray-600 block mb-1">TC Kimlik No</label>
                <input type="text" value={form.tcNo} onChange={(e) => setForm({ ...form, tcNo: e.target.value })} placeholder="XXXXXXXXXXX" maxLength={11} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
              </div>

              <div className="mb-5">
                <label className="text-sm text-gray-600 block mb-1">IBAN</label>
                <input type="text" value={form.iban} onChange={(e) => setForm({ ...form, iban: e.target.value.toUpperCase() })} placeholder="TR00 0000 0000 0000 0000 0000 00" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 mb-5">
                <p className="text-sm text-yellow-700">⚠️ Bilgileriniz güvenli şekilde saklanır. Başvurunuz incelendikten sonra aktif edilir.</p>
              </div>

              {hata && <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">{hata}</div>}

              <div className="flex gap-3">
                <button onClick={() => setAdim(2)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50">← Geri</button>
                <button
                  onClick={() => {
                    if (!form.aracPlaka || !form.tcNo || !form.iban) { setHata("Lütfen tüm alanları doldurun."); return; }
                    setHata("");
                    alert("Başvurunuz alındı! İnceleme sonrası sizi arayacağız.");
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                >
                  Başvur ✓
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}