/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Printer, Mail, MapPin, Award, BookOpen, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Header / Actions (Hidden during browser Print via modern custom utilities) */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-gray-100 bg-gray-50 print:hidden">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-black text-on-surface-variant uppercase tracking-widest">
                  Executive Curriculum Vitae
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Cetak CV (PDF)
                </button>
                <button
                  onClick={onClose}
                  className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body (Printable area) */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 print:p-0 print:overflow-visible">
              <div id="cv-printable-content" className="max-w-3xl mx-auto print:max-w-full print:text-black">
                {/* Visual Bio Header */}
                <div className="border-b-4 border-primary pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-on-background print:text-black">
                      Rizki Amir Ma'ruf
                    </h1>
                    <p className="text-primary font-bold text-lg mt-1 print:text-blue-700">
                      Profesional Administrasi &amp; Typing Expert
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4 text-xs text-on-surface-variant font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        Candi, Bandar, Kabupaten Batang, Jawa Tengah
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-primary" />
                        rizkiamir363@gmail.com
                      </span>
                    </div>
                  </div>
                  <div className="text-left md:text-right text-xs text-on-surface-variant leading-relaxed">
                    <p className="font-bold uppercase text-on-surface tracking-wider">Status Pendidikan</p>
                    <p>S1 Pendidikan Agama Islam (PAI)</p>
                    <p className="font-bold text-primary mt-1">Sekolah Tinggi Islam Kendal (2022 - 2026)</p>
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="py-8 border-b border-gray-100">
                  <h2 className="text-lg font-black tracking-wider uppercase text-on-surface mb-3 print:text-black">
                    Profil Profesional
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed text-justify">
                    Seorang profesional administrasi dengan keahlian mendalam dalam manajemen operasional kantor dan pengolahan data strategis menggunakan rangkaian Microsoft Office (Excel, Word, PowerPoint) serta keahlian kecepatan mengetik sepuluh jari (touch typing) yang tinggi untuk pemrosesan naskah administratif secara presisi, akurat, dan efisien. Lulusan yang berdisiplin tinggi, terstruktur, serta berakar dari nilai kepemimpinan dan integritas Pondok Pesantren.
                  </p>
                </div>

                {/* Main Grid: Left Column (Skills & Certs), Right Column (Timeline & Experience) */}
                <div className="grid md:grid-cols-12 gap-8 py-8">
                  {/* Left Column */}
                  <div className="md:col-span-5 space-y-8">
                    {/* Core Skills */}
                    <div>
                      <h3 className="text-xs font-black tracking-widest uppercase text-on-surface-variant border-b pb-2 mb-4">
                        Keahlian Utama
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span>Manajemen Administrasi</span>
                            <span>95%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: "95%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span>Microsoft Excel (Data Analyst)</span>
                            <span>92%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-green rounded-full" style={{ width: "92%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span>Microsoft Word &amp; PPT</span>
                            <span>90%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: "90%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span>Mengetik Cepat 10 Jari</span>
                            <span>95% (85 - 100 WPM)</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-green rounded-full" style={{ width: "95%" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h3 className="text-xs font-black tracking-widest uppercase text-on-surface-variant border-b pb-2 mb-4 font-bold">
                        Sertifikasi &amp; Gelar
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex gap-2 items-start text-xs">
                          <Award className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-on-surface">MS Office Master Certification</p>
                            <p className="text-on-surface-variant">Standardized Admin Proficiency</p>
                          </div>
                        </li>
                        <li className="flex gap-2 items-start text-xs">
                          <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-on-surface">Pendidikan Utama Ponpes</p>
                            <p className="text-on-surface-variant">TPI Al Hidayah Plumbon (2013-Sekarang)</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Language Proficiences */}
                    <div>
                      <h3 className="text-xs font-black tracking-widest uppercase text-on-surface-variant border-b pb-2 mb-4 font-bold">
                        Bahasa
                      </h3>
                      <div className="flex justify-between text-xs font-medium">
                        <span>Bahasa Indonesia (Native)</span>
                        <span className="font-bold text-primary">Sangat Aktif</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium mt-2">
                        <span>Bahasa Inggris (Passive/Technical)</span>
                        <span className="font-bold text-gray-500 font-bold">Menengah</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="md:col-span-7 space-y-8">
                    {/* Education */}
                    <div>
                      <h3 className="text-xs font-black tracking-widest uppercase text-on-surface-variant border-b pb-2 mb-4">
                        Riwayat Akademis
                      </h3>
                      <div className="space-y-6">
                        <div className="border-l-2 border-primary pl-4 py-1 relative">
                          <div className="absolute w-2.5 h-2.5 bg-primary rounded-full -left-[6px] top-2" />
                          <span className="text-[10px] uppercase font-black text-primary">2022 - 2026</span>
                          <h4 className="text-sm font-extrabold text-on-surface mt-0.5">
                            Sekolah Tinggi Islam Kendal
                          </h4>
                          <p className="text-xs text-on-surface-variant font-bold">Pendidikan Agama Islam (PAI)</p>
                        </div>

                        <div className="border-l-2 border-accent-green pl-4 py-1 relative">
                          <div className="absolute w-2.5 h-2.5 bg-accent-green rounded-full -left-[6px] top-2" />
                          <span className="text-[10px] uppercase font-black text-accent-green">2013 - Sekarang</span>
                          <h4 className="text-sm font-extrabold text-on-surface mt-0.5">
                            Pondok Pesantren TPI Al Hidayah Plumbon
                          </h4>
                          <p className="text-xs text-on-surface-variant">Pendidikan Keagamaan &amp; Karakter Utama</p>
                        </div>

                        <div className="border-l-2 border-gray-300 pl-4 py-1 relative">
                          <div className="absolute w-2.5 h-2.5 bg-gray-300 rounded-full -left-[6px] top-2" />
                          <span className="text-[10px] uppercase font-black text-gray-500">2017 - 2019</span>
                          <h4 className="text-sm font-extrabold text-on-surface mt-0.5">
                            PKBM Bima Limpung
                          </h4>
                          <p className="text-xs text-on-surface-variant">Pendidikan Menengah Atas</p>
                        </div>

                        <div className="border-l-2 border-gray-200 pl-4 py-1 relative">
                          <div className="absolute w-2.5 h-2.5 bg-gray-200 rounded-full -left-[6px] top-2" />
                          <span className="text-[10px] uppercase font-black text-gray-400">2013 - 2016</span>
                          <h4 className="text-sm font-extrabold text-on-surface mt-0.5">
                            MTs NU Al Syairiyah Limpung
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Extracurriculars and Activities */}
                    <div>
                      <h3 className="text-xs font-black tracking-widest uppercase text-on-surface-variant border-b pb-2 mb-4">
                        Aktivitas &amp; Eksplorasi
                      </h3>
                      <ul className="text-xs text-on-surface-variant space-y-2.5 list-disc pl-4 font-medium">
                        <li>Pengolahan data administratif kegiatan pesantren &amp; kemahasiswaan.</li>
                        <li>Pelatihan mandiri mengetik 10 jari secara konsisten untuk menjamin kecepatan pemrosesan naskah kantor harian.</li>
                        <li>Penyusunan berkas administrasi ujian berbasis template Word dan Excel formal.</li>
                        <li>Pengabdian dan pengajaran materi pendidikan agama untuk warga sekitar pesantren.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Professional Footer */}
                <div className="mt-10 pt-6 border-t border-gray-100 text-center text-[10px] text-gray-400 font-bold tracking-wider">
                  DIBUAT SECARA PRESISI • PORTFOLIO CV DIGITAL RIZKI AMIR MA'RUF
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
