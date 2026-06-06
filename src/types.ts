/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EducationItem {
  id: string;
  period: string;
  schoolName: string;
  studyProgram?: string;
  websiteUrl: string;
  icon: string;
  accentColor: "primary" | "accent-green";
  description?: string;
  isPrimary?: boolean;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
  bgClass: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface ProcessorSpec {
  name: string;
  cpuScore: number;
  gpuScore: number;
  efficiencyScore: number;
  aiProcessing: number;
}
