"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

const ADMIN_SIFRE = "Mobil2026!";

interface Siparis {
  id: string;
  kullanici_id: string;
  paket: string;
  adres: string;
  plaka: string;
  tutar: number;
  durum: string;
  created_at: string;
}

interface Yikayici {
  id: string;
  ad: string;
  soyad: string;
  telefon: string;
  bolge: string;
  durum: string;
  puan: number;
}

interface Kullanici {
  id: string;
  ad: string;
  soyad: string;
  telefon: string;
  created_at: string;
}

function Badge({ durum }: { durum: string }) {
  const map: Record<string, string> = {
    beklemede: "bg-amber-100 text-amber-700",
    aktif: "bg-blue-100 text-blue-700",
    tamamlandi: "bg-green-100 text-green-700",
    iptal: "bg-red-100 text-red-600",
    reddedildi: "bg-red-100 text-red-600",
  };
  const etiket: Record<string, string> = {
    beklemede: "Beklemede",
    aktif: "Aktif",
    tamamlandi: "Tamamlandı",
    iptal: "İptal",
    reddedildi: "Reddedildi",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[durum] || "bg-gray-100 text-gray-500"}`}>
      {etiket[durum] || durum}
    </span>
  );
}

function StatKart({ label, deger, icon, renk }: { label: string; deger: string | number; icon: string; renk: string }) {
  const renkMap: Record<string, string> = {
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

export default function AdminPanel() {
  const [girisYapildi, setGirisYapildi] = useState(false);
  const [sifre, setSifre] = useState("");
  const [sifreHata, setSifreHata] = useState("");
  const [aktifSekme, setAktifSekme] = useState("dashboard");
  const [siparisler, setSiparisler] = useState<Siparis[]>([]);
  const [yikayicilar, setYikayicilar] = useState<Yikayici[]>([]);
  const [kullanicilar, setKullanicilar] = useState<Kullanici[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aramaS, setAramaS] = useState("");
  const [aramaY, setAramaY] = useState("");
  const [aramaK, setAramaK] = useState("");

  const supabase = createClient();

  useEffect(() => {
    if (girisYapildi) veriCek();
  }, [girisYapildi]);

  const veriCek = async () => {
    setYukleniyor(true);
    const [{ data: sp }, { data: yi }, { data: ku }] = await Promise.all([
      supabase.from("siparisler").select("*").order("created_at", { ascending: false }),
      supabase.from("yikayicilar").select("*").order("created_at", { ascending: false }),
      supabase.from("kullanicilar").select("*").order("created_at", { ascending: false }),
    ]);
    if (sp) setSiparisler(sp);
    if (yi) setYikayicilar(yi);
    if (ku) setKullanicilar(ku);
    setYukleniyor(false);
  };

  const siparisGuncelle = async (id: string, yeniDurum: string) => {
    await supabase.from("siparisler").update({ durum: yeniDurum }).eq("id", id);
    setSiparisler((prev) => prev.map((s) => s.id === id ? { ...s, durum: yeniDurum } : s));
  };

  const yikayiciGuncelle = async (id: string, yeniDurum: string) => {
    await supabase.from("yikayicilar").update({ durum: yeniDurum }).eq("id", id);
    setYikayicilar((prev) => prev.map((y) => y.id === id ? { ...y, durum: yeniDurum } : y));
  };

  const handleGiris = () => {
    if (sifre === ADMIN_SIFRE) {
      setGirisYapildi(true);
      setSifreHata("");
    } else {
      setSifreHata("Şifre hatalı.");
    }
  };

  const toplamGelir = siparisler.filter((s) => s.durum === "tamamlandi").reduce((acc, s) => acc + (s.tutar || 0), 0);
  const filtreSiparisler = siparisler.filter((s) => s.id.toLowerCase().includes(aramaS.toLowerCase()) || s.paket?.toLowerCase().includes(aramaS.toLowerCase()));
  const filtreYikayicilar = yikayicilar.filter((y) => `${y.ad} ${y.soyad}`.toLowerCase().includes(aramaY.toLowerCase()));
  const filtreKullanicilar = kullanicilar.filter((k) => `${k.ad} ${k.soyad}`.toLowerCase().includes(aramaK.toLowerCase()));

  const sekmeler = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "siparisler", label: "Siparişler", icon: "📦" },
    { id: "yikayicilar", label: "Yıkayıcılar", icon: "🧹" },
    { id: "kullanicilar", label: "Kullanıcılar", icon: "👥" },
  ];

  // ── Giriş Ekranı ──
  if (!girisYapildi) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">💧</div>
            <h1 className="text-white font-bold text-xl">Admin Girişi</h1>
            <p className="text-slate-400 text-sm mt-1">mobilotoyıkama.com</p>
          </div>
          <div className="mb-4">
            <label className="block text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Şifre</label>
            <input
              type="password"
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGiris()}
              placeholder="Admin şifresi"
              className="w-full bg-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
            />
          </div>
          {sifreHata && <p className="text-red-400 text-xs mb-3">{sifreHata}</p>}
          <button
            onClick={handleGiris}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition text-sm"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500 text-sm">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">💧 mobilotoyıkama</span>
          <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-semibold">ADMIN</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-slate-400 hover:text-white text-sm transition">Siteye Dön ↗</a>
          <button onClick={() => setGirisYapildi(false)} className="text-red-400 hover:text-red-300 text-sm font-medium transition">Çıkış</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {sekmeler.map((s) => (
            <button
              key={s.id}
              onClick={() => setAktifSekme(s.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                aktifSekme === s.id ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {aktifSekme === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatKart label="Toplam Sipariş" deger={siparisler.length} icon="📦" renk="blue" />
              <StatKart label="Aktif Yıkayıcı" deger={yikayicilar.filter(y => y.durum === "aktif").length} icon="🧹" renk="green" />
              <StatKart label="Kayıtlı Kullanıcı" deger={kullanicilar.length} icon="👥" renk="purple" />
              <StatKart label="Toplam Gelir" deger={`₺${toplamGelir}`} icon="💰" renk="orange" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-800">Son Siparişler</h2>
                <button onClick={() => setAktifSekme("siparisler")} className="text-blue-600 text-sm font-medium hover:underline">Tümünü gör →</button>
              </div>
              <div className="divide-y divide-slate-50">
                {siparisler.slice(0, 3).map((s) => (
                  <div key={s.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">{s.id.slice(0, 8)}...</span>
                      <p className="text-sm font-semibold text-slate-800">{s.paket}</p>
                      <p className="text-xs text-slate-400">{s.plaka} · {new Date(s.created_at).toLocaleDateString("tr-TR")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-700">₺{s.tutar}</span>
                      <Badge durum={s.durum} />
                    </div>
                  </div>
                ))}
                {siparisler.length === 0 && <p className="px-6 py-4 text-sm text-slate-400">Henüz sipariş yok.</p>}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-amber-100 flex items-center justify-between bg-amber-50">
                <h2 className="font-bold text-amber-800">⏳ Onay Bekleyen Yıkayıcılar</h2>
                <button onClick={() => setAktifSekme("yikayicilar")} className="text-amber-700 text-sm font-medium hover:underline">Tümünü gör →</button>
              </div>
              <div className="divide-y divide-slate-50">
                {yikayicilar.filter((y) => y.durum === "beklemede").map((y) => (
                  <div key={y.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{y.ad} {y.soyad}</p>
                      <p className="text-xs text-slate-400">{y.bolge} · {y.telefon}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => yikayiciGuncelle(y.id, "aktif")} className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-semibold transition">Onayla</button>
                      <button onClick={() => yikayiciGuncelle(y.id, "reddedildi")} className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-lg font-semibold transition">Reddet</button>
                    </div>
                  </div>
                ))}
                {yikayicilar.filter((y) => y.durum === "beklemede").length === 0 && (
                  <p className="px-6 py-4 text-sm text-slate-400">Bekleyen başvuru yok.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {aktifSekme === "siparisler" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Tüm Siparişler ({siparisler.length})</h2>
              <input type="text" placeholder="Paket veya id ara..." value={aramaS} onChange={(e) => setAramaS(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>{["ID", "Paket", "Adres", "Plaka", "Tarih", "Tutar", "Durum", "İşlem"].map((h) => (<th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>))}</tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtreSiparisler.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{s.id.slice(0, 8)}...</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{s.paket}</td>
                      <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{s.adres}</td>
                      <td className="px-4 py-3 text-slate-600">{s.plaka}</td>
                      <td className="px-4 py-3 text-slate-500">{new Date(s.created_at).toLocaleDateString("tr-TR")}</td>
                      <td className="px-4 py-3 font-bold text-slate-800">₺{s.tutar}</td>
                      <td className="px-4 py-3"><Badge durum={s.durum} /></td>
                      <td className="px-4 py-3">
                        <select value={s.durum} onChange={(e) => siparisGuncelle(s.id, e.target.value)} className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
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
              {filtreSiparisler.length === 0 && <p className="text-center text-slate-400 text-sm py-8">Sipariş bulunamadı.</p>}
            </div>
          </div>
        )}

        {aktifSekme === "yikayicilar" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Yıkayıcılar ({yikayicilar.length})</h2>
              <input type="text" placeholder="İsme göre ara..." value={aramaY} onChange={(e) => setAramaY(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64" />
            </div>
            <div className="space-y-3">
              {filtreYikayicilar.length === 0 && <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-sm">Henüz yıkayıcı başvurusu yok.</div>}
              {filtreYikayicilar.map((y) => (
                <div key={y.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-500">{y.ad?.[0] || "?"}</div>
                    <div>
                      <p className="font-semibold text-slate-800 flex items-center gap-2">{y.ad} {y.soyad} <Badge durum={y.durum} /></p>
                      <p className="text-xs text-slate-400">{y.telefon}</p>
                      <p className="text-xs text-slate-400 mt-0.5">📍 {y.bolge} · ⭐ {y.puan}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {y.durum === "beklemede" && (<><button onClick={() => yikayiciGuncelle(y.id, "aktif")} className="text-xs bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition">✓ Onayla</button><button onClick={() => yikayiciGuncelle(y.id, "reddedildi")} className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl font-semibold transition">✕ Reddet</button></>)}
                    {y.durum === "aktif" && <button onClick={() => yikayiciGuncelle(y.id, "beklemede")} className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-xl font-semibold transition">Askıya Al</button>}
                    {y.durum === "reddedildi" && <button onClick={() => yikayiciGuncelle(y.id, "aktif")} className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-xl font-semibold transition">Tekrar Onayla</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aktifSekme === "kullanicilar" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Kullanıcılar ({kullanicilar.length})</h2>
              <input type="text" placeholder="Ad veya soyad ara..." value={aramaK} onChange={(e) => setAramaK(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>{["Kullanıcı", "Telefon", "Kayıt Tarihi"].map((h) => (<th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>))}</tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtreKullanicilar.map((k) => (
                    <tr key={k.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{k.ad?.[0] || "?"}</div><span className="font-medium text-slate-800">{k.ad} {k.soyad}</span></div></td>
                      <td className="px-4 py-3 text-slate-500">{k.telefon}</td>
                      <td className="px-4 py-3 text-slate-400">{new Date(k.created_at).toLocaleDateString("tr-TR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtreKullanicilar.length === 0 && <p className="text-center text-slate-400 text-sm py-8">Kullanıcı bulunamadı.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
