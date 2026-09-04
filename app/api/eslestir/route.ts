import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { siparis_id, yikayici_id } = await req.json();
    if (!siparis_id || !yikayici_id) {
      return NextResponse.json({ hata: 'siparis_id ve yikayici_id gerekli' }, { status: 400 });
    }
    const supabase = createClient();
    const { error } = await supabase
      .from('siparisler')
      .update({
        yikayici_id,
        durum: 'aktif',
        eslestirme_tarihi: new Date().toISOString(),
      })
      .eq('id', siparis_id);
    if (error) return NextResponse.json({ hata: 'Guncelleme basarisiz' }, { status: 500 });
    return NextResponse.json({ basarili: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ hata: 'Sunucu hatasi' }, { status: 500 });
  }
}
