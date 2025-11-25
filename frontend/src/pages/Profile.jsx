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

        {/* Profile Photo */}
        <div className="flex items-center mb-6">
          <img
            src="/user.png"
            alt="Profile"
            className="w-20 h-20 rounded-full border shadow"
          />
          <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow text-sm">
            Change Photo
          </button>
        </div>

        {/* Personal Info */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <select
              name="gender"
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
            <label className="text-sm text-gray-600">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Height (cm)</label>
            <input
              type="number"
              name="heightCm"
              value={form.heightCm}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Weight (kg)</label>
            <input
              type="number"
              name="weightKg"
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
            <label className="text-sm text-gray-600">Current Password</label>
            <input
              type="password"
              name="current"
              value={password.current}
              onChange={handlePassword}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <input
              type="password"
              name="newpass"
              value={password.newpass}
              onChange={handlePassword}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirm"
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
