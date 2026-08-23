"use client";

import { useState } from "react";

// ─── Tipler ───────────────────────────────────────────────────
interface Siparis {
  id: string;
  musteri: string;
  paket: string;
  adres: string;
  tarih: string;
  saat: string;
  tutar: string;
  durum: string;
}

interface Kazanc {
  gun: string;
  tutar: number;
}

// ─── Dummy Data ───────────────────────────────────────────────
const bekleyenSiparisler: Siparis[] = [
  { id: "SP-1055", musteri: "Mehmet Yılmaz", paket: "Buharlı Temizlik", adres: "Kadıköy, İstanbul", tarih: "23 Ağu 2026", saat: "14:00", tutar: "₺650", durum: "beklemede" },
  { id: "SP-1056", musteri: "Ayşe Kara", paket: "Detaylı İç-Dış", adres: "Üsküdar, İstanbul", tarih: "23 Ağu 2026", saat: "16:30", tutar: "₺420", durum: "beklemede" },
  { id: "SP-1057", musteri: "Ali Demir", paket: "Standart Dış", adres: "Beşiktaş, İstanbul", tarih: "24 Ağu 2026", saat: "10:00", tutar: "₺180", durum: "beklemede" },
];

const tamamlananSiparisler: Siparis[] = [
  { id: "SP-1050", musteri: "Fatma Çelik", paket: "Detaylı İç-Dış", adres: "Kadıköy, İstanbul", tarih: "22 Ağu 2026", saat: "11:00", tutar: "₺420", durum: "tamamlandi" },
  { id: "SP-1048", musteri: "Emre Şahin", paket: "Standart Dış", adres: "Şişli, İstanbul", tarih: "21 Ağu 2026", saat: "09:30", tutar: "₺180", durum: "tamamlandi" },
  { id: "SP-1045", musteri: "Zeynep Arslan", paket: "Buharlı Temizlik", adres: "Beşiktaş, İstanbul", tarih: "20 Ağu 2026", saat: "15:00", tutar: "₺650", durum: "tamamlandi" },
  { id: "SP-1042", musteri: "Can Yıldız", paket: "Detaylı İç-Dış", adres: "Üsküdar, İstanbul", tarih: "19 Ağu 2026", saat: "13:00", tutar: "₺420", durum: "tamamlandi" },
];

const kazancVerisi: Kazanc[] = [
  { gun: "Pzt", tutar: 600 },
  { gun: "Sal", tutar: 420 },
  { gun: "Çar", tutar: 830 },
  { gun: "Per", tutar: 180 },
  { gun: "Cum", tutar: 1070 },
  { gun: "Cmt", tutar: 650 },
  { gun: "Paz", tutar: 420 },
];

const maxKazanc = Math.max(...kazancVerisi.map((k) => k.tutar));

// ─── Ana Bileşen ──────────────────────────────────────────────
export default function YikayiciPanel() {
  const [aktifSekme, setAktifSekme] = useState("bekleyen");
  const [bekleyenler, setBekleyenler] = useState<Siparis[]>(bekleyenSiparisler);
  const [musaitlik, setMusaitlik] = useState(true);
  const [profil, setProfil] = useState({
    ad: "Hasan Usta",
    telefon: "0533 111 22 33",
    bolge: "Kadıköy",
    araclar: "Sedan, SUV, Hatchback",
  });

  const toplamKazanc = tamamlananSiparisler.reduce((acc, s) => acc + parseInt(s.tutar.replace("₺", "")), 0);
  const buHaftaKazanc = kazancVerisi.reduce((acc, k) => acc + k.tutar, 0);

  const siparisKabul = (id: string) => {
    setBekleyenler((prev) => prev.filter((s) => s.id !== id));
  };

  const siparisReddet = (id: string) => {
    setBekleyenler((prev) => prev.filter((s) => s.id !== id));
  };

  const sekmeler = [
    { id: "bekleyen", label: "Bekleyen", icon: "⏳", sayi: bekleyenler.length },
    { id: "tamamlanan", label: "Tamamlanan", icon: "✅", sayi: tamamlananSiparisler.length },
    { id: "kazanc", label: "Kazanç", icon: "💰", sayi: null },
    { id: "profil", label: "Profilim", icon: "👤", sayi: null },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Navbar ── */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <a href="/" className="text-xl font-bold tracking-tight">💧 mobilotoyıkama</a>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${musaitlik ? "bg-green-400 text-green-900" : "bg-slate-500 text-slate-200"}`}>
            {musaitlik ? "🟢 Müsait" : "🔴 Meşgul"}
          </span>
          <button
            onClick={() => setMusaitlik(!musaitlik)}
            className="text-xs bg-white text-blue-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
          >
            Durumu Değiştir
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ── Özet Kartlar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Bekleyen", deger: bekleyenler.length, renk: "bg-amber-500", icon: "⏳" },
            { label: "Tamamlanan", deger: tamamlananSiparisler.length, renk: "bg-green-600", icon: "✅" },
            { label: "Bu Hafta", deger: `₺${buHaftaKazanc}`, renk: "bg-blue-600", icon: "📅" },
            { label: "Toplam Kazanç", deger: `₺${toplamKazanc}`, renk: "bg-violet-600", icon: "💰" },
          ].map((k) => (
            <div key={k.label} className={`${k.renk} text-white rounded-2xl p-4 shadow-md`}>
              <div className="text-2xl mb-1">{k.icon}</div>
              <div className="text-xl font-bold">{k.deger}</div>
              <div className="text-xs opacity-80 mt-0.5">{k.label}</div>
            </div>
          ))}
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
              {s.icon} {s.label}
              {s.sayi !== null && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${aktifSekme === s.id ? "bg-white text-blue-700" : "bg-blue-100 text-blue-700"}`}>
                  {s.sayi}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════
            BEKLEYEN SİPARİŞLER
        ══════════════════════════════ */}
        {aktifSekme === "bekleyen" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Bekleyen Siparişler</h2>
            {bekleyenler.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
                <p className="text-4xl mb-3">🎉</p>
                <p className="text-slate-500 font-medium">Bekleyen sipariş yok!</p>
              </div>
            )}
            {bekleyenler.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">{s.id}</span>
                    <p className="font-bold text-slate-800 text-base">{s.paket}</p>
                    <p className="text-sm text-slate-500 mt-0.5">👤 {s.musteri}</p>
                  </div>
                  <span className="text-blue-700 font-bold text-xl">{s.tutar}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-slate-500">
                  <span>📍 {s.adres}</span>
                  <span>📅 {s.tarih}</span>
                  <span>🕐 {s.saat}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => siparisKabul(s.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-sm transition"
                  >
                    ✓ Kabul Et
                  </button>
                  <button
                    onClick={() => siparisReddet(s.id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2.5 rounded-xl text-sm transition"
                  >
                    ✕ Reddet
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════
            TAMAMLANAN SİPARİŞLER
        ══════════════════════════════ */}
        {aktifSekme === "tamamlanan" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Tamamlanan Siparişler</h2>
            {tamamlananSiparisler.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">{s.id}</span>
                  <p className="font-semibold text-slate-800 text-sm">{s.paket}</p>
                  <p className="text-xs text-slate-400 mt-0.5">👤 {s.musteri} · 📅 {s.tarih} · 🕐 {s.saat}</p>
                  <p className="text-xs text-slate-400">📍 {s.adres}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-green-600 font-bold text-lg">{s.tutar}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">Tamamlandı</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════
            KAZANÇ
        ══════════════════════════════ */}
        {aktifSekme === "kazanc" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-800">Kazanç Özeti</h2>

            {/* Özet kartlar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Bu Hafta", deger: `₺${buHaftaKazanc}`, alt: "7 günlük toplam" },
                { label: "Bu Ay", deger: "₺8.240", alt: "Ağustos 2026" },
                { label: "Toplam", deger: `₺${toplamKazanc}`, alt: "Tüm zamanlar" },
              ].map((k) => (
                <div key={k.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{k.label}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{k.deger}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{k.alt}</p>
                </div>
              ))}
            </div>

            {/* Haftalık bar chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-6">Bu Haftaki Kazanç</h3>
              <div className="flex items-end gap-3 h-40">
                {kazancVerisi.map((k) => (
                  <div key={k.gun} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">₺{k.tutar}</span>
                    <div
                      className="w-full bg-blue-500 rounded-t-lg transition-all"
                      style={{ height: `${(k.tutar / maxKazanc) * 100}%`, minHeight: "8px" }}
                    />
                    <span className="text-xs text-slate-400">{k.gun}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ödeme bilgisi */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-700">
              💳 Kazançlar her Pazartesi hesabınıza aktarılır.
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            PROFİL
        ══════════════════════════════ */}
        {aktifSekme === "profil" && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-slate-800">Profilim</h2>

            {/* Müsaitlik */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-800 mb-4">Müsaitlik Durumu</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">{musaitlik ? "Şu an müsaitim" : "Şu an meşgulüm"}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{musaitlik ? "Yeni siparişler alabilirsiniz" : "Yeni sipariş almıyorsunuz"}</p>
                </div>
                <button
                  onClick={() => setMusaitlik(!musaitlik)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${musaitlik ? "bg-green-500" : "bg-slate-300"}`}
                >
                  <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${musaitlik ? "translate-x-7" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>

            {/* Profil Bilgileri */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-slate-800">Kişisel Bilgiler</h3>
              {[
                { label: "Ad Soyad", key: "ad" as keyof typeof profil },
                { label: "Telefon", key: "telefon" as keyof typeof profil },
                { label: "Bölge", key: "bolge" as keyof typeof profil },
                { label: "Hizmet Verilen Araçlar", key: "araclar" as keyof typeof profil },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
                  <input
                    type="text"
                    value={profil[key]}
                    onChange={(e) => setProfil({ ...profil, [key]: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              ))}
              <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition text-sm">
                Değişiklikleri Kaydet
              </button>
            </div>

            {/* Puan */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-800 mb-3">Puanım</h3>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-slate-800">4.8</span>
                <div>
                  <div className="flex gap-0.5 text-amber-400 text-xl">{"★★★★★"}</div>
                  <p className="text-xs text-slate-400 mt-0.5">42 değerlendirme</p>
                </div>
              </div>
            </div>

            {/* Çıkış */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <button className="text-red-500 hover:text-red-700 text-sm font-semibold transition">
                🚪 Hesaptan Çıkış Yap
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
