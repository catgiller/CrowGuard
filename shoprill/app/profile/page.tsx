import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

const orders = [
  {
    id: "SH-20491",
    date: "12 May 2026",
    status: "Delivered",
    statusColor: "text-emerald-600 bg-emerald-50",
    items: [
      { name: "Aurex NC-5000XM Kablosuz Kulaklık", price: 14999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop" },
    ],
    total: 14999,
  },
  {
    id: "SH-19873",
    date: "28 Apr 2026",
    status: "Shipped",
    statusColor: "text-blue-600 bg-blue-50",
    items: [
      { name: "Factora 501 Original Jean", price: 2499, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&h=80&fit=crop" },
      { name: "Strida AirMax 270", price: 4499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop" },
    ],
    total: 6998,
  },
  {
    id: "SH-18221",
    date: "3 Apr 2026",
    status: "Delivered",
    statusColor: "text-emerald-600 bg-emerald-50",
    items: [
      { name: "Aurex Buds Pro", price: 9999, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=80&h=80&fit=crop" },
    ],
    total: 9999,
  },
];

const favorites = [
  { name: "Xyron Supersonic Saç Kurutma Makinesi", price: 18999, image: "https://images.unsplash.com/photo-1522338242992-e1a54571a9f4?w=200&h=200&fit=crop", slug: "xyron-supersonic-sac-kurutma" },
  { name: "Solvex Galax A55 5G 128GB", price: 13450, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop", slug: "solvex-galax-a55-5g-128gb" },
  { name: "Nexium Pad 10. Nesil 64GB WiFi", price: 14999, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop", slug: "nexium-pad-10-nesil-wifi" },
];

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">

        {/* Profile header */}
        <div className="flex items-center gap-6 p-6 bg-[#0F1B35] rounded-2xl mb-8 text-white">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#C9A84C]">
            <Image
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
              alt="Profile"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-black">Alex Morgan</h1>
            <p className="text-gray-400 text-sm">Premium Member since January 2024</p>
          </div>
          <div className="hidden md:flex gap-6 text-center">
            <div>
              <p className="text-2xl font-black text-[#C9A84C]">47</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Orders</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#C9A84C]">12</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Reviews</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#C9A84C]">3</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Wishlist</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-black text-[#0F1B35] uppercase tracking-widest mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-black text-sm text-[#0F1B35]">Order {order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <p className="text-sm text-gray-600 flex-1 line-clamp-1">{item.name}</p>
                        <p className="text-sm font-semibold text-[#0F1B35] flex-shrink-0">{item.price.toLocaleString("tr-TR")} TL</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-400">Total: <span className="font-black text-[#C9A84C]">{order.total.toLocaleString("tr-TR")} TL</span></span>
                    <button className="text-xs font-bold text-[#0F1B35] hover:text-[#C9A84C] transition-colors underline">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-black text-[#0F1B35] uppercase tracking-widest mb-4">Account Details</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Name</p>
                  <p className="font-semibold text-[#0F1B35]">Alex Morgan</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="font-semibold text-[#0F1B35]">alex.morgan@email.com</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Address</p>
                  <p className="font-semibold text-[#0F1B35]">Bağcılar, Istanbul 34200</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Membership</p>
                  <p className="font-bold text-[#C9A84C]">★ Premium</p>
                </div>
              </div>
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-black text-[#0F1B35] uppercase tracking-widest mb-4">Wishlist</h2>
              <div className="space-y-3">
                {favorites.map((fav) => (
                  <Link key={fav.slug} href={`/products/${fav.slug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={fav.image} alt={fav.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0F1B35] line-clamp-1">{fav.name}</p>
                      <p className="text-xs text-[#C9A84C] font-black">{fav.price.toLocaleString("tr-TR")} TL</p>
                    </div>
                  </Link>
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