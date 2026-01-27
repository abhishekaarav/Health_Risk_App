import { useState, useEffect } from "react";
import img1 from "../assets/predictionImg1.png";
import img2 from "../assets/predictionImg2.png";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    {
      label: "Total Predictions",
      value: "34",
      icon: "📊",
      color: "from-cyan-500 to-blue-600",
    },
    {
      label: "Heart Avg Risk",
      value: "42%",
      icon: "❤️",
      color: "from-rose-500 to-pink-600",
      highlight: true,
    },
    {
      label: "Diseases Tracked",
      value: "5",
      icon: "🔬",
      color: "from-violet-500 to-purple-600",
    },
  ];

  const recentPredictions = [
    { disease: "Diabetes", risk: 72, date: "18 Nov 2025", trend: "↗" },
    { disease: "Heart", risk: 45, date: "16 Nov 2025", trend: "↘" },
    { disease: "Kidney", risk: 33, date: "11 Nov 2025", trend: "→" },
  ];

  const getRiskColor = (risk) => {
    if (risk >= 70) return "text-red-500";
    if (risk >= 50) return "text-orange-500";
    if (risk >= 35) return "text-yellow-500";
    return "text-green-500";
  };

  const getRiskBg = (risk) => {
    if (risk >= 70) return "bg-red-50";
    if (risk >= 50) return "bg-orange-50";
    if (risk >= 35) return "bg-yellow-50";
    return "bg-green-50";
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 transition-all">
        {/* Animated Header */}
        <div
          className={`flex justify-between items-center mb-6 transform transition-all duration-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r bg-black bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back! Here's your health overview
            </p>
          </div>
          <button
            className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => navigate("/metrics")}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>New Prediction</span>
              <span className="transform transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Stats Cards with Staggered Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } cursor-pointer overflow-hidden group`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Icon with Animation */}
              <div className="flex justify-between items-start mb-3">
                <p className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </p>
                <span className="text-2xl transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {stat.icon}
                </span>
              </div>

              {/* Value with Counter Effect */}
              <p
                className={`text-5xl font-bold ${
                  stat.highlight
                    ? "bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent"
                    : "text-gray-800"
                } transition-all duration-300 group-hover:scale-105`}
              >
                {stat.value}
              </p>

              {/* Animated Bottom Border */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} transition-all duration-500 ${
                  hoveredCard === index ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Heart Risk Trend */}
          <div
            className={`bg-white p-6 rounded-2xl shadow-md h-72 flex flex-col transition-all duration-700 hover:shadow-2xl transform ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-gray-800 text-lg">
                Heart Risk Trend
              </p>
              <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold animate-pulse">
                Live
              </span>
            </div>
            <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 relative group">
              <img
                src={img1}
                alt="Heart Risk Trend"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Disease Distribution */}
          <div
            className={`bg-white p-6 rounded-2xl shadow-md h-72 flex flex-col transition-all duration-700 hover:shadow-2xl transform ${
              isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-gray-800 text-lg">
                Disease Distribution
              </p>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                Updated
              </span>
            </div>
            <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 relative group">
              <img
                src={img2}
                alt="Disease Distribution"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>

        {/* Recent Predictions Table */}
        <div
          className={`bg-white mt-8 p-6 rounded-2xl shadow-md overflow-hidden transition-all duration-700 hover:shadow-2xl transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="font-bold text-gray-800 text-xl">
                Recent Predictions
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Your latest health assessments
              </p>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors flex items-center gap-1 group">
              View All
              <span className="transform transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tl-lg">
                    Disease
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Trend
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tr-lg">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPredictions.map((prediction, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {prediction.disease}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-3 py-1.5 ${getRiskBg(prediction.risk)} rounded-lg`}
                        >
                          <span
                            className={`${getRiskColor(prediction.risk)} font-bold text-base`}
                          >
                            {prediction.risk}%
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xl">{prediction.trend}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {prediction.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Avg Response Time
              </p>
              <p className="text-lg font-bold text-gray-800 mt-1">2.3s</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Accuracy Rate
              </p>
              <p className="text-lg font-bold text-green-600 mt-1">94.7%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Last Updated
              </p>
              <p className="text-lg font-bold text-gray-800 mt-1">2h ago</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
