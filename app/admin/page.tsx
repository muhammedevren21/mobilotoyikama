"use client";

import { useState } from "react";

// ─── Dummy Data ───────────────────────────────────────────────
const istatistikler = [
  { label: "Toplam Sipariş", deger: 148, icon: "📦", renk: "blue" },
  { label: "Aktif Yıkayıcı", deger: 23, icon: "🧹", renk: "green" },
  { label: "Kayıtlı Kullanıcı", deger: 312, icon: "👥", renk: "purple" },
  { label: "Bu Ay Gelir", deger: "₺18.430", icon: "💰", renk: "orange" },
];

const siparisler = [
  { id: "SP-1052", kullanici: "Mehmet Yılmaz", yikayici: "Atanmadı", paket: "Buharlı Temizlik", tarih: "22 Ağu 2026", tutar: "₺650", durum: "beklemede" },
  { id: "SP-1051", kullanici: "Ayşe Kara", yikayici: "Hasan Usta", paket: "Detaylı İç-Dış", tarih: "21 Ağu 2026", tutar: "₺420", durum: "aktif" },
  { id: "SP-1050", kullanici: "Ali Demir", yikayici: "Murat Temiz", paket: "Standart Dış", tarih: "20 Ağu 2026", tutar: "₺180", durum: "tamamlandi" },
  { id: "SP-1049", kullanici: "Fatma Çelik", yikayici: "Hasan Usta", paket: "Detaylı İç-Dış", tarih: "19 Ağu 2026", tutar: "₺420", durum: "tamamlandi" },
  { id: "SP-1048", kullanici: "Emre Şahin", yikayici: "Atanmadı", paket: "Buharlı Temizlik", tarih: "18 Ağu 2026", tutar: "₺650", durum: "iptal" },
];

const yikayicilar = [
  { id: "Y-001", ad: "Hasan Usta", email: "hasan@example.com", telefon: "0533 111 22 33", bolge: "Kadıköy", tamamlanan: 42, puan: 4.8, durum: "aktif" },
  { id: "Y-002", ad: "Murat Temiz", email: "murat@example.com", telefon: "0534 222 33 44", bolge: "Beşiktaş", tamamlanan: 28, puan: 4.6, durum: "aktif" },
  { id: "Y-003", ad: "Serkan Yıldız", email: "serkan@example.com", telefon: "0535 333 44 55", bolge: "Üsküdar", tamamlanan: 0, puan: "-", durum: "beklemede" },
  { id: "Y-004", ad: "Burak Aydın", email: "burak@example.com", telefon: "0536 444 55 66", bolge: "Şişli", tamamlanan: 0, puan: "-", durum: "reddedildi" },
];

const kullanicilar = [
  { id: "U-001", ad: "Mehmet Yılmaz", email: "mehmet@example.com", telefon: "0532 123 45 67", kayitTarih: "10 Oca 2026", siparisAdet: 3, durum: "aktif" },
  { id: "U-002", ad: "Ayşe Kara", email: "ayse@example.com", telefon: "0533 234 56 78", kayitTarih: "15 Şub 2026", siparisAdet: 7, durum: "aktif" },
  { id: "U-003", ad: "Ali Demir", email: "ali@example.com", telefon: "0534 345 67 89", kayitTarih: "3 Mar 2026", siparisAdet: 1, durum: "aktif" },
  { id: "U-004", ad: "Fatma Çelik", email: "fatma@example.com", telefon: "0535 456 78 90", kayitTarih: "20 Nis 2026", siparisAdet: 12, durum: "engellendi" },
];

// ─── Badge ────────────────────────────────────────────────────
function Badge({ durum }) {
  const map = {
    beklemede: "bg-amber-100 text-amber-700",
    aktif: "bg-blue-100 text-blue-700",
    tamamlandi: "bg-green-100 text-green-700",
    iptal: "bg-red-100 text-red-600",
    reddedildi: "bg-red-100 text-red-600",
    engellendi: "bg-red-100 text-red-600",
  };
  const etiket = {
    beklemede: "Beklemede",
    aktif: "Aktif",
    tamamlandi: "Tamamlandı",
    iptal: "İptal",
    reddedildi: "Reddedildi",
    engellendi: "Engellendi",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[durum] || "bg-gray-100 text-gray-500"}`}>
      {etiket[durum] || durum}
    </span>
  );
}

// ─── İstatistik Kartı ─────────────────────────────────────────
function StatKart({ label, deger, icon, renk }) {
  const renkMap = {
    blue: "from-blue-600 to-blue-500",
    green: "from-emerald-600 to-emerald-500",
    purple: "from-violet-600 to-violet-500",
    orange: "from-orange-500 to-amber-400",
  };
  return (
    <div className={`bg-gradient-to-br ${renkMap[renk]} text-white rounded-2xl p-5 shadow-md`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold">{deger}</div>
      <div className="text-sm opacity-80 mt-0.5">{label}</div>
    </div>
  );
}

// ─── Ana Bileşen ──────────────────────────────────────────────
export default function AdminPanel() {
  const [aktifSekme, setAktifSekme] = useState("dashboard");
  const [siparisListesi, setSiparisListesi] = useState(siparisler);
  const [yikayiciListesi, setYikayiciListesi] = useState(yikayicilar);
  const [kullaniciListesi, setKullaniciListesi] = useState(kullanicilar);
  const [aramaS, setAramaS] = useState("");
  const [aramaY, setAramaY] = useState("");
  const [aramaK, setAramaK] = useState("");

  const sekmeler = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "siparisler", label: "Siparişler", icon: "📦" },
    { id: "yikayicilar", label: "Yıkayıcılar", icon: "🧹" },
    { id: "kullanicilar", label: "Kullanıcılar", icon: "👥" },
  ];

  const siparisGuncelle = (id, yeniDurum) => {
    setSiparisListesi((prev) =>
      prev.map((s) => (s.id === id ? { ...s, durum: yeniDurum } : s))
    );
  };

  const yikayiciGuncelle = (id, yeniDurum) => {
    setYikayiciListesi((prev) =>
      prev.map((y) => (y.id === id ? { ...y, durum: yeniDurum } : y))
    );
  };

  const kullaniciGuncelle = (id, yeniDurum) => {
    setKullaniciListesi((prev) =>
      prev.map((k) => (k.id === id ? { ...k, durum: yeniDurum } : k))
    );
  };

  const filtreSiparisler = siparisListesi.filter(
    (s) =>
      s.id.toLowerCase().includes(aramaS.toLowerCase()) ||
      s.kullanici.toLowerCase().includes(aramaS.toLowerCase())
  );

  const filtreYikayicilar = yikayiciListesi.filter((y) =>
    y.ad.toLowerCase().includes(aramaY.toLowerCase())
  );

  const filtreKullanicilar = kullaniciListesi.filter(
    (k) =>
      k.ad.toLowerCase().includes(aramaK.toLowerCase()) ||
      k.email.toLowerCase().includes(aramaK.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Navbar ── */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">💧 mobilotoyıkama</span>
          <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-semibold">
            ADMIN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-slate-400 hover:text-white text-sm transition">
            Siteye Dön ↗
          </a>
          <button className="text-red-400 hover:text-red-300 text-sm font-medium transition">
            Çıkış
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ── Sekmeler ── */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {sekmeler.map((s) => (
            <button
              key={s.id}
              onClick={() => setAktifSekme(s.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                aktifSekme === s.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════
            DASHBOARD
        ══════════════════════════════ */}
        {aktifSekme === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {istatistikler.map((ist) => (
                <StatKart key={ist.label} {...ist} />
              ))}
            </div>

            {/* Son Siparişler */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-800">Son Siparişler</h2>
                <button onClick={() => setAktifSekme("siparisler")} className="text-blue-600 text-sm font-medium hover:underline">
                  Tümünü gör →
                </button>
              </div>
              <div className="divide-y divide-slate-50">
                {siparisListesi.slice(0, 3).map((s) => (
                  <div key={s.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">{s.id}</span>
                      <p className="text-sm font-semibold text-slate-800">{s.kullanici}</p>
                      <p className="text-xs text-slate-400">{s.paket} · {s.tarih}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-700">{s.tutar}</span>
                      <Badge durum={s.durum} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Onay Bekleyen Yıkayıcılar */}
            <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-amber-100 flex items-center justify-between bg-amber-50">
                <h2 className="font-bold text-amber-800">⏳ Onay Bekleyen Yıkayıcılar</h2>
                <button onClick={() => setAktifSekme("yikayicilar")} className="text-amber-700 text-sm font-medium hover:underline">
                  Tümünü gör →
                </button>
              </div>
              <div className="divide-y divide-slate-50">
                {yikayiciListesi.filter((y) => y.durum === "beklemede").map((y) => (
                  <div key={y.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{y.ad}</p>
                      <p className="text-xs text-slate-400">{y.bolge} · {y.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => yikayiciGuncelle(y.id, "aktif")}
                        className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-semibold transition"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => yikayiciGuncelle(y.id, "reddedildi")}
                        className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-lg font-semibold transition"
                      >
                        Reddet
                      </button>
                    </div>
                  </div>
                ))}
                {yikayiciListesi.filter((y) => y.durum === "beklemede").length === 0 && (
                  <p className="px-6 py-4 text-sm text-slate-400">Bekleyen başvuru yok.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            SİPARİŞLER
        ══════════════════════════════ */}
        {aktifSekme === "siparisler" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Tüm Siparişler</h2>
              <input
                type="text"
                placeholder="Sipariş no veya müşteri ara..."
                value={aramaS}
                onChange={(e) => setAramaS(e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["Sipariş", "Müşteri", "Yıkayıcı", "Paket", "Tarih", "Tutar", "Durum", "İşlem"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtreSiparisler.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{s.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{s.kullanici}</td>
                      <td className="px-4 py-3 text-slate-500">{s.yikayici}</td>
                      <td className="px-4 py-3 text-slate-600">{s.paket}</td>
                      <td className="px-4 py-3 text-slate-500">{s.tarih}</td>
                      <td className="px-4 py-3 font-bold text-slate-800">{s.tutar}</td>
                      <td className="px-4 py-3"><Badge durum={s.durum} /></td>
                      <td className="px-4 py-3">
                        <select
                          value={s.durum}
                          onChange={(e) => siparisGuncelle(s.id, e.target.value)}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        >
                          <option value="beklemede">Beklemede</option>
                          <option value="aktif">Aktif</option>
                          <option value="tamamlandi">Tamamlandı</option>
                          <option value="iptal">İptal</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtreSiparisler.length === 0 && (
                <p className="text-center text-slate-400 text-sm py-8">Sipariş bulunamadı.</p>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            YIKAYICILAR
        ══════════════════════════════ */}
        {aktifSekme === "yikayicilar" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Yıkayıcı Yönetimi</h2>
              <input
                type="text"
                placeholder="İsme göre ara..."
                value={aramaY}
                onChange={(e) => setAramaY(e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
              />
            </div>

            <div className="space-y-3">
              {filtreYikayicilar.map((y) => (
                <div key={y.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-500">
                      {y.ad[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 flex items-center gap-2">
                        {y.ad} <Badge durum={y.durum} />
                      </p>
                      <p className="text-xs text-slate-400">{y.email} · {y.telefon}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        📍 {y.bolge} · ✅ {y.tamamlanan} sipariş · ⭐ {y.puan}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {y.durum === "beklemede" && (
                      <>
                        <button
                          onClick={() => yikayiciGuncelle(y.id, "aktif")}
                          className="text-xs bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition"
                        >
                          ✓ Onayla
                        </button>
                        <button
                          onClick={() => yikayiciGuncelle(y.id, "reddedildi")}
                          className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl font-semibold transition"
                        >
                          ✕ Reddet
                        </button>
                      </>
                    )}
                    {y.durum === "aktif" && (
                      <button
                        onClick={() => yikayiciGuncelle(y.id, "beklemede")}
                        className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-xl font-semibold transition"
                      >
                        Askıya Al
                      </button>
                    )}
                    {y.durum === "reddedildi" && (
                      <button
                        onClick={() => yikayiciGuncelle(y.id, "aktif")}
                        className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-xl font-semibold transition"
                      >
                        Tekrar Onayla
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            KULLANICILAR
        ══════════════════════════════ */}
        {aktifSekme === "kullanicilar" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Kullanıcı Yönetimi</h2>
              <input
                type="text"
                placeholder="Ad veya e-posta ara..."
                value={aramaK}
                onChange={(e) => setAramaK(e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["Kullanıcı", "E-posta", "Telefon", "Kayıt", "Sipariş", "Durum", "İşlem"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtreKullanicilar.map((k) => (
                    <tr key={k.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                            {k.ad[0]}
                          </div>
                          <span className="font-medium text-slate-800">{k.ad}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{k.email}</td>
                      <td className="px-4 py-3 text-slate-500">{k.telefon}</td>
                      <td className="px-4 py-3 text-slate-400">{k.kayitTarih}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-700">{k.siparisAdet}</td>
                      <td className="px-4 py-3"><Badge durum={k.durum} /></td>
                      <td className="px-4 py-3">
                        {k.durum === "aktif" ? (
                          <button
                            onClick={() => kullaniciGuncelle(k.id, "engellendi")}
                            className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-lg font-semibold transition"
                          >
                            Engelle
                          </button>
                        ) : (
                          <button
                            onClick={() => kullaniciGuncelle(k.id, "aktif")}
                            className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg font-semibold transition"
                          >
                            Aktifleştir
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtreKullanicilar.length === 0 && (
                <p className="text-center text-slate-400 text-sm py-8">Kullanıcı bulunamadı.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
