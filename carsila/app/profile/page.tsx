import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { formatPrice } from "@/lib/products";

const PROFILE = {
  name: "Zeynep Arslan",
  email: "zeynep.arslan@gmail.com",
  phone: "0532 *** ** 47",
  member_since: "Mart 2024",
  address: "Kadıköy, İstanbul",
};

const ORDERS = [
  {
    id: "ÇR-2026-04821",
    date: "12 Mayıs 2026",
    status: "Teslim Edildi",
    statusColor: "text-green-700 bg-green-100",
    items: ["Sony WH-1000XM5 Kablosuz Kulaklık", "CeraVe Retinol Serum 30ml"],
    total: 9298,
  },
  {
    id: "ÇR-2026-03716",
    date: "28 Nisan 2026",
    status: "Kargoda",
    statusColor: "text-blue-700 bg-blue-100",
    items: ["Nike Air Max 270 Erkek Spor Ayakkabı"],
    total: 4299,
  },
  {
    id: "ÇR-2026-02109",
    date: "3 Nisan 2026",
    status: "Teslim Edildi",
    statusColor: "text-green-700 bg-green-100",
    items: ["Xiaomi Smart Band 8 Pro", "Manduka PRO Yoga Matı"],
    total: 4598,
  },
];

const FAVORITES = [
  "Dyson Supersonic Saç Kurutma Makinesi",
  "Chanel Chance Eau Tendre EDT 100ml",
  "Xbox Wireless Controller Siyah",
];

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black mb-8" style={{ color: "var(--dark)" }}>Profilim</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile card */}
          <div>
            <div className="p-6 rounded-2xl border bg-white mb-4" style={{ borderColor: "var(--border)" }}>
              {/* Avatar */}
              <div className="flex flex-col items-center mb-5">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-black mb-3 shadow-lg"
                  style={{ background: "linear-gradient(135deg, var(--brand), #C44A1A)" }}
                >
                  {PROFILE.name.charAt(0)}
                </div>
                <h2 className="font-black text-lg" style={{ color: "var(--dark)" }}>{PROFILE.name}</h2>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Üye: {PROFILE.member_since}</p>
              </div>

              <div className="space-y-3 text-sm">
                {[
                  { label: "E-posta", value: PROFILE.email },
                  { label: "Telefon", value: PROFILE.phone },
                  { label: "Adres", value: PROFILE.address },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col gap-0.5 py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                    <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted)" }}>{row.label}</span>
                    <span className="font-medium" style={{ color: "var(--dark)" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <button
                className="mt-4 w-full py-2 rounded-xl text-sm font-semibold border-2 transition-colors hover:border-orange-400"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                Bilgileri Düzenle
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Sipariş", value: "12" },
                { label: "Favori", value: "8" },
                { label: "Yorum", value: "5" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-2xl border bg-white text-center" style={{ borderColor: "var(--border)" }}>
                  <p className="font-black text-lg" style={{ color: "var(--brand)" }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-2 space-y-6">
            {/* Orders */}
            <div className="p-6 rounded-2xl border bg-white" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-black text-base mb-4" style={{ color: "var(--dark)" }}>Son Siparişlerim</h3>
              <div className="space-y-4">
                {ORDERS.map((order) => (
                  <div key={order.id} className="p-4 rounded-xl border" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "var(--dark)" }}>{order.id}</p>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>{order.date}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    <ul className="text-xs space-y-0.5 mb-2" style={{ color: "var(--muted)" }}>
                      {order.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                    <p className="font-black text-sm" style={{ color: "var(--brand)" }}>{formatPrice(order.total)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Favorites */}
            <div className="p-6 rounded-2xl border bg-white" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-black text-base mb-4" style={{ color: "var(--dark)" }}>Favori Ürünlerim</h3>
              <div className="space-y-2">
                {FAVORITES.map((fav) => (
                  <div
                    key={fav}
                    className="flex items-center justify-between p-3 rounded-xl border"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>❤️ {fav}</span>
                    <button className="text-xs hover:underline" style={{ color: "var(--brand)" }}>Sepete Ekle</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
