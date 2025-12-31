import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, handleLogout, updateUserProfile, loading } =
    useContext(authContext);

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user?.displayName || "");
  const [photoInput, setPhotoInput] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  // Keep local inputs in sync when the user object becomes available/changes
  useEffect(() => {
    setNameInput(user?.displayName || <p>Loading</p>);
    setPhotoInput(user?.photoURL || <p>Loading</p>);
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-blue-200">
          {/* Header Background */}
          <div className="h-32 bg-linear-to-r from-blue-600 via-blue-700 to-blue-800"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8 -mt-16 relative">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-blue-100 flex items-center justify-center">
                  {photoInput ? (
                    <img
                      src={photoInput}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl">👤</span>
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-blue-900 mb-2">
                {nameInput || user.displayName || "User"}
              </h2>
              <p className="text-lg text-blue-600 font-semibold mb-1">
                {user.email}
              </p>
              <p className="text-sm text-gray-500">
                Account Status:{" "}
                <span className="text-green-600 font-bold">Active</span>
              </p>
            </div>

            {/* Divider */}
            <div className="w-20 h-1 bg-linear-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"></div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Email Verified
                </p>
                <p className="text-lg font-bold text-blue-800">
                  {user.emailVerified ? "✓ Yes" : "✗ No"}
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Last Sign-In
                </p>

                <p className="text-lg font-bold text-blue-800">
                  {user?.metadata?.lastLoginAt
                    ? new Date(
                        Number(user.metadata.lastLoginAt)
                      ).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Action Buttons / Edit Form */}
            <div className="space-y-4">
              {!isEditing ? (
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 cursor-pointer  py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSaving(true);
                    try {
                      await updateUserProfile(nameInput, photoInput);
                      toast.success("Profile updated");
                      setIsEditing(false);
                    } catch (err) {
                      console.error(err);
                      toast.error(err.message || "Update failed");
                    } finally {
                      setSaving(false);
                    }
                  }}
                  className="grid grid-cols-1 gap-3"
                >
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Full name"
                    required
                  />
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                    placeholder="Photo URL"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 py-3 cursor-pointer  rounded-xl bg-linear-to-r from-green-500 to-green-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setNameInput(user?.displayName || "");
                        setPhotoInput(user?.photoURL || "");
                      }}
                      className="flex-1 cursor-pointer  py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleLogout}
                  className="flex-1 cursor-pointer py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
