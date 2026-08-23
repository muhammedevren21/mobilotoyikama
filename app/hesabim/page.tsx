"use client";

import { useState } from "react";

// ─── Dummy Data ───────────────────────────────────────────────
const kullanici = {
  ad: "Mehmet",
  soyad: "Yılmaz",
  email: "mehmet@example.com",
  telefon: "0532 123 45 67",
  avatarHarfi: "M",
};

const siparisGecmisi = [
  {
    id: "SP-1041",
    tarih: "18 Ağu 2026",
    paket: "Detaylı İç-Dış Yıkama",
    arac: "Toyota Corolla • 34 ABC 123",
    durum: "tamamlandi",
    tutar: "₺420",
  },
  {
    id: "SP-1038",
    tarih: "10 Ağu 2026",
    paket: "Standart Dış Yıkama",
    arac: "Toyota Corolla • 34 ABC 123",
    durum: "tamamlandi",
    tutar: "₺180",
  },
  {
    id: "SP-1052",
    tarih: "22 Ağu 2026",
    paket: "Buharlı Temizlik",
    arac: "Toyota Corolla • 34 ABC 123",
    durum: "beklemede",
    tutar: "₺650",
  },
];

const odemeYontemleri = [
  { id: 1, tip: "Kredi Kartı", son4: "4242", marka: "Visa", varsayilan: true },
  { id: 2, tip: "Kredi Kartı", son4: "1881", marka: "Mastercard", varsayilan: false },
];

// ─── Küçük Bileşenler ─────────────────────────────────────────
const durumBadge = (durum) => {
  const stil =
    durum === "tamamlandi"
      ? "bg-green-100 text-green-700"
      : durum === "beklemede"
      ? "bg-amber-100 text-amber-700"
      : "bg-gray-100 text-gray-500";
  const etiket =
    durum === "tamamlandi" ? "Tamamlandı" : durum === "beklemede" ? "Beklemede" : "İptal";
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stil}`}>{etiket}</span>
  );
};

// ─── Ana Bileşen ──────────────────────────────────────────────
export default function HesabimSayfasi() {
  const [aktifSekme, setAktifSekme] = useState("profil");
  const [form, setForm] = useState({ ...kullanici });
  const [kaydedildi, setKaydedildi] = useState(false);
  const [kartEkleAcik, setKartEkleAcik] = useState(false);

  const handleKaydet = () => {
    setKaydedildi(true);
    setTimeout(() => setKaydedildi(false), 2500);
  };

  const sekmeler = [
    { id: "profil", label: "Profil Bilgileri", icon: "👤" },
    { id: "siparisler", label: "Sipariş Geçmişi", icon: "📦" },
    { id: "odeme", label: "Ödeme Yöntemleri", icon: "💳" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Navbar ── */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          💧 mobilotoyıkama
        </a>
        <a href="/siparis" className="text-sm bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition">
          Yeni Sipariş
        </a>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ── Başlık Kartı ── */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-6 mb-6 text-white flex items-center gap-5 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-white text-blue-700 flex items-center justify-center text-2xl font-bold shadow">
            {kullanici.avatarHarfi}
          </div>
          <div>
            <p className="text-blue-200 text-sm">Hesabım</p>
            <h1 className="text-2xl font-bold">
              {kullanici.ad} {kullanici.soyad}
            </h1>
            <p className="text-blue-100 text-sm mt-0.5">{kullanici.email}</p>
          </div>
        </div>

        {/* ── Sekmeler ── */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {sekmeler.map((s) => (
            <button
              key={s.id}
              onClick={() => setAktifSekme(s.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                aktifSekme === s.id
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>

        {/* ──────────────────────────────────────
            SEKME 1: PROFİL BİLGİLERİ
        ────────────────────────────────────── */}
        {aktifSekme === "profil" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
            <h2 className="text-lg font-bold text-slate-800">Kişisel Bilgiler</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Ad", key: "ad", type: "text" },
                { label: "Soyad", key: "soyad", type: "text" },
                { label: "E-posta", key: "email", type: "email" },
                { label: "Telefon", key: "telefon", type: "tel" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleKaydet}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition text-sm"
              >
                Değişiklikleri Kaydet
              </button>
              {kaydedildi && (
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  ✅ Kaydedildi
                </span>
              )}
            </div>

            {/* Şifre Bölümü */}
            <div className="border-t border-slate-100 pt-5 mt-2">
              <h3 className="text-md font-bold text-slate-800 mb-4">Şifre Değiştir</h3>
              <div className="space-y-3">
                {["Mevcut Şifre", "Yeni Şifre", "Yeni Şifre (Tekrar)"].map((label) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                      {label}
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                  </div>
                ))}
              </div>
              <button className="mt-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl transition text-sm">
                Şifreyi Güncelle
              </button>
            </div>

            {/* Çıkış */}
            <div className="border-t border-slate-100 pt-5">
              <button className="text-red-500 hover:text-red-700 text-sm font-semibold flex items-center gap-2 transition">
                🚪 Hesaptan Çıkış Yap
              </button>
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────
            SEKME 2: SİPARİŞ GEÇMİŞİ
        ────────────────────────────────────── */}
        {aktifSekme === "siparisler" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-800">Sipariş Geçmişi</h2>
              <span className="text-sm text-slate-400">{siparisGecmisi.length} sipariş</span>
            </div>

            {siparisGecmisi.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-400 font-mono">{s.id}</span>
                    {durumBadge(s.durum)}
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">{s.paket}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    🚗 {s.arac} · 📅 {s.tarih}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-700 font-bold text-lg">{s.tutar}</span>
                  <button className="text-xs border border-blue-200 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition font-medium">
                    Detay
                  </button>
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <a
                href="/siparis"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition"
              >
                + Yeni Sipariş Ver
              </a>
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────
            SEKME 3: ÖDEME YÖNTEMLERİ
        ────────────────────────────────────── */}
        {aktifSekme === "odeme" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-800">Kayıtlı Kartlar</h2>
              <button
                onClick={() => setKartEkleAcik(!kartEkleAcik)}
                className="text-sm bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl transition"
              >
                + Kart Ekle
              </button>
            </div>

            {odemeYontemleri.map((k) => (
              <div
                key={k.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500">
                    {k.marka === "Visa" ? "VISA" : "MC"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      {k.tip} •••• {k.son4}
                      {k.varsayilan && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                          Varsayılan
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-400">{k.marka}</p>
                  </div>
                </div>
                <button className="text-xs text-red-400 hover:text-red-600 font-medium transition">
                  Kaldır
                </button>
              </div>
            ))}

            {/* Kart Ekleme Formu */}
            {kartEkleAcik && (
              <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6 space-y-4">
                <h3 className="font-bold text-slate-800">Yeni Kart Ekle</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                    Kart Numarası
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                      Son Kullanma
                    </label>
                    <input
                      type="text"
                      placeholder="AA/YY"
                      maxLength={5}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="•••"
                      maxLength={3}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-3 rounded-xl text-sm transition">
                    Kartı Kaydet
                  </button>
                  <button
                    onClick={() => setKartEkleAcik(false)}
                    className="text-slate-500 hover:text-slate-700 font-semibold px-5 py-3 rounded-xl text-sm border border-slate-200 hover:bg-slate-50 transition"
                  >
                    İptal
                  </button>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-600 flex items-start gap-2 mt-2">
              <span className="text-base">🔒</span>
              <span>
                Kart bilgileriniz İyzico altyapısıyla güvenli şekilde saklanır. Biz kart
                numaranızı hiçbir zaman göremeyiz.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
