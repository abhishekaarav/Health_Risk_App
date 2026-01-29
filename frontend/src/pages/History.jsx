import React, { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    const res = await axios.get("/api/history", { withCredentials: true });
    setHistory(res.data.history);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const deleteItem = async (id) => {
    await axios.delete(`/api/history/${id}`, { withCredentials: true });
    fetchHistory();
  };

  const filteredHistory =
    filter === "All"
      ? history
      : history.filter((h) => h.disease === filter);

  const badgeColor = (level) => {
    if (level === "LOW") return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300";
    if (level === "MEDIUM") return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300";
    return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent mb-2">
              Prediction History
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              View and manage your health predictions
            </p>
          </div>

          {/* FILTER */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 pr-10 sm:pr-12 font-medium text-gray-700 shadow-sm hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-300 cursor-pointer w-full sm:w-auto"
            >
              <option>All</option>
              <option>Heart</option>
              <option>Diabetes</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-zinc-200 border-t-zinc-600 rounded-full animate-spin"></div>
              <div className="mt-4 text-center text-gray-600 font-medium">Loading...</div>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 animate-fade-in">
            <div className="bg-white rounded-full p-6 shadow-lg mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium">No records found</p>
            <p className="text-gray-400 text-sm mt-2">Your prediction history will appear here</p>
          </div>
        )}

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredHistory.map((item, index) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* COLOR ACCENT BAR */}
              <div
                className={`h-2 ${
                  item.disease === "Heart"
                    ? "bg-gradient-to-r from-red-500 to-pink-500"
                    : "bg-gradient-to-r from-green-500 to-emerald-500"
                }`}
              ></div>

              <div className="p-5 sm:p-6">
                {/* TITLE & DELETE */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.disease === "Heart"
                          ? "bg-red-100"
                          : "bg-green-100"
                      }`}
                    >
                      {item.disease === "Heart" ? (
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <h2 className="font-bold text-lg sm:text-xl text-gray-800">
                      {item.disease}
                    </h2>
                  </div>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="group/btn p-2 rounded-lg hover:bg-red-50 transition-all duration-300 active:scale-95"
                    title="Delete"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover/btn:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* DATE */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(item.createdAt).toLocaleString()}
                </div>

                {/* RISK BADGE */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-600">Risk Level</span>
                  </div>
                  <span
                    className={`inline-block px-4 py-2 text-sm font-bold rounded-xl ${badgeColor(
                      item.prediction
                    )} shadow-sm transition-all duration-300 hover:scale-105`}
                  >
                    {item.prediction}
                  </span>
                </div>

                {/* CONFIDENCE BAR */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Confidence</span>
                    <span className="text-sm font-bold text-gray-800">
                      {(item.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-zinc-500 to-zinc-700 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${item.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* SUGGESTIONS */}
                {item.suggestions?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() =>
                        setOpenId(openId === item._id ? null : item._id)
                      }
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-zinc-600 to-zinc-800 hover:from-zinc-700 hover:to-zinc-900 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                      <span className="text-sm sm:text-base">
                        {openId === item._id
                          ? "Hide Suggestions"
                          : "View Suggestions"}
                      </span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openId === item._id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openId === item._id
                          ? "max-h-96 opacity-100 mt-3"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-2">
                        {item.suggestions.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-3 animate-fade-in"
                            style={{ animationDelay: `${i * 50}ms` }}
                          >
                            <svg className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}