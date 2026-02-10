import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);
    setEditData({
      name: currentUser.name,
      email: currentUser.email,
    });

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleEditToggle = () => {
    if (isEditing && user) {
      setEditData({
        name: user.name,
        email: user.email,
      });
    }

    setIsEditing(!isEditing);
    setMessage("");
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!editData.name.trim() || !editData.email.trim()) {
      setMessage("❌ Name and Email are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.find(
      (u) => u.email === editData.email && u.email !== user.email
    );

    if (emailExists) {
      setMessage("❌ Email already exists");
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const updatedUsers = users.map((u) =>
        u.email === user.email
          ? { ...u, name: editData.name, email: editData.email }
          : u
      );

      const updatedUser = {
        ...user,
        name: editData.name,
        email: editData.email,
      };

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setUser(updatedUser);
      setIsEditing(false);
      setSaving(false);

      setMessage("✅ Profile updated successfully!");
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <div className="flex justify-center mb-4">
          <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold mb-6">
          My Profile
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-center text-sm ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {!isEditing ? (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={handleEditToggle}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (

          <form onSubmit={handleUpdate} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={editData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={editData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />

            <div className="space-y-3">
              <button
                type="submit"
                disabled={saving}
                className={`w-full py-2 rounded text-white transition ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={handleEditToggle}
                className="w-full border py-2 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;