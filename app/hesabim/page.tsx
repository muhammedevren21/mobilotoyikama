"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

interface Kullanici {
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
}

interface Siparis {
  id: string;
  paket: string;
  adres: string;
  plaka: string;
  durum: string;
  tutar: number;
  created_at: string;
}

function DurumBadge({ durum }: { durum: string }) {
  const stilMap: Record<string, string> = {
    tamamlandi: "bg-green-100 text-green-700",
    beklemede: "bg-amber-100 text-amber-700",
    aktif: "bg-blue-100 text-blue-700",
    iptal: "bg-gray-100 text-gray-500",
  };
  const etiketMap: Record<string, string> = {
    tamamlandi: "Tamamlandı",
    beklemede: "Beklemede",
    aktif: "Aktif",
    iptal: "İptal",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stilMap[durum] || "bg-gray-100 text-gray-500"}`}>
      {etiketMap[durum] || durum}
    </span>
  );
}

export default function HesabimSayfasi() {
  const router = useRouter();
  const [aktifSekme, setAktifSekme] = useState("profil");
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);
  const [siparisler, setSiparisler] = useState<Siparis[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [form, setForm] = useState<Kullanici>({ ad: "", soyad: "", email: "", telefon: "" });
  const [kaydedildi, setKaydedildi] = useState(false);
  const [kartEkleAcik, setKartEkleAcik] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    veriCek();
  }, []);

  const veriCek = async () => {
    setYukleniyor(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/giris"); return; }

    const { data: profil } = await supabase.from("kullanicilar").select("*").eq("id", user.id).single();

    const k: Kullanici = {
      ad: profil?.ad || user.user_metadata?.ad || "",
      soyad: profil?.soyad || user.user_metadata?.soyad || "",
      email: user.email || "",
      telefon: profil?.telefon || user.user_metadata?.telefon || "",
    };
    setKullanici(k);
    setForm(k);

    const { data: sp } = await supabase.from("siparisler").select("*").eq("kullanici_id", user.id).order("created_at", { ascending: false });
    if (sp) setSiparisler(sp);
    setYukleniyor(false);
  };

  const handleKaydet = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("kullanicilar").upsert({ id: user.id, ad: form.ad, soyad: form.soyad, telefon: form.telefon });
    setKullanici(form);
    setKaydedildi(true);
    setTimeout(() => setKaydedildi(false), 2500);
  };

  const handleCikis = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const sekmeler = [
    { id: "profil", label: "Profil Bilgileri", icon: "👤" },
    { id: "siparisler", label: "Sipariş Geçmişi", icon: "📦" },
    { id: "odeme", label: "Ödeme Yöntemleri", icon: "💳" },
  ];

  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500 text-sm">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <a href="/" className="text-xl font-bold tracking-tight">💧 mobilotoyıkama</a>
        <a href="/siparis" className="text-sm bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition">Yeni Sipariş</a>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-6 mb-6 text-white flex items-center gap-5 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-white text-blue-700 flex items-center justify-center text-2xl font-bold shadow">
            {kullanici?.ad?.[0] || "?"}
          </div>
          <div>
            <p className="text-blue-200 text-sm">Hesabım</p>
            <h1 className="text-2xl font-bold">{kullanici?.ad} {kullanici?.soyad}</h1>
            <p className="text-blue-100 text-sm mt-0.5">{kullanici?.email}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {sekmeler.map((s) => (
            <button key={s.id} onClick={() => setAktifSekme(s.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${aktifSekme === s.id ? "bg-blue-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-blue-50 border border-slate-200"}`}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {aktifSekme === "profil" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
            <h2 className="text-lg font-bold text-slate-800">Kişisel Bilgiler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                { label: "Ad", key: "ad" as keyof Kullanici, type: "text" },
                { label: "Soyad", key: "soyad" as keyof Kullanici, type: "text" },
                { label: "E-posta", key: "email" as keyof Kullanici, type: "email" },
                { label: "Telefon", key: "telefon" as keyof Kullanici, type: "tel" },
              ]).map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
                  <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    disabled={key === "email"}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:bg-slate-50 disabled:text-slate-400" />
                </div>
              ))}
            </div>
            <div className="pt-2 flex items-center gap-3">
              <button onClick={handleKaydet} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition text-sm">Değişiklikleri Kaydet</button>
              {kaydedildi && <span className="text-green-600 text-sm font-medium">✅ Kaydedildi</span>}
            </div>
            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-md font-bold text-slate-800 mb-4">Şifre Değiştir</h3>
              <div className="space-y-3">
                {["Mevcut Şifre", "Yeni Şifre", "Yeni Şifre (Tekrar)"].map((label) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
                  </div>
                ))}
              </div>
              <button className="mt-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl transition text-sm">Şifreyi Güncelle</button>
            </div>
            <div className="border-t border-slate-100 pt-5">
              <button onClick={handleCikis} className="text-red-500 hover:text-red-700 text-sm font-semibold flex items-center gap-2 transition">🚪 Hesaptan Çıkış Yap</button>
            </div>
          </div>
        )}

        {aktifSekme === "siparisler" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-800">Sipariş Geçmişi</h2>
              <span className="text-sm text-slate-400">{siparisler.length} sipariş</span>
            </div>
            {siparisler.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
                <p className="text-4xl mb-3">📦</p>
                <p className="text-slate-500 font-medium">Henüz sipariş vermediniz.</p>
              </div>
            )}
            {siparisler.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-400 font-mono">{s.id.slice(0, 8)}...</span>
                    <DurumBadge durum={s.durum} />
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">{s.paket}</p>
                  <p className="text-xs text-slate-400 mt-0.5">🚗 {s.plaka} · 📍 {s.adres} · 📅 {new Date(s.created_at).toLocaleDateString("tr-TR")}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-700 font-bold text-lg">₺{s.tutar}</span>
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <a href="/siparis" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition">+ Yeni Sipariş Ver</a>
            </div>
          </div>
        )}

        {aktifSekme === "odeme" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-800">Kayıtlı Kartlar</h2>
              <button onClick={() => setKartEkleAcik(!kartEkleAcik)} className="text-sm bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl transition">+ Kart Ekle</button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-sm">💳 Kayıtlı kart bulunmuyor.</p>
              <p className="text-slate-400 text-xs mt-1">İyzico entegrasyonu tamamlandığında kartlarınız burada görünecek.</p>
            </div>
            {kartEkleAcik && (
              <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6 space-y-4">
                <h3 className="font-bold text-slate-800">Yeni Kart Ekle</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Kart Numarası</label>
                  <input type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Son Kullanma</label>
                    <input type="text" placeholder="AA/YY" maxLength={5} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">CVV</label>
                    <input type="text" placeholder="•••" maxLength={3} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-3 rounded-xl text-sm transition">Kartı Kaydet</button>
                  <button onClick={() => setKartEkleAcik(false)} className="text-slate-500 hover:text-slate-700 font-semibold px-5 py-3 rounded-xl text-sm border border-slate-200 hover:bg-slate-50 transition">İptal</button>
                </div>
              </div>
            )}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-600 flex items-start gap-2 mt-2">
              <span className="text-base">🔒</span>
              <span>Kart bilgileriniz İyzico altyapısıyla güvenli şekilde saklanır. Biz kart numaranızı hiçbir zaman göremeyiz.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
