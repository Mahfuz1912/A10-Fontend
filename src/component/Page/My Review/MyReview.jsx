import React, { useContext, useEffect, useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "../../AuthProvider/AuthProvider";
import MyReviewCard from "./MyReviewCard";

const MyReview = () => {
  const data = useLoaderData();
  // Ensure data is always an array
  const normalizedData = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  );
  const { user, loading } = useContext(authContext);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    if (!Array.isArray(normalizedData) || !user) return;
    const filtered = normalizedData.filter(
      (review) => review.reviewerEmail === user.email
    );
    setTimeout(() => setMyReviews(filtered), 0);
  }, [normalizedData, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg text-secondary"></span>
      </div>
    );
  }

  if (!user || !user.email) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">
          Please login to see your reviews.
        </h2>
      </div>
    );
  }

  return (
    <div className="review-container p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
          My Reviews
        </h2>
        <p className="text-gray-400 mt-2">
          Manage all your game reviews in one place.
        </p>
        <div className="badge badge-outline badge-secondary mt-4 px-4 py-3">
          Total: {Array.isArray(myReviews) ? myReviews.length : 0}
        </div>
      </div>

      <div className="bg-base-200/50 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {Array.isArray(myReviews) && myReviews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-300/50">
                <tr className="text-gray-300 text-sm uppercase tracking-wider border-b border-white/10">
                  <th className="p-5">#</th>
                  <th>Game</th>
                  <th>Review Details</th>
                  <th className="hidden md:table-cell">Rating</th>
                  <th className="text-right p-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {myReviews.map((myReview, idx) => (
                  <MyReviewCard
                    key={myReview._id}
                    review={myReview}
                    index={idx}
                    onDelete={(id) =>
                      setMyReviews((prev) => prev.filter((r) => r._id !== id))
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="text-6xl mb-4">✍️</div>
            <p className="text-gray-400 text-xl font-medium">
              You haven't posted any reviews yet for {user.email}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReview;
