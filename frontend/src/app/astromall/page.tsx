"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WalletModal } from "@/components/WalletModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  CheckCircle2,
  X,
  Calendar,
  User,
  Phone,
  Flame,
} from "lucide-react";

export default function AstroMallPage() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);

  // Booking Modal
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [bookingName, setBookingName] = useState("Rohit Sharma");
  const [bookingPhone, setBookingPhone] = useState("+91 9876543210");
  const [bookingGotra, setBookingGotra] = useState("Kashyapa");
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadMall() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/mall/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadMall();
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === category.toLowerCase());

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/mall/book-pooja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          userName: bookingName,
          userPhone: bookingPhone,
          userGotra: bookingGotra,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBookingSuccess(data.bookingId);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar onOpenWallet={() => setWalletOpen(true)} walletBalance={walletBalance} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-lg shadow-orange-500/10">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-100 uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4 text-orange-200" />
            <span>{language === "hi" ? "शास्त्रोक्त वैदिक उपचार एवं आध्यात्मिक स्टोर" : "Sacred Remedies & Astro Store"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === "hi" ? "एस्ट्रोमॉल: प्रमाणित रत्न, रुद्राक्ष एवं ऑनलाइन पूजा" : "AstroMall: Authentic Gems, Rudraksha & Pujas"}
          </h1>
          <p className="text-sm text-orange-100 mt-1 max-w-2xl leading-relaxed">
            {language === "hi"
              ? "100% प्राण-प्रतिष्ठित वैदिक उत्पाद। शुद्ध प्राकृतिक रत्न, हिमालयी रुद्राक्ष एवं वैदिक आचार्यों द्वारा विधिपूर्वक संपन्न कराई जाने वाली विशेष पूजा।"
              : "100% Pran-Pratishthit spiritual remedies. Certified natural gemstones, original Himalayan Rudraksha, and Vedic Pujas performed by Trimbakeshwar Brahmins."}
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {["all", "Gemstones", "Rudraksha", "Pooja", "Yantra"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                category === c
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-white text-neutral-700 border border-orange-100 hover:bg-orange-50"
              }`}
            >
              {c === "all"
                ? (language === "hi" ? "सभी उत्पाद" : "All Remedies")
                : c === "Gemstones"
                ? (language === "hi" ? "वैदिक रत्न" : "Gemstones")
                : c === "Rudraksha"
                ? (language === "hi" ? "रुद्राक्ष" : "Rudraksha")
                : c === "Pooja"
                ? (language === "hi" ? "ऑनलाइन पूजा" : "Pooja")
                : (language === "hi" ? "सिद्ध यंत्र" : "Yantra")}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{p.rating} / 5.0</span>
                    <span className="text-neutral-400 font-normal ml-1">• Certified</span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="p-4 sm:p-5 pt-0 border-t border-orange-50">
                <div className="flex items-baseline justify-between mb-3 pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-orange-600">₹{p.price}</span>
                    <span className="text-xs text-neutral-400 line-through">₹{p.originalPrice}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Free Delivery
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProduct(p)}
                  className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{p.category === "Pooja" ? "Book Pooja Now" : "Buy Original"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Booking Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-100 relative">
            <button
              onClick={() => {
                setSelectedProduct(null);
                setBookingSuccess(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-neutral-900">Order Placed Successfully!</h3>
                <p className="text-xs text-neutral-600">
                  Your reference ID is <strong className="text-orange-600">{bookingSuccess}</strong>. Our Pandit Ji / Fulfillment team will contact you shortly on WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setBookingSuccess(null);
                  }}
                  className="mt-4 px-6 py-2.5 bg-orange-500 text-white rounded-xl text-xs font-bold hover:bg-orange-600"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                  {selectedProduct.category === "Pooja" ? "Book Online Vedic Pooja" : "Purchase Remedy"}
                </h3>
                <p className="text-xs text-neutral-500 mb-4">{selectedProduct.name}</p>

                <form onSubmit={handleBook} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-neutral-700 mb-1 block">Yajman (Your Name)</label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-neutral-700 mb-1 block">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-neutral-700 mb-1 block">Gotra (Ancestral Lineage)</label>
                    <input
                      type="text"
                      value={bookingGotra}
                      onChange={(e) => setBookingGotra(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                      placeholder="e.g. Kashyapa or Bharadwaja (or Not Known)"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 cursor-pointer"
                    >
                      {submitting ? "Processing..." : `Confirm Order (₹${selectedProduct.price})`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <WalletModal
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        currentBalance={walletBalance}
        onRecharge={(add) => setWalletBalance(walletBalance + add)}
      />

      <Footer />
    </div>
  );
}
