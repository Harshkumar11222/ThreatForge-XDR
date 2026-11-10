
import api from "./api";

export const MAX_UPLOAD_BYTES = 12_000_000_000;
export const CHUNK_SIZE = 16 * 1024 * 1024;


export interface UploadManifestFile {
  file_id: string;
  relative_path: string;
  size_bytes: number;
  uploaded_bytes: number;
  status: string;
  sha256?: string | null;
  clamav_result?: string | null;
  yara_status?: string | null;
  yara_matches?: string | null;
  threat_name?: string | null;
  severity?: string | null;
  error_message?: string | null;
}


export interface UploadStatusResponse {
  job_id: string;
  status: string;
  total_bytes: number;
  uploaded_bytes: number;
  total_files: number;
  files: UploadManifestFile[];
}

export interface UploadProgress {
  uploadedBytes: number;
  totalBytes: number;
  currentFile: string;
}

export const getRelativeFilePath = (file: File) =>
  file.webkitRelativePath || file.name;

export async function getUploadStatus(jobId: string) {
  const response = await api.get<UploadStatusResponse>(
    `/uploads/${jobId}`
  );
  return response.data;
}

export async function uploadFilesInChunks(
  selectedFiles: File[],
  onProgress: (progress: UploadProgress) => void
) {
  const totalBytes = selectedFiles.reduce(
    (sum, file) => sum + file.size,
    0
  );

  if (totalBytes > MAX_UPLOAD_BYTES) {
    throw new Error("Combined upload limit is 12 GB.");
  }

  if (selectedFiles.length > 10000) {
    throw new Error("Maximum 10,000 files allowed.");
  }

  const manifest = selectedFiles.map((file) => ({
    relative_path: getRelativeFilePath(file),
    size_bytes: file.size,
  }));

  const fileMap = new Map(
    selectedFiles.map((file) => [
      getRelativeFilePath(file),
      file,
    ])
  );

  const init = await api.post("/uploads/init", {
    files: manifest,
  });

  const {
    job_id: jobId,
    files,
    chunk_size: chunkSize,
  } = init.data;

  let completedBytes = 0;

  onProgress({
    uploadedBytes: 0,
    totalBytes,
    currentFile: "Preparing upload",
  });

  for (const item of files) {
    const file = fileMap.get(item.relative_path);

    if (!file) {
      throw new Error(`File not found: ${item.relative_path}`);
    }

    let offset = item.uploaded_bytes || 0;

    while (offset < file.size) {
      const end = Math.min(
        offset + chunkSize,
        file.size
      );

      const chunk = file.slice(offset, end);

      await api.put(
        `/uploads/${jobId}/files/${item.file_id}/chunk`,
        chunk,
        {
          params: { offset },
          headers: {
            "Content-Type": "application/octet-stream",
          },
          timeout: 0,
        }
      );

      offset = end;
      completedBytes += chunk.size;

      onProgress({
        uploadedBytes: completedBytes,
        totalBytes,
        currentFile: item.relative_path,
      });
    }
  }

  const result = await api.post(
    `/uploads/${jobId}/finalize`
  );

  return {
    jobId,
    status: result.data.status,
  };
}
