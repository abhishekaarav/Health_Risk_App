// DiabetesResult.jsx
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Props:
 * - result: { label: string, risk_probability: number (0..1), suggestions: string[] }
 * - onBack: () => void
 * - onSave?: (result) => void  // optional callback when user clicks "Save to profile"
 */
export default function DiabetesResult({ result, onBack, onSave }) {
  const percent = Math.round((result?.risk_probability ?? 0) * 100);
  const [animatedPct, setAnimatedPct] = useState(0);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [saved, setSaved] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const rafRef = useRef(null);
  const cardRef = useRef(null); // <-- ref used for html2canvas

  // Determine color and friendly message
  const severity = (() => {
    if (percent >= 66) return { key: "High", color: "#dc2626", note: "Seek medical advice promptly." };
    if (percent >= 34) return { key: "Medium", color: "#d97706", note: "Monitor and follow lifestyle changes." };
    return { key: "Low", color: "#16a34a", note: "Maintain healthy habits." };
  })();

  // animate percentage (requestAnimationFrame)
  useEffect(() => {
    let start = null;
    const duration = 800; // ms
    const from = 0;
    const to = percent;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.round(from + (to - from) * easeOutCubic(progress));
      setAnimatedPct(value);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [percent]);

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  const handleCopy = async () => {
    const text = result.suggestions.join("\n• ");
    try {
      await navigator.clipboard.writeText(`Diabetes Risk: ${result.label} (${percent}%)\n\nSuggestions:\n• ${text}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
      setCopied(false);
    }
  };

  const handleShare = async () => {
    const shareText = `Diabetes Risk: ${result.label} (${percent}%)\nSuggestions: ${result.suggestions.join(" | ")}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Diabetes Risk Prediction",
          text: shareText,
        });
      } catch (err) {
        console.error("Share cancelled or failed", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert("Share text copied to clipboard (Web Share not supported).");
      } catch {
        alert("Neither sharing nor clipboard available in this browser.");
      }
    }
  };

  const handleSave = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("diabetes_results") || "[]");
      const payload = {
        id: Date.now(),
        result,
        percent,
        savedAt: new Date().toISOString(),
      };
      stored.unshift(payload);
      localStorage.setItem("diabetes_results", JSON.stringify(stored.slice(0, 20)));
      setSaved(true);
      if (onSave) onSave(payload);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleDownloadJSON = () => {
    const data = {
      result,
      percent,
      savedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diabetes_result_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ------------------ PDF generation using html2canvas + jsPDF ------------------
  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    setPdfLoading(true);
    try {
      // Use html2canvas to render node to canvas
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // higher scale for better quality
        useCORS: true,
        logging: false,
        scrollY: -window.scrollY, // ensure correct capture when scrolled
      });

      const imgData = canvas.toDataURL("image/png");

      // Create jsPDF and add the image; handle multi-page content
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // dimensions of the image in PDF units
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Additional pages if necessary
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`diabetes_result_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF generation error.");
    } finally {
      setPdfLoading(false);
    }
  };
  // ------------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-start justify-center py-12 px-4">
      {/* The ref is attached to the area we want to export as PDF */}
      <div ref={cardRef} className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 md:p-10">
        <div className="flex items-start gap-6 md:gap-10">
          {/* Left: Gauge */}
          <div className="flex-shrink-0">
            <div role="img" aria-label={`Risk gauge showing ${percent} percent`} className="relative" style={{ width: 180, height: 180 }}>
              <svg width={180} height={180} viewBox={`0 0 180 180`} className="block">
                <circle cx={90} cy={90} r={72} stroke="#e6e6e6" strokeWidth={14} fill="none" />
                <circle
                  cx={90}
                  cy={90}
                  r={72}
                  stroke={severity.color}
                  strokeWidth={14}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 72}
                  strokeDashoffset={(2 * Math.PI * 72) - ((animatedPct / 100) * (2 * Math.PI * 72))}
                  transform={`rotate(-90 90 90)`}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-sm text-gray-500">Risk</div>
                <div className="text-2xl md:text-3xl font-semibold" style={{ color: severity.color }}>
                  {animatedPct}%
                </div>
                <div className="text-xs text-gray-400 mt-1">({result.label})</div>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">Diabetes Prediction Result</h2>

            <p className="mt-2 text-sm text-gray-600">
              Severity:{" "}
              <span className="font-semibold" style={{ color: severity.color }}>
                {result.label}
              </span>
              {" — "}{severity.note}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
              <StatBox label="Probability" value={`${percent}%`} />
              <StatBox label="Label" value={result.label} color={severity.color} />
              <StatBox label="Saved" value={saved ? "✓ Saved" : "Not saved"} />
            </div>

            {/* Suggestions */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Suggestions</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpanded((v) => !v)}
                    className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                    aria-expanded={expanded}
                  >
                    {expanded ? "Collapse" : "Expand"}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className={`mt-3 text-gray-700 transition-all duration-200 ${expanded ? "max-h-96" : "max-h-0 overflow-hidden"}`}>
                <ul className="list-inside list-decimal space-y-2">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle cx="12" cy="12" r="10" stroke={severity.color} strokeWidth="2" />
                          <path d="M7 12l3 3 7-7" stroke={severity.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="text-sm">{s}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={handleShare} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Share
              </button>

              <button onClick={handleDownloadJSON} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                Download JSON
              </button>

              <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                {saved ? "Saved ✓" : "Save to profile"}
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={pdfLoading}
                className={`px-4 py-2 rounded-lg ${pdfLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} text-white`}
              >
                {pdfLoading ? "Preparing PDF..." : "Download as PDF"}
              </button>

              <button onClick={onBack} className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50">
                Back to form
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Note: This is a predictive output and not a diagnosis. Follow-up with a healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small stat box subcomponent */
function StatBox({ label, value, color }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 font-medium" style={{ color: color || "inherit" }}>
        {value}
      </div>
    </div>
  );
}
