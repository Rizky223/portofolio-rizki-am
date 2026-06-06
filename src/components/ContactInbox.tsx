/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Mail, MapPin, Send, Trash2, Clock, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ContactMessage } from "../types";

export default function ContactInbox() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  // Load message logs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_messages");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save to storage helper
  const saveMessages = (updated: ContactMessage[]) => {
    setMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorText("");
    setSuccessText("");

    // Simulate validation
    if (!name.trim()) {
      setIsSubmitting(false);
      setErrorText("Nama Pengirim wajib diisi.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setIsSubmitting(false);
      setErrorText("Gunakan alamat email yang valid.");
      return;
    }
    if (!message.trim() || message.length < 5) {
      setIsSubmitting(false);
      setErrorText("Pesan minimal terdiri dari 5 karakter.");
      return;
    }

    // Simulate Network Delay (800ms)
    setTimeout(() => {
      const brandNew: ContactMessage = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const newList = [brandNew, ...messages];
      saveMessages(newList);
      
      // Clear forms
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
      setSuccessText("Pesan Anda berhasil dikirim secara lokal!");
    }, 800);
  };

  const handleDeleteMessage = (id: string) => {
    const filt = messages.filter((m) => m.id !== id);
    saveMessages(filt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Direct info and map marker details (Col span 5) */}
      <div className="lg:col-span-5 space-y-10">
        <div>
          <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
            Get in touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-on-surface">
            Mari Berdiskusi &amp; Berkolaborasi
          </h2>
          <p className="text-base text-on-surface-variant font-medium leading-relaxed">
            Siap membantu bisnis dan instansi Anda dengan penataan administrasi yang presisi, pengolahan data spreadsheet teruji, serta konsultasi keselarasan perangkat keras mobile.
          </p>
        </div>

        {/* Channels card */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl border border-gray-100/60 hover:border-primary/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest">
                Surel Kerja (Email)
              </p>
              <p className="text-sm font-extrabold text-on-surface">rizkiamir363@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl border border-gray-100/60 hover:border-primary/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-accent-green/10 text-accent-green flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest">
                Lokasi Domisili
              </p>
              <p className="text-sm font-extrabold text-on-surface">Candi 05/01, Bandar, Kab. Batang</p>
              <p className="text-[11px] text-gray-400 font-bold">Jawa Tengah, Indonesia</p>
            </div>
          </div>
        </div>

        {/* Media shortcuts */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
            Saluran Komunikasi Cepat (WhatsApp)
          </span>
          <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-xs font-bold text-emerald-800">WhatsApp Kerja Layanan Instan:</span>
            </div>
            <a
              href="https://wa.me/6285871755822"
              target="_blank"
              className="text-xs font-black text-emerald-600 hover:underline bg-white px-3 py-1.5 rounded-lg border border-emerald-200"
            >
              Hubungi WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Contact form box with Local inbox logs (Col span 7) */}
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-white/70 backdrop-blur-md border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-xl">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-6 block">
            Formulir Komunikasi Profesional
          </span>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-on-surface-variant">
                Nama Lengkap Anda
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth. Rizki Amir"
                className="w-full bg-surface border border-gray-100 px-4 py-3 rounded-xl text-xs text-on-surface placeholder:text-gray-400 outline-none focus:border-primary transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-on-surface-variant">
                Alamat Surat Elektronik (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cth. rizki@gmail.com"
                className="w-full bg-surface border border-gray-100 px-4 py-3 rounded-xl text-xs text-on-surface placeholder:text-gray-400 outline-none focus:border-primary transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-on-surface-variant">
                Isi Pesan Korespondensi
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan gagasan, pertanyaan, atau ajakan berkolaborasi Anda..."
                rows={3}
                className="w-full bg-surface border border-gray-100 px-4 py-3 rounded-xl text-xs text-on-surface placeholder:text-gray-400 outline-none focus:border-primary transition-all font-medium resize-none"
              />
            </div>

            {/* Error notifications */}
            <AnimatePresence mode="wait">
              {errorText && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-100"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errorText}
                </motion.div>
              )}
              {successText && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {successText}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-container text-white py-4 px-6 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Memproses Pesan...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Kirim Pesan Sekarang
                </>
              )}
            </button>
          </form>
        </div>

        {/* LOCAL INBOX FEED */}
        <div className="bg-white/40 p-6 rounded-[2rem] border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              Kotak Keluar Terkirim (Lokal)
            </span>
            <span className="text-[10px] font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
              {messages.length} Terkirim
            </span>
          </div>

          <p className="text-[11px] text-on-surface-variant font-medium mb-4 leading-normal">
            Pesan yang Anda ketikkan disimpan di database browser Anda (localStorage). Ini mendemonstrasikan manajemen state lokal dinamis secara nyata.
          </p>

          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {messages.length > 0 ? (
              messages.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-white rounded-xl border border-gray-100 flex justify-between items-start gap-4 hover:shadow-sm transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-on-surface">{item.name}</span>
                      <span className="text-[9px] text-gray-400 font-bold font-mono">({item.email})</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed font-semibold">
                      {item.message}
                    </p>
                    <span className="text-[9px] text-gray-400 font-bold flex items-center gap-1 inline-block pt-1">
                      <Clock className="w-3 h-3 text-primary" />
                      Kirim jam {item.timestamp}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteMessage(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                    title="Hapus Pesan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-400 font-bold text-xs bg-white/70 border border-dashed rounded-xl">
                Belum ada pesan terkirim. Cobalah melengkapi form di atas!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
