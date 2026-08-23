"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const hizmetler = [
  { id: "dis", icon: "🚿", title: "Dış Yıkama", price: 150, desc: "Araç dışı tamamen temizlenir" },
  { id: "icDis", icon: "✨", title: "İç + Dış Yıkama", price: 250, desc: "İç ve dış komple temizlik" },
  { id: "detay", icon: "💎", title: "Detaylı Temizlik", price: 450, desc: "Profesyonel detaylı temizlik" },
];

export default function SiparisPage() {
  const router = useRouter();
  const [adim, setAdim] = useState(1);
  const [form, setForm] = useState({
    adres: "",
    adresDetay: "",
    hizmet: "",
    plaka: "",
    aracFoto: null as File | null,
    not: "",
  });

  const secilenHizmet = hizmetler.find((h) => h.id === form.hizmet);

  const adimlar = [
    { no: 1, label: "Adres" },
    { no: 2, label: "Hizmet" },
    { no: 3, label: "Araç" },
    { no: 4, label: "Özet" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-blue-600 font-bold text-xl">mobilotoyıkama.com</Link>
        <span className="text-gray-500 text-sm">Sipariş Ver</span>
      </header>

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
                <div className={`h-0.5 w-16 mx-2 mb-4 ${adim > a.no ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 w-full max-w-lg">

          {adim === 1 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Adresiniz</h2>
              <p className="text-gray-500 text-sm mb-5">Yıkama yapılacak adresi girin</p>
              <div className="mb-3">
                <label className="text-sm text-gray-600 block mb-1">Adres</label>
                <input
                  type="text"
                  value={form.adres}
                  onChange={(e) => setForm({ ...form, adres: e.target.value })}
                  placeholder="Mahalle, cadde, sokak..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="mb-5">
                <label className="text-sm text-gray-600 block mb-1">Adres Detayı (isteğe bağlı)</label>
                <input
                  type="text"
                  value={form.adresDetay}
                  onChange={(e) => setForm({ ...form, adresDetay: e.target.value })}
                  placeholder="Daire no, kat, açık adres..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
              </div>
              <button
                onClick={() => { if (form.adres) setAdim(2); }}
                disabled={!form.adres}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-40"
              >
                Devam Et →
              </button>
            </>
          )}

          {adim === 2 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Hizmet Seçin</h2>
              <p className="text-gray-500 text-sm mb-5">Size uygun paketi seçin</p>
              <div className="space-y-3 mb-5">
                {hizmetler.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setForm({ ...form, hizmet: h.id })}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      form.hizmet === h.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{h.icon}</span>
                        <div>
                          <div className="font-medium text-gray-800">{h.title}</div>
                          <div className="text-xs text-gray-500">{h.desc}</div>
                        </div>
                      </div>
                      <div className="text-blue-600 font-bold">{h.price}₺</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setAdim(1)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50">← Geri</button>
                <button onClick={() => { if (form.hizmet) setAdim(3); }} disabled={!form.hizmet} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-40">Devam Et →</button>
              </div>
            </>
          )}

          {adim === 3 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Araç Bilgisi</h2>
              <p className="text-gray-500 text-sm mb-5">Aracınızın bilgilerini girin</p>
              <div className="mb-3">
                <label className="text-sm text-gray-600 block mb-1">Plaka</label>
                <input
                  type="text"
                  value={form.plaka}
                  onChange={(e) => setForm({ ...form, plaka: e.target.value.toUpperCase() })}
                  placeholder="34 ABC 123"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="mb-3">
                <label className="text-sm text-gray-600 block mb-1">Araç Fotoğrafı</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors cursor-pointer">
                  {form.aracFoto ? (
                    <div className="text-green-600 font-medium text-sm">✓ {form.aracFoto.name}</div>
                  ) : (
                    <>
                      <div className="text-3xl mb-2">📷</div>
                      <div className="text-gray-500 text-sm">Fotoğraf yüklemek için tıklayın</div>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, aracFoto: e.target.files?.[0] || null })}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="mb-5">
                <label className="text-sm text-gray-600 block mb-1">Not (isteğe bağlı)</label>
                <textarea
                  value={form.not}
                  onChange={(e) => setForm({ ...form, not: e.target.value })}
                  placeholder="Özel istekleriniz..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setAdim(2)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50">← Geri</button>
                <button onClick={() => { if (form.plaka) setAdim(4); }} disabled={!form.plaka} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-40">Devam Et →</button>
              </div>
            </>
          )}

          {adim === 4 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Sipariş Özeti</h2>
              <p className="text-gray-500 text-sm mb-5">Bilgilerinizi kontrol edin</p>
              <div className="space-y-3 mb-5">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1">📍 Adres</div>
                  <div className="text-sm text-gray-800 font-medium">{form.adres}</div>
                  {form.adresDetay && <div className="text-xs text-gray-500 mt-0.5">{form.adresDetay}</div>}
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1">🧹 Hizmet</div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-800 font-medium">{secilenHizmet?.title}</div>
                    <div className="text-blue-600 font-bold">{secilenHizmet?.price}₺</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1">🚗 Araç</div>
                  <div className="text-sm text-gray-800 font-medium">{form.plaka}</div>
                  {form.aracFoto && <div className="text-xs text-gray-500 mt-0.5">📷 Fotoğraf eklendi</div>}
                </div>
                {form.not && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-400 mb-1">📝 Not</div>
                    <div className="text-sm text-gray-800">{form.not}</div>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">Toplam</span>
                  <span className="text-xl font-bold text-blue-600">{secilenHizmet?.price}₺</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setAdim(3)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50">← Geri</button>
                <button onClick={() => router.push("/siparis-alindi")} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">Siparişi Onayla ✓</button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}