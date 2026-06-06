/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, Table, FileText, Keyboard, Check, Play, RefreshCw, Sparkles, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ExpertiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory: "excel" | "word" | "typing" | null;
}

const TYPING_SENTENCES = [
  "Disiplin dan akhlak mulia santri menopang etos kerja administratif yang presisi, jujur, serta berdedikasi tinggi di kantor modern.",
  "Kecepatan mengetik sepuluh jari sangat membantu dalam menyelesaikan dokumen dinamis secara efisien tanpa banyak kesalahan tik.",
  "Penyusunan laporan administrasi menggunakan formula excel terstandar menjamin akurasi data dalam mengelola inventaris organisasi.",
  "Integrasi antara moral kepemimpinan pesantren dengan keahlian teknologi perkantoran modern menciptakan profesional administrasi yang tangguh."
];

export default function ExpertiseModal({ isOpen, onClose, initialCategory }: ExpertiseModalProps) {
  const [activeCategory, setActiveCategory] = useState<"excel" | "word" | "typing">(
    initialCategory === "typing" ? "typing" : (initialCategory as any === "ppt" ? "typing" : (initialCategory || "excel") as any)
  );

  // Excel Live Simulator State
  const [excelInputs, setExcelInputs] = useState<number[]>([45, 120, 80, 210]);
  const [excelFormula, setExcelFormula] = useState<"SUM" | "AVERAGE" | "MAX" | "MIN">("SUM");

  // Word Formatter State
  const [wordTemplate, setWordTemplate] = useState<"surat" | "laporan" | "formal">("surat");
  const [wordHeader, setWordHeader] = useState("KOP SURAT RESMI");

  // Typing Sandbox State
  const [typedText, setTypedText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [typingStatsHistory, setTypingStatsHistory] = useState<{ wpm: number; accuracy: number }[]>([]);

  const targetSentence = TYPING_SENTENCES[sentenceIndex];

  // Typing simulator Timer
  useEffect(() => {
    let timer: any;
    if (startTime && !isCompleted) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [startTime, isCompleted]);

  // Reset function
  const handleResetTyping = () => {
    setTypedText("");
    setStartTime(null);
    setElapsedTime(0);
    setIsCompleted(false);
  };

  const handleSentenceChange = (idx: number) => {
    setSentenceIndex(idx);
    setTypedText("");
    setStartTime(null);
    setElapsedTime(0);
    setIsCompleted(false);
  };


  // Computations
  const runExcelFormula = () => {
    switch (excelFormula) {
      case "SUM":
        return excelInputs.reduce((a, b) => a + b, 0);
      case "AVERAGE":
        return Number((excelInputs.reduce((a, b) => a + b, 0) / excelInputs.length).toFixed(2));
      case "MAX":
        return Math.max(...excelInputs);
      case "MIN":
        return Math.min(...excelInputs);
    }
  };

  const handleExcelInputChange = (index: number, val: string) => {
    const num = parseFloat(val) || 0;
    const upd = [...excelInputs];
    upd[index] = num;
    setExcelInputs(upd);
  };

  const pptSlides = [
    { title: "Judul Presentasi", desc: "Desain minimalis, rasio 16:9, warna bold high contrast.", duration: "5 Detik" },
    { title: "Analisis Data (Excel)", desc: "Menyajikan charts, diagram lingkaran, & sorotan KPI utama.", duration: "15 Detik" },
    { title: "Teknologi Mobile", desc: "Perbandingan tren SoC flagship (Snapdragon vs Apple A-series).", duration: "10 Detik" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-gray-100 bg-white">
              <span className="text-xs font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-green rounded-full animate-ping" />
                Interactive Core Expertise Sandbox
              </span>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Toggle Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50/50 p-2 gap-2">
              <button
                onClick={() => setActiveCategory("excel")}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeCategory === "excel"
                    ? "bg-white shadow-md text-accent-green border-b-2 border-accent-green"
                    : "text-gray-500 hover:bg-white/55"
                }`}
              >
                <Table className="w-4 h-4" />
                Microsoft Excel Simulator
              </button>
              <button
                onClick={() => setActiveCategory("word")}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeCategory === "word"
                    ? "bg-white shadow-md text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:bg-white/55"
                }`}
              >
                <FileText className="w-4 h-4" />
                Microsoft Word Modeler
              </button>
              <button
                onClick={() => setActiveCategory("typing")}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeCategory === "typing"
                    ? "bg-white shadow-md text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-500 hover:bg-white/55"
                }`}
              >
                <Keyboard className="w-4 h-4" />
                Keyboard Mengetik 10 Jari
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-8 bg-white/70">
              {activeCategory === "excel" && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Explanation */}
                  <div>
                    <div className="bg-accent-green/10 text-accent-green px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-3">
                      Data Analysis &amp; Formulas
                    </div>
                    <h3 className="text-2xl font-black text-on-surface mb-4">MS Excel</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-medium">
                      Otomatisasi berkas administratif menggunakan formula modern. Saya biasa merancang pivot table, melakukan analisis regresi deskriptif sederhana, serta menggunakan VLOOKUP/XLOOKUP/INDEX-MATCH untuk sinkronisasi antartabel data.
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-2.5 items-start text-xs">
                        <Check className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                        <span className="font-bold text-on-surface-variant">
                          Dashboard dinamis terintegrasi dengan chart visual.
                        </span>
                      </div>
                      <div className="flex gap-2.5 items-start text-xs">
                        <Check className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                        <span className="font-bold text-on-surface-variant">
                          Manajemen database dengan format terstandarisasi.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Simulator Grid */}
                  <div className="bg-surface border border-gray-100 rounded-3xl p-6">
                    <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-4 block">
                      Live Formula Tester
                    </span>

                    {/* Inputs */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {excelInputs.map((val, idx) => (
                        <div key={idx}>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                            Sel A{idx + 1}
                          </label>
                          <input
                            type="number"
                            value={val}
                            onChange={(e) => handleExcelInputChange(idx, e.target.value)}
                            className="w-full bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm text-on-surface outline-none focus:border-accent-green"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Formula Selector */}
                    <div className="mb-4">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
                        Formula Pilihan
                      </label>
                      <div className="grid grid-cols-4 gap-1.5 bg-gray-100 p-1 rounded-lg">
                        {(["SUM", "AVERAGE", "MAX", "MIN"] as const).map((form) => (
                          <button
                            key={form}
                            onClick={() => setExcelFormula(form)}
                            className={`py-1.5 rounded text-[10px] font-extrabold cursor-pointer transition-all ${
                              excelFormula === form ? "bg-accent-green text-white" : "text-gray-500"
                            }`}
                          >
                            {form}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Outcome Sheet View */}
                    <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
                      <div className="flex justify-between border-b pb-2 text-xs font-bold text-gray-400">
                        <span>Nama Sel</span>
                        <span>Nilai Formula</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-gray-500">
                          ={excelFormula}(A1:A4)
                        </span>
                        <span className="font-bold text-base text-accent-green bg-accent-green-container/30 px-3 py-1 rounded-lg">
                          {runExcelFormula()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeCategory === "word" && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Description */}
                  <div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-3">
                      Corporate Drafting
                    </div>
                    <h3 className="text-2xl font-black text-on-surface mb-4">MS Word</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-medium">
                      Penyusunan naskah formal, tata naskah perkantoran, dan korespondensi bisnis. Saya fokus pada tata letak yang bersih, penggunaan style heading yang konsisten, penomoran halaman dinamis, serta pembuatan daftar isi otomatis (TOC) untuk menjamin kerapian dokumen.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2">
                          Kustomisasi Header Dokumen
                        </label>
                        <input
                          type="text"
                          value={wordHeader}
                          onChange={(e) => setWordHeader(e.target.value.toUpperCase())}
                          className="w-full bg-surface border border-gray-200 px-4 py-2.5 rounded-xl text-xs text-on-surface font-extrabold outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Live Preview */}
                  <div className="bg-surface border border-gray-100 rounded-3xl p-6">
                    <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-4 block">
                      A4 Document Margins Blueprint
                    </span>

                    {/* Template Selector */}
                    <div className="flex gap-2 mb-6">
                      <button
                        onClick={() => setWordTemplate("surat")}
                        className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                          wordTemplate === "surat"
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-500 border-gray-100"
                        }`}
                      >
                        Surat Dinas
                      </button>
                      <button
                        onClick={() => setWordTemplate("laporan")}
                        className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                          wordTemplate === "laporan"
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-500 border-gray-100"
                        }`}
                      >
                        Laporan Resmi
                      </button>
                    </div>

                    {/* Doc Box Preview */}
                    <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200/50 aspect-[1/1.3] text-[9px] font-medium font-serif leading-relaxed text-gray-700 relative overflow-hidden flex flex-col justify-between">
                      <div>
                        {/* Header letterhead */}
                        {wordTemplate === "surat" && (
                          <div className="text-center border-b-2 border-double border-gray-800 pb-3 mb-4">
                            <p className="font-extrabold text-[10px] text-gray-900 tracking-wide font-sans">
                              {wordHeader || "KOP SURAT RESMI"}
                            </p>
                            <p className="text-[7px] text-gray-500 font-sans">
                              Jalan Raya Bandar-Candi Km. 5, Batang, Jawa Tengah
                            </p>
                          </div>
                        )}

                        {wordTemplate === "laporan" && (
                          <div className="mb-6 font-sans">
                            <p className="text-[14px] font-black tracking-tight text-gray-800 leading-none">
                              {wordHeader || "JUDUL LAPORAN EXECUTIVE"}
                            </p>
                            <p className="text-[8px] text-primary font-bold mt-1">
                              Status Dokumen: Draft Hasil Akhir
                            </p>
                          </div>
                        )}

                        <p className="font-sans font-bold text-gray-800 text-[8px] mb-2">
                          {wordTemplate === "surat" ? "Nomor: 042/ADM/VII/2026" : "BAB I - PENDAHULUAN"}
                        </p>
                        <p className="mb-3 text-justify">
                          Dengan hormat, sehubungan dengan diadakannya audit administrasi tata naskah sekolah dan pemetaan ekosistem mobile, kami mengajukan draf pelaporan kegiatan santri dalam pengabdian masyarakat secara berkala.
                        </p>
                        <p className="text-justify">
                          Data analisis pendukung telah diinkubasi menggunakan Microsoft Excel dengan formulas tingkat presisi tinggi sehingga integritas data dapat divalidasi dengan baik.
                        </p>
                      </div>

                      <div className="flex justify-between items-end border-t pt-4 border-gray-100 font-sans">
                        <div>
                          <p className="text-[7px] text-gray-400">Pendidikan Agama Islam (PAI)</p>
                          <p className="text-[7px] font-bold text-gray-600">Rizki Amir M.</p>
                        </div>
                        <p className="text-gray-400 text-[6px]">Halaman 1 dari 1</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeCategory === "typing" && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Typing Details */}
                  <div>
                    <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-3">
                      Touch Typing Proficiency
                    </div>
                    <h3 className="text-2xl font-black text-on-surface mb-4">Mengetik 10 Jari</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-medium text-justify">
                      Kecepatan dan akurasi tinggi merupakan pilar efisiensi saya saat memproses dokumen dinamis. Dengan keahlian mengetik sepuluh jari tanpa melihat papan tombol (touch typing), saya dapat menyelesaikan penulisan naskah, koordinasi surat, dan pengelolaan entri data administratif harian secara berkala secara kilat dan akurat.
                    </p>
                    
                    <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-2 block">
                      Pilih Kalimat Pengujian:
                    </span>
                    <div className="space-y-2">
                      {TYPING_SENTENCES.map((sentence, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSentenceChange(idx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer transition-all line-clamp-1 ${
                            sentenceIndex === idx
                              ? "bg-orange-50 border-orange-300 font-extrabold text-orange-600"
                              : "bg-surface border-gray-100 text-gray-500 hover:border-gray-200"
                          }`}
                        >
                          Teks {idx + 1}: "{sentence}"
                        </button>
                      ))}
                    </div>

                    {/* Score History */}
                    {typingStatsHistory.length > 0 && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100/60">
                        <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-2 block flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          Riwayat Hasil Pengetikan
                        </span>
                        <div className="space-y-1.5">
                          {typingStatsHistory.map((stat, idx) => (
                            <div key={idx} className="flex justify-between text-xs font-bold text-gray-500">
                              <span>Percobaan #{typingStatsHistory.length - idx}</span>
                              <span className="text-on-surface font-extrabold">
                                {stat.wpm} WPM • {stat.accuracy}% Akurasi
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Typing Simulator Game Area */}
                  <div className="bg-surface border border-gray-100 rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase">
                          Touch Typing Sandbox
                        </span>
                        {isCompleted && (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse">
                            <Sparkles className="w-3" />
                            Selesai!
                          </span>
                        )}
                      </div>

                      {/* Display live stats indicator */}
                      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                        <div className="bg-white border border-gray-100 p-2.5 rounded-2xl shadow-sm">
                          <p className="text-[9px] font-black text-gray-400 uppercase">Waktu</p>
                          <p className="text-lg font-black text-primary">{elapsedTime}s</p>
                        </div>
                        <div className="bg-white border border-gray-100 p-2.5 rounded-2xl shadow-sm">
                          <p className="text-[9px] font-black text-gray-400 uppercase">WPM</p>
                          <p className="text-lg font-black text-orange-600">
                            {startTime && elapsedTime > 0
                              ? Math.round((typedText.length / 5) / (elapsedTime / 60))
                              : 0}
                          </p>
                        </div>
                        <div className="bg-white border border-gray-100 p-2.5 rounded-2xl shadow-sm">
                          <p className="text-[9px] font-black text-gray-400 uppercase">Akurasi</p>
                          <p className="text-lg font-black text-emerald-600">
                            {(() => {
                              if (typedText.length === 0) return "100%";
                              let hits = 0;
                              for (let i = 0; i < typedText.length; i++) {
                                if (typedText[i] === targetSentence[i]) hits++;
                              }
                              return `${Math.round((hits / typedText.length) * 100)}%`;
                            })()}
                          </p>
                        </div>
                      </div>

                      {/* Interactive Visual typewriter screen */}
                      <div className="p-4 bg-gray-50/70 border border-gray-100 rounded-2xl font-mono text-xs leading-relaxed text-justify tracking-wide mb-4 relative min-h-[100px] select-none">
                        {targetSentence.split("").map((char, idx) => {
                          let color = "text-gray-400";
                          let bg = "";
                          if (idx < typedText.length) {
                            if (typedText[idx] === char) {
                              color = "text-emerald-600 font-extrabold";
                            } else {
                              color = "text-rose-500 font-extrabold";
                              bg = "bg-rose-100 text-rose-700";
                            }
                          } else if (idx === typedText.length) {
                            bg = "bg-primary/20 border-b-2 border-primary animate-pulse";
                          }
                          return (
                            <span key={idx} className={`${color} ${bg} px-0.5 rounded transition-colors`}>
                              {char}
                            </span>
                          );
                        })}
                      </div>

                      {/* Typing inputs */}
                      <input
                        type="text"
                        value={typedText}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (isCompleted) return;

                          if (!startTime && val.length > 0) {
                            setStartTime(Date.now());
                          }

                          if (val.length <= targetSentence.length) {
                            setTypedText(val);

                            if (val === targetSentence) {
                              setIsCompleted(true);
                              const msElapsed = Date.now() - (startTime || Date.now());
                              const minutes = Math.max(msElapsed, 1000) / 60000;
                              const finalWpm = Math.round((targetSentence.length / 5) / minutes);
                              
                              let hits = 0;
                              for (let i = 0; i < val.length; i++) {
                                if (val[i] === targetSentence[i]) hits++;
                              }
                              const finalAccuracy = Math.round((hits / targetSentence.length) * 100);

                              setTypingStatsHistory(prev => [{ wpm: finalWpm, accuracy: finalAccuracy }, ...prev].slice(0, 5));
                            }
                          }
                        }}
                        disabled={isCompleted}
                        placeholder={
                          startTime
                            ? "Ketik kalimat di atas secara tepat..."
                            : "Mulai mengetik kalimat di atas untuk start..."
                        }
                        className="w-full bg-white border border-gray-200 px-4 py-3 rounded-2xl text-xs text-on-surface outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                      <span className="text-[10px] text-gray-400 font-bold">
                        Rizki Amir M. • Typing Simulator
                      </span>
                      <button
                        onClick={handleResetTyping}
                        className="p-2 border border-gray-200 hover:border-gray-300 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                        title="Ulangi Pengujian"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
