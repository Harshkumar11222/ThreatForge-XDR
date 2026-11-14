
import api from "./api";

export interface UploadScanFile {
  file_id: string;
  relative_path: string;
  size_bytes: number;
  status: string;
  sha256: string | null;
  clamav_result: string | null;
  yara_status: string | null;
  yara_matches: string | null;
  threat_name: string | null;
  severity: string | null;
  error_message: string | null;
  scanned_at: string | null;
}

export interface Scan {
  job_id: string;
  status: string;
  total_files: number;
  scanned_files: number;
  clean_files: number;
  suspicious_files: number;
  malicious_files: number;
  error_files: number;
  total_bytes: number;
  created_at: string;
  updated_at: string;
  files: UploadScanFile[];
}

export const getScans = async (): Promise<Scan[]> => {
  const response = await api.get("/uploads/history");
  return response.data;
};
