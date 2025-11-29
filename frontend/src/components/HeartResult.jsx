import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function HeartResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  // Agar koi direct /heart-result pe aa jaye bina data ke
  useEffect(() => {
    if (!result) {
      navigate("/heart-predict");
    }
  }, [result, navigate]);

  if (!result) return null;

  const { label, risk_probability, suggestions = [] } = result;
  const percentage = Math.round((risk_probability || 0) * 100);

  const getRiskColor = () => {
    if (percentage < 35)
      return "text-emerald-600 bg-emerald-50 border-emerald-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getChipBg = () => {
    if (percentage < 35) return "bg-emerald-100 text-emerald-700";
    return "bg-rose-100 text-rose-700";
  };

  const getBarBg = () => {
    if (percentage < 35) return "bg-emerald-500";
    return "bg-rose-500";
  };

  const getRiskDescription = () => {
    if (percentage < 35)
      return "Your predicted risk is relatively low. Maintain a healthy lifestyle to keep it this way.";
    return "You are in the high risk category. Please consult a doctor as soon as possible and follow medical advice.";
  };

  const getRiskTagline = () => {
    if (percentage < 35) return "You’re currently in the safer zone.";
    return "Your heart needs your urgent attention.";
  };

  const handleNewPrediction = () => {
    navigate("/heart-predict");
  };

  // ---- PDF DOWNLOAD (without html2canvas) ----
  const handleDownloadReport = () => {
    try {
      const doc = new jsPDF("p", "mm", "a4");

      const marginX = 15;
      let y = 18;

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Heart Risk Analysis Report", marginX, y);
      y += 8;

      // Subtitle
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(90);
      doc.text(
        "This report summarizes your predicted heart attack risk based on the data you provided.",
        marginX,
        y,
        { maxWidth: 180 }
      );
      y += 10;

      // Basic details
      doc.setTextColor(0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Overall Risk Category:", marginX, y);
      doc.setFont("helvetica", "normal");
      doc.text(` ${label}`, marginX + 55, y);
      y += 7;

      doc.setFont("helvetica", "bold");
      doc.text("Risk Probability (0 - 1):", marginX, y);
      doc.setFont("helvetica", "normal");
      doc.text(
        ` ${(risk_probability || 0).toFixed(3)} (~${percentage}%)`,
        marginX + 60,
        y
      );
      y += 10;

      // Risk bar visual
      doc.setFont("helvetica", "bold");
      doc.text("Risk Score Visualization:", marginX, y);
      y += 5;

      const barWidth = 170;
      const barHeight = 8;

      // Outer bar
      doc.setDrawColor(180);
      doc.rect(marginX, y, barWidth, barHeight);

      // Filled bar
      const riskBarWidth = (barWidth * percentage) / 100;

      if (percentage < 35) {
        // approx emerald-500: rgb(16, 185, 129)
        doc.setFillColor(16, 185, 129);
      } else {
        // approx rose-500: rgb(244, 63, 94)
        doc.setFillColor(244, 63, 94);
      }

      doc.rect(marginX, y, riskBarWidth, barHeight, "F");
      y += 12;

      // Legend
      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text("0%", marginX, y);
      doc.text("100%", marginX + barWidth - 10, y);
      doc.text(`Score: ${percentage}%`, marginX + barWidth / 2 - 10, y);
      y += 8;

      // Risk description
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text("Summary:", marginX, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(60);
      const description = getRiskDescription();
      const lines = doc.splitTextToSize(description, 180);
      doc.text(lines, marginX, y);
      y += lines.length * 6 + 4;

      // Suggestions
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text("Recommended Next Steps:", marginX, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(60);

      if (suggestions.length > 0) {
        suggestions.forEach((s, index) => {
          const bulletText = `${index + 1}. ${s}`;
          const wrapped = doc.splitTextToSize(bulletText, 180);

          // naya page agar bahut neeche aa gaya
          if (y + wrapped.length * 6 > 280) {
            doc.addPage();
            y = 20;
          }

          doc.text(wrapped, marginX, y);
          y += wrapped.length * 6 + 2;
        });
      } else {
        doc.text(
          "No specific suggestions were provided by the model for this prediction.",
          marginX,
          y,
          { maxWidth: 180 }
        );
      }

      // Footer note
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      y += 10;
      doc.setFontSize(8);
      doc.setTextColor(140);
      doc.text(
        "Note: This report is generated by an AI model and is not a substitute for professional medical advice.",
        marginX,
        y,
        { maxWidth: 180 }
      );

      doc.save(`heart-risk-report-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 border border-white/40">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Heart Health • AI Risk Assessment
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Heart Risk Analysis Report
            </h1>
            <p className="text-sm md:text-base text-slate-500 mt-1">
              Generated using your submitted health information and our machine
              learning model.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-start md:justify-end">
            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-transform"
            >
              <span className="inline-flex">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M5 19h14" />
                </svg>
              </span>
              Download Report (PDF)
            </button>

            <button
              onClick={handleNewPrediction}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:-translate-y-0.5 transition-transform"
            >
              <span className="inline-flex">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h7" />
                  <path d="M13 4h7" />
                  <path d="M4 12h16" />
                  <path d="M4 20h7" />
                  <path d="M13 20h7" />
                </svg>
              </span>
              New Prediction
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* RISK SUMMARY CARD */}
          <div className="lg:col-span-1">
            <div
              className={`border rounded-3xl p-6 md:p-7 shadow-sm flex flex-col items-center text-center ${getRiskColor()} transition-transform hover:-translate-y-1 hover:shadow-md`}
            >
              <p className="text-xs font-medium tracking-[0.18em] uppercase mb-3 opacity-80">
                Overall Risk Category
              </p>

              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-current" />
                <p className="text-3xl font-extrabold">{label}</p>
              </div>

              <p className="text-xs md:text-sm opacity-80 mb-5">
                Model&apos;s predicted heart attack risk based on your input.
              </p>

              {/* Circular indicator */}
              <div className="relative w-36 h-36 mb-5">
                <div className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-sm border border-white/70 shadow-inner" />
                <div className="absolute inset-1 rounded-full border-[10px] border-slate-100" />
                <div
                  className="absolute inset-1 rounded-full border-[10px] border-t-transparent border-r-transparent border-b-transparent"
                  style={{
                    borderLeftColor:
                      percentage < 35 ? "#10b981" : "#f43f5e",
                    transform: `rotate(${(percentage / 100) * 360}deg)`,
                    transformOrigin: "center center",
                    transition: "transform 0.6s ease-out",
                  }}
                />
                <div className="absolute inset-5 rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
                  <span className="text-[11px] text-slate-500 tracking-wide uppercase">
                    Risk Score
                  </span>
                  <span className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {percentage}%
                  </span>
                  <span className="mt-1 text-[11px] text-slate-400">
                    out of 100
                  </span>
                </div>
              </div>

              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold ${getChipBg()} mb-3`}
              >
                {getRiskTagline()}
              </div>

              <p className="text-xs md:text-sm text-slate-700 max-w-xs">
                {getRiskDescription()}
              </p>
            </div>
          </div>

          {/* RIGHT SECTION: BAR + SUGGESTIONS + METRICS */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Risk Bar */}
            <div className="border rounded-3xl p-5 md:p-6 shadow-sm bg-gradient-to-br from-slate-50 via-white to-slate-50">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-[0.18em]">
                    Risk Probability
                  </p>
                  <p className="text-sm text-slate-500">
                    Model confidence about your heart attack risk.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Predicted Score</p>
                  <p className="text-xl md:text-2xl font-bold text-slate-900">
                    {percentage}%
                  </p>
                </div>
              </div>

              <div className="w-full h-4 bg-slate-200/70 rounded-full overflow-hidden">
                <div
                  className={`h-4 ${getBarBg()} rounded-full`}
                  style={{ width: `${percentage}%`, transition: "width 0.6s" }}
                ></div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                <span>0%</span>
                <span>{percentage}%</span>
                <span>100%</span>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 text-[11px] md:text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-600">Low Risk (&lt; 35%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-slate-600">High Risk (&gt;= 35%)</span>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="border rounded-3xl p-5 md:p-6 shadow-sm bg-white">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs md:text-sm font-semibold text-slate-700">
                  Recommended Next Steps
                </p>
                <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-500 font-medium">
                  {suggestions.length || 0} Suggestions
                </span>
              </div>

              {suggestions.length > 0 ? (
                <ul className="space-y-3 text-sm text-slate-700">
                  {suggestions.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50/80 border border-slate-100"
                    >
                      <span className="mt-1 inline-flex w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 italic">
                  No specific suggestions were provided by the model for this
                  prediction.
                </p>
              )}
            </div>

            {/* Small summary chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs md:text-sm">
              <div className="rounded-2xl border bg-slate-50/80 p-4 flex flex-col gap-1">
                <span className="font-semibold text-slate-700">
                  Model Output Label
                </span>
                <span className="text-slate-500">
                  The AI model has classified your current risk as{" "}
                  <span className="font-semibold text-slate-800">{label}</span>.
                </span>
              </div>
              <div className="rounded-2xl border bg-slate-50/80 p-4 flex flex-col gap-1">
                <span className="font-semibold text-slate-700">
                  Probability Score
                </span>
                <span className="text-slate-500">
                  Risk probability:{" "}
                  <span className="font-semibold text-slate-800">
                    {(risk_probability || 0).toFixed(3)}
                  </span>{" "}
                  (0–1 scale).
                </span>
              </div>
              <div className="rounded-2xl border bg-slate-50/80 p-4 flex flex-col gap-1">
                <span className="font-semibold text-slate-700">
                  Report Generated
                </span>
                <span className="text-slate-500">
                  This report is generated in real-time and can be downloaded as
                  a PDF for future reference.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
