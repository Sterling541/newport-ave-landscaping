/* ============================================================
   CSV IMPORT — Admin Tool
   Upload historical Google Form exports (2024–2025)
   ============================================================ */

import { useState, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle2, AlertCircle, Clock, ChevronDown, ChevronUp, Info } from "lucide-react";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────

interface ImportResult {
  success: boolean;
  imported: number;
  skipped: number;
  errors: number;
  errorSamples: { row: number; error: string }[];
  skippedSamples: { row: number; reason: string }[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function statusBadge(status: string) {
  const map: Record<string, { label: string; className: string }> = {
    completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    processing: { label: "Processing", className: "bg-amber-100 text-amber-800 border-amber-200" },
    failed: { label: "Failed", className: "bg-red-100 text-red-800 border-red-200" },
    pending: { label: "Pending", className: "bg-slate-100 text-slate-700 border-slate-200" },
  };
  const s = map[status] ?? map.pending;
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${s.className}`}>{s.label}</span>;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CsvImport() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<{ headers: string[]; rows: string[][] } | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const [showSkipped, setShowSkipped] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const importMutation = trpc.csvImport.import.useMutation();
  const historyQuery = trpc.csvImport.history.useQuery();

  // ── File handling ─────────────────────────────────────────────────────────

  const parsePreview = useCallback((text: string) => {
    const lines = text.split("\n").slice(0, 6); // header + 5 rows
    const rows = lines.map(line => {
      const cells: string[] = [];
      let cell = "";
      let inQuotes = false;
      for (const ch of line) {
        if (ch === '"') inQuotes = !inQuotes;
        else if (ch === "," && !inQuotes) { cells.push(cell.trim()); cell = ""; }
        else cell += ch;
      }
      cells.push(cell.trim());
      return cells;
    });
    if (rows.length === 0) return;
    setCsvPreview({ headers: rows[0], rows: rows.slice(1) });
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".csv")) {
      toast.error("Invalid file type: Please upload a .csv file.");
      return;
    }
    if (file.size > 10_000_000) {
      toast.error("File too large: Maximum file size is 10MB.");
      return;
    }
    setSelectedFile(file);
    setImportResult(null);
    const reader = new FileReader();
    reader.onload = (e) => { if (e.target?.result) parsePreview(e.target.result as string); };
    reader.readAsText(file);
  }, [parsePreview, toast]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // ── Import ────────────────────────────────────────────────────────────────

  const handleImport = async () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvText = e.target?.result as string;
      try {
        const result = await importMutation.mutateAsync({ csvText, filename: selectedFile.name });
        setImportResult(result as ImportResult);
        historyQuery.refetch();
        toast.success(`Import complete: ${result.imported} rows imported, ${result.skipped} skipped, ${result.errors} errors.`);
      } catch (err) {
        toast.error(`Import failed: ${String(err)}`);
      }
    };
    reader.readAsText(selectedFile);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_120)] p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[oklch(0.25_0.05_150)]">Historical CSV Import</h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload 2024–2025 Google Form exports to populate the AI Insights Engine with historical data.
          </p>
        </div>

        {/* Info banner */}
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Schema versioning is active.</strong> Existing records will never be overwritten. Duplicate emails submitted on the same date will be skipped automatically.
            The importer handles Google Form CSV exports — column headers are matched flexibly.
          </div>
        </div>

        {/* Upload area */}
        <Card className="border-2 border-dashed border-slate-300 bg-white shadow-sm">
          <CardContent className="p-0">
            <div
              className={`relative flex flex-col items-center justify-center gap-4 p-12 rounded-lg transition-colors cursor-pointer ${isDragging ? "bg-emerald-50 border-emerald-400" : "hover:bg-slate-50"}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={onFileChange} />
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDragging ? "bg-emerald-100" : "bg-slate-100"}`}>
                <Upload className={`w-8 h-8 ${isDragging ? "text-emerald-600" : "text-slate-400"}`} />
              </div>
              {selectedFile ? (
                <div className="text-center">
                  <div className="flex items-center gap-2 text-emerald-700 font-medium">
                    <FileText className="w-4 h-4" />
                    {selectedFile.name}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{(selectedFile.size / 1024).toFixed(1)} KB — click to change</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-medium text-slate-700">Drop your CSV file here</p>
                  <p className="text-sm text-slate-400 mt-1">or click to browse — .csv files only, max 10MB</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        {csvPreview && csvPreview.headers.length > 0 && (
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Column Preview</CardTitle>
              <CardDescription>First 5 rows of your file. Verify the columns look correct before importing.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200">
                      {csvPreview.headers.map((h, i) => (
                        <th key={i} className="text-left py-2 px-3 font-medium text-slate-600 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvPreview.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-slate-100 hover:bg-slate-50">
                        {row.map((cell, ci) => (
                          <td key={ci} className="py-1.5 px-3 text-slate-700 max-w-[200px] truncate">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleImport}
                  disabled={importMutation.isPending}
                  className="bg-[oklch(0.35_0.1_150)] hover:bg-[oklch(0.3_0.1_150)] text-white"
                >
                  {importMutation.isPending ? "Importing…" : `Import ${selectedFile?.name}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Import result */}
        {importResult && (
          <Card className={`shadow-sm ${importResult.errors > 0 ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                {importResult.errors === 0 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">Import Complete</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-emerald-700"><strong>{importResult.imported}</strong> imported</span>
                    <span className="text-amber-700"><strong>{importResult.skipped}</strong> skipped</span>
                    <span className="text-red-700"><strong>{importResult.errors}</strong> errors</span>
                  </div>

                  {importResult.errorSamples.length > 0 && (
                    <div className="mt-3">
                      <button
                        className="flex items-center gap-1 text-xs font-medium text-red-700 hover:text-red-900"
                        onClick={() => setShowErrors(v => !v)}
                      >
                        {showErrors ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        Show errors ({importResult.errorSamples.length})
                      </button>
                      {showErrors && (
                        <div className="mt-2 space-y-1">
                          {importResult.errorSamples.map((e, i) => (
                            <div key={i} className="text-xs text-red-700 bg-red-100 rounded px-2 py-1">
                              Row {e.row}: {e.error}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {importResult.skippedSamples.length > 0 && (
                    <div className="mt-2">
                      <button
                        className="flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-900"
                        onClick={() => setShowSkipped(v => !v)}
                      >
                        {showSkipped ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        Show skipped ({importResult.skippedSamples.length})
                      </button>
                      {showSkipped && (
                        <div className="mt-2 space-y-1">
                          {importResult.skippedSamples.map((s, i) => (
                            <div key={i} className="text-xs text-amber-700 bg-amber-100 rounded px-2 py-1">
                              {s.reason}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Import history */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Import History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {historyQuery.isLoading ? (
              <div className="text-sm text-slate-400 py-4 text-center">Loading…</div>
            ) : !historyQuery.data || historyQuery.data.length === 0 ? (
              <div className="text-sm text-slate-400 py-4 text-center">No imports yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left">
                      <th className="py-2 px-3 font-medium text-slate-600">File</th>
                      <th className="py-2 px-3 font-medium text-slate-600">Status</th>
                      <th className="py-2 px-3 font-medium text-slate-600">Imported</th>
                      <th className="py-2 px-3 font-medium text-slate-600">Skipped</th>
                      <th className="py-2 px-3 font-medium text-slate-600">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyQuery.data.map((job) => (
                      <tr key={job.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono text-xs text-slate-700">{job.filename}</td>
                        <td className="py-2 px-3">{statusBadge(job.status)}</td>
                        <td className="py-2 px-3 text-emerald-700 font-medium">{job.importedRows ?? "—"}</td>
                        <td className="py-2 px-3 text-amber-700">{job.skippedRows ?? "—"}</td>
                        <td className="py-2 px-3 text-slate-500 text-xs">{formatDate(job.startedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
