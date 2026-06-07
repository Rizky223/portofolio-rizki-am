/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Keyboard, 
  Award, 
  Grid3X3, 
  CloudLightning, 
  Database, 
  FileText, 
  Menu, 
  X, 
  Volume2, 
  VolumeX,
  ExternalLink,
  MessageSquare,
  Globe,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Sub-components
import ResumeModal from "./components/ResumeModal";
import ExpertiseModal from "./components/ExpertiseModal";
import EducationTimeline from "./components/EducationTimeline";
import ContactInbox from "./components/ContactInbox";

export default function App() {
  // Modal states
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);
  const [selectedExpertiseTab, setSelectedExpertiseTab] = useState<"excel" | "word" | "typing" | null>(null);

  // Responsive mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Time & Greeting State
  const [localTimeText, setLocalTimeText] = useState("");
  const [greetingText, setGreetingText] = useState("Selamat Hari");

  // Multi-theme fun: sound effect simulator
  const [isSoundMuted, setIsSoundMuted] = useState(true);

  useEffect(() => {
    // Generate adaptive greeting based on Indonesian time standards
    const updateDateTime = () => {
      const now = new Date();
      const hrs = now.getHours();
      
      // Determine Greeting
      if (hrs >= 4 && hrs < 11) {
        setGreetingText("Selamat Pagi");
      } else if (hrs >= 11 && hrs < 15) {
        setGreetingText("Selamat Siang");
      } else if (hrs >= 15 && hrs < 18) {
        setGreetingText("Selamat Sore");
      } else {
        setGreetingText("Selamat Malam");
      }

      // Format time string
      setLocalTimeText(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }) + " • " + now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 30000); // update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const openExpertiseTab = (tab: "excel" | "word" | "typing") => {
    setSelectedExpertiseTab(tab);
    setIsExpertiseOpen(true);
  };

  const handleSoundClick = () => {
    setIsSoundMuted(!isSoundMuted);
    // Simple audio feedback simulation
    if (isSoundMuted && typeof window !== "undefined") {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, audioCtx.currentTime); // gentle ping
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    }
  };

  return (
    <div className="mesh-bg text-on-background font-sans min-h-screen relative overflow-x-hidden pb-0 selection:bg-primary/20 selection:text-primary">
      {/* Floating Graphic Mesh Layer */}
      <div className="absolute inset-x-0 top-0 h-[80vh] floating-layer opacity-20 pointer-events-none" />

      {/* Floating System-clock & Sound panel (Absolute Top-right margin clutter alternative: Humid modern layout indicator) */}
      <div className="absolute top-4 left-6 z-40 hidden md:flex items-center gap-3 text-xs bg-white/40 backdrop-blur-md border border-white/30 px-3.5 py-1.5 rounded-full select-none text-gray-500 font-bold">
        <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
        <span>{localTimeText || "Memuat Waktu..."}</span>
      </div>

      <div className="absolute top-4 right-6 z-40 hidden md:flex items-center gap-2">
        <button
          onClick={handleSoundClick}
          className="p-2 bg-white/45 backdrop-blur-md border border-white/40 hover:bg-white text-primary rounded-full transition-all cursor-pointer"
          title={isSoundMuted ? "Hidupkan Efek Suara" : "Bisukan Efek Suara"}
        >
          {isSoundMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />}
        </button>
      </div>

      {/* Fixed Sticky Header Navigation */}
      <header className="sticky top-0 w-full z-45 bg-white/35 backdrop-blur-3xl border-b border-white/20 select-none">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 py-4">
          <a href="#" className="text-xl font-black text-primary tracking-tighter shrink-0 flex items-center gap-1.5 focus:outline-none">
            Rizki Amir Ma'ruf.
            <span className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-wider text-on-surface-variant">
            <a href="#expertise" className="hover:text-primary transition-colors">Expertise</a>
            <a href="#education" className="hover:text-primary transition-colors">Pendidikan</a>
            <a href="#about" className="hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Action button */}
          <div className="hidden md:block">
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="bg-primary hover:bg-primary-container text-white text-xs font-black px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Contact Me
            </button>
          </div>

          {/* Mobile Hamburguer Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary transition-all bg-white/50 border border-white/40 rounded-xl cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white/95 backdrop-blur-3xl border-b border-gray-100 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4 text-center font-black text-sm uppercase tracking-widest text-on-surface-variant mb-6">
              <a 
                href="#expertise" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 hover:bg-primary/5 rounded-xl transition-all"
              >
                Expertise
              </a>
              <a 
                href="#education" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 hover:bg-primary/5 rounded-xl transition-all"
              >
                Pendidikan
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 hover:bg-primary/5 rounded-xl transition-all"
              >
                Contact
              </a>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsResumeOpen(true);
              }}
              className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              Minta Resume / CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center pt-10 pb-16">
          <div className="grid md:grid-cols-2 gap-16 items-center w-full">
            
            {/* Left Content Column */}
            <div className="order-2 md:order-1 text-center md:text-left space-y-6">
              
              {/* Chronological Greeting badge */}
              <div className="inline-flex items-center gap-2 bg-accent-green-container/40 backdrop-blur-md text-accent-green px-4.5 py-2 rounded-full text-[11px] font-black tracking-wider border border-accent-green/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
                </span>
                {greetingText}, Halo Pengunjung!
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-[52px] leading-[1.1] font-black text-on-background tracking-tight">
                Profesional Administrasi <br className="hidden md:block" /> 
                &amp; <span className="text-accent-green">Tech Enthusiast</span>
              </h1>

              {/* Description body */}
              <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                Ahli dalam manajemen sistem kantor harian dengan kecepatan mengetik sepuluh jari (touch typing) yang tinggi untuk pemrosesan dokumen secara kilat dan presisi akurat, berlandaskan kepemimpinan moral alumnus pesantren.
              </p>

              {/* CTA Action Groups */}
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="bg-primary hover:bg-primary-container text-white px-10 py-4.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  Lihat Resume (CV)
                </button>
                <a
                  href="#about"
                  className="bg-white/50 border border-gray-200/60 hover:bg-white text-primary px-8 py-4.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  Hubungi Saya
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Interactive micro logs */}
              <div className="pt-8 border-t border-gray-100 flex items-center justify-center md:justify-start gap-8 text-gray-400 font-bold uppercase text-[9px] select-none tracking-widest">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Office Admin
                </span>
                <span className="flex items-center gap-1.5">
                  <Keyboard className="w-4 h-4 text-accent-green" />
                  Mengetik Cepat 10 Jari
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Pesantren Alumnus
                </span>
              </div>
            </div>

            {/* Right Profile Frame and Badges Column */}
            <div className="order-1 md:order-2 relative flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5]">
                {/* Decorative background layers */}
                <div className="absolute inset-0 bg-primary/10 rounded-[3.5rem] rotate-3 scale-105 border border-white/25 pointer-events-none" />
                
                {/* Profile Photo */}
                <img
                  alt="Profile Rizki Amir Ma'ruf"
                  referrerPolicy="no-referrer"
                  className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi3mDxaIp7PeclH5ePx_sd4mGUBfnreyDODNK1epeOK-5DpShg0yQlzr6WYRbMTjSRkit4GYAg2BK4HTE_XshmABwLt_heNBrsIFR80yW_6-NzMOF_mwDSN3D855zW8dOb4jEswi35Y-0kya4D4QwQiogoEF8fjGuHh85GTWuTvZC4X586l-ErxJbKdEKFrXbAoaWjOS-4RD6W1kRcwmkQ1EbLv3Uag43CIpJMwfZcbQKtfWzGtiHpg7zdQSznn0kAudsOPHuOMNVE"
                />

                {/* Floating Interactive Badge 1: Certification */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openExpertiseTab("excel")}
                  className="absolute -left-6 top-1/4 z-20 liquid-glass p-4 rounded-2xl cursor-pointer select-none border shadow-md flex items-center gap-3.5 transition-all w-[180px]"
                >
                  <div className="bg-accent-green/20 p-2.5 rounded-xl border border-accent-green/30 text-accent-green">
                    <Award className="w-5 h-5 fill-accent-green" />
                  </div>
                  <div>
                    <h5 className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Sertifikasi</h5>
                    <p className="text-xs font-black text-on-surface">MS Office Master</p>
                  </div>
                </motion.div>

                {/* Floating Interactive Badge 2: Typing Specialist */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openExpertiseTab("typing")}
                  className="absolute -right-6 bottom-1/4 z-20 liquid-glass p-4 rounded-2xl cursor-pointer select-none border shadow-md flex items-center gap-3.5 transition-all w-[180px]"
                >
                  <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/30 text-primary">
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Typing Expert</h5>
                    <p className="text-xs font-black text-on-surface">Keahlian 10 Jari</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: MICROSOFT OFFICE EXPERT */}
        <section id="expertise" className="py-20 border-t border-gray-100">
          <div className="mb-16 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-accent-green font-bold text-xs tracking-[0.2em] uppercase block">
              Core Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface leading-tight">
              Administrative &amp; Typing Expertise
            </h2>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
              Penguasaan mendalam dalam aplikasi produktivitas untuk mendukung kelancaran operasional kantor, pemodelan tabel dokumen, dan pengolahan data administratif tinggi.
            </p>
            <p className="text-xs font-bold text-primary bg-primary/5 px-4 py-1.5 rounded-full inline-block">
              Klik kartu di bawah untuk membuka sandboxing simulator instan!
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box Excel */}
            <div 
              onClick={() => openExpertiseTab("excel")}
              className="liquid-glass rounded-[2rem] p-8 border border-gray-100 hover:border-accent-green/30 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl smooth-transition cursor-pointer select-none"
            >
              <div className="w-12 h-12 bg-accent-green/10 text-accent-green rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-on-surface mb-3">MS Excel</h3>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Data Analysis, Pivot Tables, Formula Pengurutan, serta otomasi input data administratif dinamis untuk menekan galat operasional.
              </p>
            </div>

            {/* Box Word */}
            <div 
              onClick={() => openExpertiseTab("word")}
              className="liquid-glass rounded-[2rem] p-8 border border-gray-100 hover:border-primary/30 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl smooth-transition cursor-pointer select-none"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-on-surface mb-3">MS Word</h3>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Penyusunan naskah formal, standardisasi template korporat, korespondensi administratif sekolah, dan penataan laporannya secara rapi.
              </p>
            </div>

            {/* Box Typing */}
            <div 
              onClick={() => openExpertiseTab("typing")}
              className="liquid-glass rounded-[2rem] p-8 border border-gray-100 hover:border-orange-500/30 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl smooth-transition cursor-pointer select-none"
            >
              <div className="w-12 h-12 bg-orange-100/40 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Keyboard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-on-surface mb-3">Mengetik 10 Jari</h3>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Kecepatan tinggi (85 - 100 WPM) dengan akurasi prima tanpa melihat keyboard (touch typing) guna memproses naskah harian secepat kilat.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: EDUCATION TIMELINE */}
        <section id="education" className="py-20 border-t border-gray-100">
          <div className="mb-16 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase block">
              Timeline Academic
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">
              Riwayat Pendidikan
            </h2>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
              Latar belakang akademis formal maupun keagamaan yang menempa dasar kepekaan sosial, kemampuan kolaborasi, kepemimpinan, dan etos kerja profesional saya.
            </p>
            <p className="text-xs font-bold text-accent-green bg-accent-green-container/40 px-4 py-1.5 rounded-full inline-block">
              Klik setiap kartu sekolah di bawah untuk membuka detail tray pencapaian!
            </p>
          </div>

          {/* Education Timeline Listing */}
          <EducationTimeline />
        </section>

        {/* SECTION: CONTACT & LOCAL DATABASE INBOX */}
        <section id="about" className="py-20 border-t border-gray-100">
          {/* Form and Inbox list combined */}
          <ContactInbox />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white/40 border-t border-gray-200/50 py-12 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & copyright box */}
          <div className="text-center md:text-left space-y-2">
            <span className="text-lg font-black text-primary tracking-tighter block">Rizki AM.</span>
            <p className="text-xs text-gray-400 font-bold">
              © {new Date().getFullYear()} Administrative Tech Expert • Seluruh hak cipta dilindungi.
            </p>
          </div>

          {/* Nav Links / Social Grid */}
          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-500">
            <a href="https://wa.me/6281904223698" target="_blank" className="hover:text-primary transition-colors">WhatsApp</a>
            <a href="https://www.instagram.com/risky.am_?igsh=bmFpbnZobjNjY3Vn" target="_blank" className="hover:text-primary transition-colors">Instagram</a>
            <a href="https://www.threads.com/@risky.am_" target="_blank" className="hover:text-primary transition-colors">Threads</a>
            <a href="https://www.facebook.com/share/1EJtSwxvHT/" target="_blank" className="hover:text-primary transition-colors">Facebook</a>
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="text-primary border-b-2 border-primary/20 hover:border-primary pb-0.5 transition-all text-xs font-black uppercase cursor-pointer"
            >
              Unduh CV
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Curriculum Vitae Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Specialty Sandbox Simulator Modals */}
      <ExpertiseModal
        isOpen={isExpertiseOpen}
        onClose={() => setIsExpertiseOpen(false)}
        initialCategory={selectedExpertiseTab}
      />
    </div>
  );
}
