import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaSignOutAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, login, logout } = useContext(AuthContext);
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "",
    age: "",
    heightCm: "",
    weightKg: "",
  });

  const [password, setPassword] = useState({
    current: "",
    newpass: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState({
    current: false,
    newpass: false,
    confirm: false,
  });

  const [imgMsg, setImgMsg] = useState("");
  const [imgErr, setImgErr] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        gender: user.gender || "",
        age: user.age || "",
        heightCm: user.heightCm || "",
        weightKg: user.weightKg || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePassword = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });

  // 📸 Upload profile photo
  const handleImageUpload = async (file) => {
    setImgMsg("");
    setImgErr("");

    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setImgErr("Image size must be less than 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const res = await axios.put("/api/user/upload-photo", formData, {
        withCredentials: true,
      });
      login(res.data.user);
      setImgMsg("Profile image updated successfully");
    } catch (err) {
      setImgErr(err.response?.data?.message || "Image upload failed");
    }
  };

  // 💾 Update profile
  const saveProfile = async () => {
    try {
      const res = await axios.put(
        "/api/user/update-profile",
        {
          gender: form.gender,
          age: form.age,
          heightCm: form.heightCm,
          weightKg: form.weightKg,
        },
        { withCredentials: true }
      );
      login(res.data.user);
      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Profile update failed");
    }
  };

  // 🔐 Change password
  const changePassword = async () => {
    if (password.newpass !== password.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(
        "/api/user/change-password",
        {
          currentPassword: password.current,
          newPassword: password.newpass,
        },
        { withCredentials: true }
      );
      setPassword({ current: "", newpass: "", confirm: "" });
      alert("Password changed successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  // 🚪 Sign out
  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8">
        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">My Profile</h1>

          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />

          <img
            src={
              user?.profilePhoto
                ? `http://localhost:5000${user.profilePhoto}`
                : "/user.png"
            }
            alt="Profile"
            onClick={() => fileRef.current.click()}
            className="w-32 h-32 rounded-full border shadow object-cover cursor-pointer hover:opacity-80"
          />

          {imgMsg && <p className="mt-2 text-green-600 text-sm">{imgMsg}</p>}
          {imgErr && <p className="mt-2 text-red-600 text-sm">{imgErr}</p>}
        </div>

        {/* PERSONAL INFO */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.username}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />
          <input
            value={form.email}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="heightCm"
            placeholder="Height (cm)"
            value={form.heightCm}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="weightKg"
            placeholder="Weight (kg)"
            value={form.weightKg}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        <button
          onClick={saveProfile}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Save Profile
        </button>

        {/* PASSWORD */}
        <h2 className="text-lg font-semibold text-gray-700 mt-10 mb-4">
          Change Password
        </h2>

        <div className="space-y-4">
          {["current", "newpass", "confirm"].map((field, idx) => (
            <div key={idx} className="relative">
              <input
                type={showPass[field] ? "text" : "password"}
                name={field}
                placeholder={
                  field === "current"
                    ? "Current Password"
                    : field === "newpass"
                    ? "New Password"
                    : "Confirm Password"
                }
                value={password[field]}
                onChange={handlePassword}
                className="w-full h-11 px-4 pr-12 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Eye Icon */}
              <span
                onClick={() =>
                  setShowPass({ ...showPass, [field]: !showPass[field] })
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showPass[field] ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={changePassword}
          className="mt-6 w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition"
        >
          Update Password
        </button>

        {/* SIGN OUT */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center gap-2 border border-red-500 text-red-600 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>
    </div>
  );
}
