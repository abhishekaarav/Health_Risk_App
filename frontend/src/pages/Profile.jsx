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
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePassword = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });

  const handleImageUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const res = await axios.put("/api/user/upload-photo", formData, {
        withCredentials: true,
      });
      login(res.data.user);
      setImgMsg("Profile image updated");
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/sign-in");
      } else {
        setImgErr("Image upload failed");
      }
    }
  };

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        "/api/user/update-profile",
        {
          username: form.username,
          age: form.age,
          gender: form.gender,
        },
        { withCredentials: true },
      );

      login(res.data.user);
      alert("Profile updated successfully");
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/sign-in");
      } else {
        alert("Profile update failed");
      }
    }
  };

  const changePassword = async () => {
    if (password.newpass !== password.confirm)
      return alert("Passwords do not match");

    try {
      await axios.put(
        "/api/user/change-password",
        {
          currentPassword: password.current,
          newPassword: password.newpass,
        },
        { withCredentials: true },
      );

      setPassword({ current: "", newpass: "", confirm: "" });
      alert("Password updated");
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/sign-in");
      } else {
        alert("Password change failed");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>

          <input
            hidden
            type="file"
            ref={fileRef}
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />

          {/* Avatar */}
          {user?.profilePhoto && !user.profilePhoto.includes("default") ? (
            <img
              src={`http://localhost:5000${user.profilePhoto}`}
              onClick={() => fileRef.current.click()}
              className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover cursor-pointer hover:scale-105 transition"
            />
          ) : (
            <div
              onClick={() => fileRef.current.click()}
              className="w-32 h-32 rounded-full border-4 border-indigo-500 flex items-center justify-center text-4xl font-bold text-indigo-600 bg-indigo-100 cursor-pointer hover:scale-105 transition"
            >
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}

          {imgMsg && <p className="text-green-600 mt-2 text-sm">{imgMsg}</p>}
          {imgErr && <p className="text-red-600 mt-2 text-sm">{imgErr}</p>}
        </div>

        {/* PERSONAL INFO */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-semibold text-sky-700 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />
            <input
              value={form.email}
              readOnly
              className="p-3 border rounded-lg bg-gray-100"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />
          </div>

          <button
            onClick={saveProfile}
            className="mt-8 w-full bg-sky-600 text-white py-3 rounded-xl"
          >
            Save Profile
          </button>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-emerald-700 mb-6">
            Change Password
          </h2>

          {[
            { key: "current", label: "Current Password" },
            { key: "newpass", label: "New Password" },
            { key: "confirm", label: "Confirm Password" },
          ].map(({ key, label }) => (
            <div key={key} className="relative mb-5">
              <input
                type={showPass[key] ? "text" : "password"}
                name={key}
                value={password[key]}
                onChange={handlePassword}
                placeholder={label}
                className="w-full p-3 pr-12 border rounded-lg"
              />

              <span
                onClick={() =>
                  setShowPass({ ...showPass, [key]: !showPass[key] })
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPass[key] ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          ))}

          <button
            onClick={changePassword}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl"
          >
            Update Password
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full border border-red-500 text-red-600 py-3 rounded-xl flex justify-center gap-2"
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </div>
  );
}
