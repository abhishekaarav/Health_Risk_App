import img1 from "../assets/predictionImg1.png";
import img2 from "../assets/predictionImg2.png";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1  p-4 transition-all">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow text-sm"
            onClick={() => navigate("/metrics")}
          >
            New Prediction
          </button>
        </div>

        {/* ===== CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Total Predictions</p>
            <p className="text-4xl font-bold mt-2">34</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Heart Avg Risk</p>
            <p className="text-4xl font-bold mt-2 text-red-500">42%</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Diseases Tracked</p>
            <p className="text-4xl font-bold mt-2">5</p>
          </div>
        </div>

        {/* ===== GRAPHS ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Heart Trend */}
          <div className="bg-white p-5 rounded-2xl shadow-md h-72 flex flex-col">
            <p className="font-semibold text-gray-700 mb-2">Heart Risk Trend</p>
            <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
              <img
                src={img1}
                alt="Heart Risk Trend"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Disease Distribution */}
          <div className="bg-white p-5 rounded-2xl shadow-md h-72 flex flex-col">
            <p className="font-semibold text-gray-700 mb-2">
              Disease Distribution
            </p>
            <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
              <img
                src={img2}
                alt="Disease Distribution"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* ===== RECENT PREDICTIONS ===== */}
        <div className="bg-white mt-8 p-5 rounded-2xl shadow-md overflow-x-auto">
          <p className="font-semibold text-gray-700 mb-4 text-lg">
            Recent Predictions
          </p>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 border rounded-lg">
              <tr>
                <th className="px-4 py-2 text-left">Disease</th>
                <th className="px-4 py-2 text-left">Risk</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">Diabetes</td>
                <td className="px-4 py-2 text-red-500 font-semibold">72%</td>
                <td className="px-4 py-2">18 Nov 2025</td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">Heart</td>
                <td className="px-4 py-2 text-yellow-500 font-semibold">45%</td>
                <td className="px-4 py-2">16 Nov 2025</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">Kidney</td>
                <td className="px-4 py-2 text-green-600 font-semibold">33%</td>
                <td className="px-4 py-2">11 Nov 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
