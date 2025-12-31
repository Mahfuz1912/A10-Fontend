import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const UpdateReview = () => {
  const data = useLoaderData();
  const { title, genre, publishingYear, rating, imageUrl, review } = data;
  const { id } = useParams();

  const navigate = useNavigate();
  const [updatedImageUrl, setUpdatedImageUrl] = useState(imageUrl);
  const [updatedRating, setUpdatedRating] = useState(rating);
  const [updatedReviewText, setUpdatedReviewText] = useState(review);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      imageUrl: updatedImageUrl,
      rating: updatedRating,
      review: updatedReviewText,
    };

    fetch(`https://a10-backend-eight.vercel.app/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Review updated successfully!");
          navigate("/myreviews");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Update Your Review</h2>
          <p className="text-blue-100 text-sm mt-1">Refine your thoughts on "{title}"</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Read Only Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</label>
              <input type="text" value={title} readOnly className="mt-1 block w-full bg-transparent border-none p-0 text-gray-800 font-medium focus:ring-0 cursor-default" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Genre & Year</label>
              <p className="mt-1 text-gray-800 font-medium">{genre} • {publishingYear}</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Editable Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={updatedImageUrl}
                onChange={(e) => setUpdatedImageUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={updatedRating}
                onChange={(e) => setUpdatedRating(e.target.value)}
                className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
              <textarea
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="What did you think about this?"
                value={updatedReviewText}
                onChange={(e) => setUpdatedReviewText(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transform active:scale-95 transition-all shadow-md"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/myreviews")}
              className="px-6 py-3 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateReview;