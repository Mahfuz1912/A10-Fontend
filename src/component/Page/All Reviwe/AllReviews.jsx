import React from "react";
import ReviewsCard from "./ReviewsCard";
import { useLoaderData } from "react-router-dom";
const AllReviews = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">All Reviews Page</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-12">
        {data.map((review) => (
          <ReviewsCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
