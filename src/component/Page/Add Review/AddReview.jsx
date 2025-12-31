import React, { useContext, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import {
  FaGamepad,
  FaStar,
  FaCalendarAlt,
  FaImage,
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaLightbulb,
} from "react-icons/fa";
import Swal from "sweetalert2";

const AddReview = () => {
  const { user } = useContext(authContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [preview, setPreview] = useState({
    title: "",
    imageUrl: "",
    review: "",
    genre: "",
    publishingYear: "",
  });

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please log in to submit a review.",
        icon: "warning",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    setIsSubmitting(true);
    const form = e.target;

    const reviewData = {
      title: form.title.value,
      imageUrl: form.imageUrl.value,
      review: form.review.value,
      rating: rating,
      publishingYear: parseInt(form.publishingYear.value),
      genre: form.genre.value,
      reviewerName: user?.displayName || "Anonymous",
      reviewerEmail: user?.email,
      reviewerPhoto: user?.photoURL || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://a10-backend-eight.vercel.app/addReview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Your review has been submitted successfully!",
          icon: "success",
          confirmButtonColor: "#8b5cf6",
          confirmButtonText: "Awesome!",
          timer: 2000,
          timerProgressBar: true,
        });
        form.reset();
        setRating(5);
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Failed to submit review. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Network Error",
        text: "Unable to connect to server. Please check your connection.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const genres = [
    {
      value: "action",
      label: "🎯 Action",
      color: "from-red-500 to-orange-500",
    },
    { value: "rpg", label: "⚔️ RPG", color: "from-blue-500 to-purple-500" },
    {
      value: "adventure",
      label: "🗺️ Adventure",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "strategy",
      label: "♟️ Strategy",
      color: "from-yellow-500 to-amber-500",
    },
    { value: "sports", label: "🏀 Sports", color: "from-cyan-500 to-blue-500" },
    { value: "racing", label: "🏎️ Racing", color: "from-pink-500 to-rose-500" },
    { value: "horror", label: "👻 Horror", color: "from-gray-700 to-gray-900" },
    {
      value: "indie",
      label: "🎨 Indie",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-600/20 to-amber-500/20 rounded-2xl mb-6">
            <FaGamepad className="text-5xl text-white/80" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            Share Your Game Experience
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Your review helps fellow gamers discover amazing titles and make
            better choices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                  <FaPaperPlane className="text-xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Review Form</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Game Title & Image URL */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300">
                      Game Title <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="title"
                        placeholder="Cyberpunk 2077"
                        className="w-full px-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300">
                      Game Image URL <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <FaImage />
                      </div>
                      <input
                        type="url"
                        name="imageUrl"
                        placeholder="https://example.com/game-image.jpg"
                        onChange={(e) =>
                          setPreview((p) => ({
                            ...p,
                            imageUrl: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">
                    Your Review <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="review"
                    placeholder="Share your experience with this game. What did you love? What could be improved? Would you recommend it to others?"
                    onChange={(e) =>
                      setPreview((p) => ({ ...p, review: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all min-h-[150px] resize-none"
                    required
                  ></textarea>
                </div>

                {/* Rating Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">
                    Rating <span className="text-red-400">*</span>
                  </label>
                  <div className="bg-slate-800/50 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-amber-400">
                        {rating}.0
                      </div>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleRatingClick(i + 1)}
                            className={`p-2 rounded-lg transition-all ${
                              i < rating
                                ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                                : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                            }`}
                          >
                            <FaStar />
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="range"
                      name="rating"
                      min="1"
                      max="10"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-linear-to-r [&::-webkit-slider-thumb]:from-amber-500 [&::-webkit-slider-thumb]:to-orange-500"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                      <span>Poor</span>
                      <span>Average</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>

                {/* Year & Genre */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300">
                      Publishing Year <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <FaCalendarAlt />
                      </div>
                      <input
                        type="number"
                        name="publishingYear"
                        min="1950"
                        max={new Date().getFullYear()}
                        placeholder="2023"
                        onChange={(e) =>
                          setPreview((p) => ({
                            ...p,
                            publishingYear: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300">
                      Genre <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="genre"
                      onChange={(e) =>
                        setPreview((p) => ({ ...p, genre: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all appearance-none"
                      required
                    >
                      <option value="" className="text-slate-400">
                        Select a genre
                      </option>
                      {genres.map((genre) => (
                        <option
                          key={genre.value}
                          value={genre.value}
                          className="text-white"
                        >
                          {genre.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* User Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        value={user?.displayName || "Anonymous"}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-slate-300 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300">
                      Your Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        value={user?.email || "Not logged in"}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-slate-300 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !user}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isSubmitting || !user
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-0.5"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <FaPaperPlane />
                        {user ? "Submit Review" : "Please Log In"}
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Tips & Preview */}
          <div className="space-y-6">
            {/* Tips Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <FaLightbulb className="text-xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Review Tips</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Be specific about what you liked or disliked",
                  "Mention game mechanics, story, graphics, and sound",
                  "Compare with similar games if possible",
                  "Keep it honest and constructive",
                  "Consider performance, replay value, and price",
                  "Add spoiler warnings if discussing story details",
                ].map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 shrink-0"></div>
                    <span className="text-slate-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <FaStar className="text-xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Preview</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">Your Rating</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.floor(rating / 2)
                            ? "text-amber-400"
                            : "text-slate-600"
                        }
                      />
                    ))}
                    <span className="text-white ml-2">{rating}/10</span>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl flex items-center justify-center overflow-hidden">
                  {preview.imageUrl ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      src={preview.imageUrl}
                      alt="game preview"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                  ) : (
                    <div className="text-center text-slate-400 px-4">
                      <FaImage className="text-3xl mx-auto mb-2" />
                      <div className="text-sm">Game image preview</div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-lg font-semibold text-white">
                    {preview.title || "Game Title Preview"}
                  </div>
                  <div className="text-sm text-slate-400 mt-1 line-clamp-3">
                    {preview.review
                      ? preview.review
                      : user
                      ? "Write a short review to see a preview."
                      : "Preview will appear here."}
                  </div>
                  <div className="text-sm text-slate-400 mt-2">
                    {preview.genre && (
                      <span className="mr-3">Genre: {preview.genre}</span>
                    )}
                    {preview.publishingYear && (
                      <span>Year: {preview.publishingYear}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* User Info Card */}
            {user && (
              <div className="bg-gradient-to-br from-gray-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
                    {user.photoURL ? (
                      // eslint-disable-next-line jsx-a11y/img-redundant-alt
                      <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-slate-300" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {user.displayName || "Anonymous"}
                    </div>
                    <div className="text-sm text-slate-400 flex items-center gap-1">
                      <FaEnvelope className="text-xs" />
                      {user.email || "No email provided"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
