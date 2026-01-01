import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { 
  FaUserEdit, 
  FaSignOutAlt, 
  FaEnvelope, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaCalendarAlt, 
  FaGamepad, 
  FaSave, 
  FaTimes,
  FaCamera,
  FaUser,
  FaShieldAlt,
  FaChartLine
} from "react-icons/fa";

const Profile = () => {
  const { user, handleLogout, updateUserProfile, loading } = useContext(authContext);
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [photoInput, setPhotoInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({
    reviewsCount: 0,
    avgRating: 0,
    watchlistCount: 0,
    joinedDate: ""
  });

  // Initialize inputs when user data loads
  useEffect(() => {
    if (user) {
      setNameInput(user?.displayName || "");
      setPhotoInput(user?.photoURL || "");
      
      // Mock stats (replace with actual API calls)
      setStats({
        reviewsCount: 12,
        avgRating: 8.4,
        watchlistCount: 7,
        joinedDate: user?.metadata?.creationTime ? 
          new Date(user.metadata.creationTime).toLocaleDateString() : 
          "N/A"
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      toast.error("Please enter a valid name");
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile(nameInput, photoInput || "");
      toast.success("🎉 Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const formatLastLogin = () => {
    if (!user?.metadata?.lastLoginAt) return "N/A";
    const date = new Date(Number(user.metadata.lastLoginAt));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600/20 to-pink-600/20 px-6 py-3 rounded-full mb-6">
            <FaGamepad className="text-amber-400 text-xl" />
            <span className="text-lg font-medium text-amber-200">Gamer Profile</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome{" "}
            <span className="bg-linear-to-r from-amber-300 via-white to-purple-300 bg-clip-text text-transparent">
              {user?.displayName?.split(' ')[0] || 'Gamer'}
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Manage your profile, track your gaming activity, and customize your experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Profile Header */}
              <div className="relative h-48 bg-linear-to-r from-purple-900/50 to-pink-900/50">
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent"></div>
                
                {/* Avatar Section */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-slate-800 shadow-2xl overflow-hidden bg-linear-to-br from-purple-600 to-pink-600">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=8b5cf6&color=fff`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaUser className="text-4xl text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Camera Button */}
                    {isEditing && (
                      <label className="absolute bottom-2 right-2 p-2 bg-slate-900/80 border border-slate-700 rounded-full cursor-pointer hover:bg-slate-800 transition-colors">
                        <FaCamera className="text-white" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            // Handle file upload here
                            const file = e.target.files[0];
                            if (file) {
                              // Create a local URL for preview
                              const url = URL.createObjectURL(file);
                              setPhotoInput(url);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-20 px-8 pb-8">
                {/* Name and Edit Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 text-white w-full"
                          placeholder="Enter your name"
                        />
                      ) : (
                        user?.displayName || "Anonymous Gamer"
                      )}
                    </h2>
                    <div className="flex items-center gap-2 text-slate-300">
                      <FaEnvelope className="text-slate-400" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                  
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                    >
                      <FaUserEdit />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleProfileUpdate}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
                      >
                        <FaSave />
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setNameInput(user?.displayName || "");
                          setPhotoInput(user?.photoURL || "");
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Photo URL Input (for editing) */}
                {isEditing && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Profile Photo URL
                    </label>
                    <input
                      type="url"
                      value={photoInput}
                      onChange={(e) => setPhotoInput(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      Enter a valid image URL or upload a photo
                    </p>
                  </div>
                )}

                {/* Account Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-600/20 rounded-lg">
                        <FaCheckCircle className="text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Email Verification</div>
                        <div className={`text-lg font-semibold ${user.emailVerified ? 'text-green-400' : 'text-amber-400'}`}>
                          {user.emailVerified ? "Verified" : "Not Verified"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-600/20 rounded-lg">
                        <FaCalendarAlt className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Last Login</div>
                        <div className="text-lg font-semibold text-white">
                          {formatLastLogin()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-linear-to-r from-red-600/20 to-red-900/20 hover:from-red-600/30 hover:to-red-900/30 border border-red-700/50 text-red-400 hover:text-red-300 rounded-xl font-semibold transition-all duration-300 hover:border-red-600/50"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Gaming Stats */}
            <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaChartLine className="text-purple-400" />
                Gamer Stats
              </h3>
              
              <div className="space-y-4">
                {/* <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                  <div className="text-slate-300">Reviews Posted</div>
                  <div className="text-2xl font-bold text-white">{stats.reviewsCount}</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                  <div className="text-slate-300">Avg. Rating</div>
                  <div className="text-2xl font-bold text-amber-400">{stats.avgRating}</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                  <div className="text-slate-300">Watchlist Items</div>
                  <div className="text-2xl font-bold text-purple-400">{stats.watchlistCount}</div>
                </div> */}
                
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                  <div className="text-slate-300">Member Since</div>
                  <div className="text-lg font-semibold text-blue-400">{stats.joinedDate}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;