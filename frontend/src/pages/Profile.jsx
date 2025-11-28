import { useState } from "react";

export default function Profile() {
  const [form, setForm] = useState({
    name: "Abhishek Kumar",
    email: "abhishek@example.com",
    gender: "Male",
    age: 22,
    heightCm: 172,
    weightKg: 70,
  });

  const [password, setPassword] = useState({
    current: "",
    newpass: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    alert("Profile Updated Successfully!");
  };

  const changePassword = () => {
    if (password.newpass !== password.confirm) {
      alert("New Password and Confirm Password do not match!");
      return;
    }
    alert("Password Changed Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">My Profile</h1>

        {/* Profile Photo Centered */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/user.png"
            alt="Profile"
            className="w-24 h-24 rounded-full border shadow"
          />
          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow text-sm hover:bg-indigo-700">
            Change Photo
          </button>
        </div>

        {/* Personal Info */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Gender <span className="text-red-600">*</span>
            </label>
            <select
              name="gender"
              required
              value={form.gender}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Age <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="age"
              required
              value={form.age}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Height (cm) <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="heightCm"
              required
              value={form.heightCm}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Weight (kg) <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="weightKg"
              required
              value={form.weightKg}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={saveProfile}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700"
        >
          Save Profile
        </button>

        {/* Password Section */}
        <h2 className="text-lg font-semibold text-gray-700 mt-10 mb-2">
          Change Password
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 font-semibold">
              Current Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="current"
              required
              value={password.current}
              onChange={handlePassword}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">
              New Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="newpass"
              required
              value={password.newpass}
              onChange={handlePassword}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="confirm"
              required
              value={password.confirm}
              onChange={handlePassword}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={changePassword}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
