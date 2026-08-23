import Link from "next/link";

export default function SiparisAlindi() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <Link href="/" className="text-blue-600 font-bold text-xl">mobilotoyıkama.com</Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 w-full max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Siparişiniz Alındı!</h1>
          <p className="text-gray-500 text-sm mb-6">En yakın yıkama ekibimiz kısa süre içinde sizinle iletişime geçecek.</p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="text-sm text-gray-600">📞 Sizi en kısa sürede arayacağız</div>
            <div className="text-sm text-gray-600">🚗 Ekibimiz adresinize gelecek</div>
            <div className="text-sm text-gray-600">✨ Arabanız pırıl pırıl olacak</div>
          </div>
          <Link href="/" className="block w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}