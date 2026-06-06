/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { GraduationCap, Award, BookOpen, ExternalLink, ChevronDown, Check, Building, Milestone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface EducRecord {
  id: string;
  period: string;
  schoolName: string;
  subTitle?: string;
  websiteUrl: string;
  accent: "primary" | "accent-green";
  syllabus: string[];
  location: string;
  memories: string;
}

export default function EducationTimeline() {
  const [selectedEdId, setSelectedEdId] = useState<string | null>(null);

  const educationRecords: EducRecord[] = [
    {
      id: "mi",
      period: "2007 - 2013",
      schoolName: "MI Islamiyah Candi",
      subTitle: "Madrasah Ibtidaiyah",
      websiteUrl: "https://www.google.com/search?q=MI+Islamiyah+Candi+Batang",
      accent: "primary",
      syllabus: ["Pendidikan Dasar", "Karakter Islami", "Keterampilan Dasar"],
      location: "Candi, Bandar, Kabupaten Batang",
      memories: "Pendidikan awal yang menanamkan kecintaan pada ilmu pengetahuan, disiplin ibadah harian, dan kebiasaan membaca terencana.",
    },
    {
      id: "mts",
      period: "2013 - 2016",
      schoolName: "MTs NU Al Syairiyah Limpung",
      subTitle: "Madrasah Tsanawiyah",
      websiteUrl: "https://www.google.com/search?q=MTs+NU+Al+Syairiyah+Limpung",
      accent: "accent-green",
      syllabus: ["Bahasa Arab & Inggris", "Ilmu Fiqih & Akhlak", "Sains Umum"],
      location: "Limpung, Kabupaten Batang",
      memories: "Mulai mendalami dasar bahasa asing dan tata aturan keagamaan (Fiqih) yang mengajarkan cara menganalisis teks sistematis.",
    },
    {
      id: "pkbm",
      period: "2017 - 2019",
      schoolName: "PKBM Bima Limpung",
      subTitle: "Pendidikan Kesetaraan Paket C",
      websiteUrl: "https://www.google.com/search?q=PKBM+Bima+Limpung",
      accent: "primary",
      syllabus: ["Administrasi Umum", "Ilmu Pengetahuan Sosial", "Teknologi Informasi"],
      location: "Limpung, Kabupaten Batang",
      memories: "Fleksibilitas program Paket C membantu saya membagi waktu kerja praktek dengan pendalaman studi mandiri secara matang.",
    },
    {
      id: "stik",
      period: "2022 - 2026",
      schoolName: "Sekolah Tinggi Islam Kendal",
      subTitle: "S1 Pendidikan Agama Islam (PAI)",
      websiteUrl: "https://stik-kendal.ac.id/",
      accent: "accent-green",
      syllabus: ["Pedagogi Pengajaran", "Psikologi Anak", "Etika Profesi Keguruan", "Sistem Manajemen Sekolah"],
      location: "Kendal, Jawa Tengah",
      memories: "Mempelajari metode pengajaran (pedagogi) modern, penyusunan rencana pembelajaran sistematis, serta pengelolaan administrasi instansi pendidikan.",
    },
  ];

  const toggleEdDetail = (id: string) => {
    setSelectedEdId(selectedEdId === id ? null : id);
  };

  const renderCard = (ed: EducRecord) => {
    const isSelected = selectedEdId === ed.id;
    const colorClasses =
      ed.accent === "primary"
        ? {
            border: "border-primary/20",
            bg: "bg-primary/5",
            text: "text-primary",
            hover: "hover:border-primary/40",
          }
        : {
            border: "border-accent-green/20",
            bg: "bg-accent-green/5",
            text: "text-accent-green",
            hover: "hover:border-accent-green/40",
          };

    return (
      <div
        key={ed.id}
        onClick={() => toggleEdDetail(ed.id)}
        className={`liquid-glass rounded-[2rem] p-6 border cursor-pointer select-none transition-all duration-300 ease-out ${
          isSelected
            ? `${colorClasses.border} shadow-lg ring-1 ring-offset-2 ring-primary/20`
            : `border-gray-100 ${colorClasses.hover} hover:scale-[1.025] hover:-translate-y-1.5 hover:shadow-xl`
        }`}
      >
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            {/* Icon Frame */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${colorClasses.bg} ${colorClasses.text}`}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${colorClasses.text}`}>
                {ed.period}
              </span>
              <h4 className="text-base font-extrabold text-on-surface line-clamp-1">{ed.schoolName}</h4>
              {ed.subTitle && (
                <span className="text-[11px] font-bold text-gray-400 block">{ed.subTitle}</span>
              )}
            </div>
          </div>
          {/* Arrow */}
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
              isSelected ? "-rotate-180 text-primary" : ""
            }`}
          />
        </div>

        {/* Collapsible details tray */}
        <AnimatePresence initial={false}>
          {isSelected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-gray-100/60 text-xs space-y-4">
                {/* Location & School Website link */}
                <div className="flex justify-between items-center bg-white/50 p-2.5 rounded-xl border border-gray-100/50">
                  <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    {ed.location}
                  </span>
                  <a
                    href={ed.websiteUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`text-[10px] font-black flex items-center gap-1 ${colorClasses.text} hover:underline`}
                  >
                    Situs Web
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* Memories */}
                <div className="text-on-surface-variant font-medium leading-relaxed">
                  <span className="font-extrabold text-on-surface block mb-1">Inspirasi &amp; Pengalaman:</span>
                  {ed.memories}
                </div>

                {/* Course / Syllabus Pills */}
                <div>
                  <span className="font-extrabold text-on-surface block mb-2">Fokus Pembelajaran:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ed.syllabus.map((syl, i) => (
                      <span
                        key={i}
                        className="bg-white/95 text-on-surface-variant px-2.5 py-1 rounded-full text-[10px] font-bold border border-gray-100 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-accent-green" />
                        {syl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Desktop Column Layout to prevent row-height sync and sibling shfiting when clicked */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-6">
          {educationRecords.filter((_, idx) => idx % 2 === 0).map(renderCard)}
        </div>
        <div className="flex flex-col gap-6">
          {educationRecords.filter((_, idx) => idx % 2 !== 0).map(renderCard)}
        </div>
      </div>

      {/* Mobile Stack Layout to preserve correct vertical chronological order */}
      <div className="flex flex-col gap-6 md:hidden">
        {educationRecords.map(renderCard)}
      </div>

      {/* Main Highlights Centerpiece - Ponpes Al Hidayah Plumbon */}
      <div className="w-full max-w-4xl mx-auto liquid-glass rounded-[2.5rem] p-8 border-2 border-primary/20 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden shadow-xl">
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Main Logo Sphere */}
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0 text-primary border border-primary/20 shadow-md">
            <BookOpen className="w-10 h-10" />
          </div>

          <div className="text-center md:text-left flex-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-primary text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm mb-1.5">
              <Award className="w-3 h-3 animate-pulse" />
              Pendidikan Utama (Ponpes)
            </div>
            <span className="text-primary font-black text-xs uppercase tracking-[0.2em] block">
              2013 - Sekarang
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-on-surface leading-tight">
              Pondok Pesantren TPI Al Hidayah Plumbon
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-2xl mx-auto md:mx-0 font-medium">
              Fokus mendalam pada pembetulan karakter karismatik, pendalaman ilmu keagamaan (kitab kuning), etika kemasyarakatan, serta kebiasaan memimpin forum rapat tingkat kepengurusan pesantren.
            </p>
          </div>
        </div>

        {/* Sub Details Grid inside Ponpes Card */}
        <div className="mt-8 pt-8 border-t border-gray-100 grid md:grid-cols-2 gap-4 text-xs font-medium text-on-surface-variant">
          <div className="bg-white/40 p-4 rounded-2xl border border-gray-50/50">
            <h5 className="font-extrabold text-on-surface text-xs flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 bg-accent-green rounded-full" />
              Fungsi &amp; Pengabdian Khusus
            </h5>
            <p className="leading-relaxed">
              Bertanggung jawab menyusun rancangan agenda kegiatan tahunan, mengatur database presensi, serta menyiapkan berkas administrasi berkas santri secara tertata.
            </p>
          </div>
          <div className="bg-white/40 p-4 rounded-2xl border border-gray-50/50">
            <h5 className="font-extrabold text-on-surface text-xs flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Kompetensi &amp; Budaya Kerja
            </h5>
            <p className="leading-relaxed">
              Membangun integritas moral tinggi, cara bersosialisasi yang sopan, ketahanan bekerja di bawah tenggat waktu, dan kebiasaan problem-solving mandiri yang kuat.
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-8 flex justify-center md:justify-start">
          <a
            href="https://www.google.com/search?q=Pondok+Pesantren+TPI+Al+Hidayah+Plumbon"
            target="_blank"
            referrerPolicy="no-referrer"
            className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Pelajari Profil Pesantren
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
