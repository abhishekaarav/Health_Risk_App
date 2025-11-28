import React, { useEffect, useState } from "react";

export default function HospitalLocator() {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const [sortOption, setSortOption] = useState("nearest");
  const [filters, setFilters] = useState({
    emergency: false,
    icu: false,
    roundClock: false,
  });

  const [showMap, setShowMap] = useState(false);
  const [activeHospital, setActiveHospital] = useState(null);

  const [page, setPage] = useState(1);
  const perPage = 6;

  // Distance Calculation
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;

    return dist < 1 ? `${(dist * 1000).toFixed(0)} m` : `${dist.toFixed(2)} km`;
  };

  // WhatsApp Share
  const shareOnWhatsApp = (h) => {
    const msg = `
🏥 *${h.name}*
📍 ${h.address}
📏 Distance: ${h.distance}
🗺️ Map: https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}
    `;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Get User Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Location access denied!")
    );
  }, []);

  // Reverse city name
  useEffect(() => {
    if (!location) return;

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`
    )
      .then((res) => res.json())
      .then((d) => {
        setCity(
          d.address.city ||
            d.address.town ||
            d.address.village ||
            d.address.state ||
            "Unknown"
        );
      });
  }, [location]);

  // Random Badges
  const randomBadges = () => {
    const options = [
      {
        label: "24×7",
        key: "roundClock",
        color: "bg-green-100 text-green-700",
      },
      {
        label: "Emergency",
        key: "emergency",
        color: "bg-red-100 text-red-700",
      },
      { label: "ICU", key: "icu", color: "bg-blue-100 text-blue-700" },
    ];
    return options.sort(() => 0.5 - Math.random()).slice(0, 2);
  };

  // Fetch Hospitals from Overpass API
  useEffect(() => {
    if (!location) return;

    const q = `
      [out:json];
      (
        node["amenity"="hospital"](around:6000, ${location.lat}, ${location.lng});
        node["amenity"="clinic"](around:6000, ${location.lat}, ${location.lng});
      );
      out center;
    `;

    const fetchHospitals = async () => {
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: q,
      });

      const data = await res.json();

      const result = data.elements.map((h) => ({
        name: h.tags.name || "Unnamed Hospital",
        type: h.tags.amenity,
        lat: h.lat,
        lng: h.lon,
        address: h.tags["addr:full"] || h.tags["addr:street"] || city,
        city,
        badges: randomBadges(),
        distanceValue: +calculateDistance(
          location.lat,
          location.lng,
          h.lat,
          h.lon
        ).replace(" km", ""),
        distance: calculateDistance(location.lat, location.lng, h.lat, h.lon),
      }));

      setTimeout(() => {
        setHospitals(result);
        setFiltered(result);
        setLoading(false);
      }, 800);
    };

    fetchHospitals();
  }, [location, city]);

  // Apply Search + Filters + Sort
  const applyFilters = () => {
    let data = [...hospitals];

    if (searchQuery.trim()) {
      data = data.filter((h) =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.emergency)
      data = data.filter((h) => h.badges.some((b) => b.key === "emergency"));

    if (filters.icu)
      data = data.filter((h) => h.badges.some((b) => b.key === "icu"));

    if (filters.roundClock)
      data = data.filter((h) => h.badges.some((b) => b.key === "roundClock"));

    if (sortOption === "nearest") {
      data.sort((a, b) => a.distanceValue - b.distanceValue);
    }

    setFiltered(data);
    setPage(1);
  };

  useEffect(() => {
    if (!loading) applyFilters();
  }, [searchQuery, filters, sortOption]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="w-full py-12 px-6 md:px-14 bg-gradient-to-b from-gray-100 via-white to-white">
      <h1 className="text-4xl font-bold text-center text-gray-700">
        Hospital Locator
      </h1>

      {/* Search */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <input
          type="text"
          placeholder="Search hospital..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-3 w-72 border rounded-xl shadow bg-white"
        />

        <select
          className="px-4 py-3 border rounded-xl bg-white shadow"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="nearest">Nearest First</option>
        </select>

        <input
          type="text"
          disabled
          className="px-4 py-3 w-60 border rounded-xl bg-gray-200 text-gray-700"
          value={city}
        />
      </div>

      {/* Hospital Cards */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {paginated.map((h, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl shadow-xl bg-white hover:-translate-y-1 hover:shadow-2xl transition-all border"
              >
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold text-blue-700">{h.name}</h3>
                  <span className="text-sm text-gray-600">{h.distance}</span>
                </div>

                <p className="text-gray-700 mt-1">🏥 {h.type}</p>
                <p className="text-gray-600 mt-1">📍 {h.address}</p>

                <div className="flex gap-2 mt-3">
                  {h.badges.map((b, j) => (
                    <span
                      key={j}
                      className={`px-3 py-1 text-xs rounded-full ${b.color}`}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-xl shadow"
                    onClick={() => {
                      setActiveHospital(h);
                      setShowMap(true);
                    }}
                  >
                    View Map
                  </button>

                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-xl shadow"
                    onClick={() => shareOnWhatsApp(h)}
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-lg shadow ${
                page === 1
                  ? "bg-gray-200 text-gray-400"
                  : "bg-white text-blue-600"
              }`}
            >
              «
            </button>

            {(() => {
              let start = Math.max(1, page - 2);
              let end = Math.min(totalPages, start + 4);
              if (end - start < 4) start = Math.max(1, end - 4);

              const pages = [];
              for (let i = start; i <= end; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-4 py-2 rounded-lg shadow ${
                      page === i
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600"
                    }`}
                  >
                    {i}
                  </button>
                );
              }
              return pages;
            })()}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-4 py-2 rounded-lg shadow ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400"
                  : "bg-white text-blue-600"
              }`}
            >
              »
            </button>
          </div>

          {/* Map Drawer */}
          {showMap && activeHospital && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-50">
              <div className="bg-white w-full md:w-[60%] h-[70%] rounded-t-3xl p-4 relative">
                <button
                  className="absolute right-4 top-4 text-gray-600 text-xl"
                  onClick={() => setShowMap(false)}
                >
                  ✖
                </button>

                <h2 className="text-xl font-bold text-blue-700 mb-3">
                  {activeHospital.name}
                </h2>

                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="rounded-xl"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${activeHospital.lat},${activeHospital.lng}&z=16&output=embed`}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
