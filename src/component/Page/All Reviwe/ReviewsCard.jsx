import React from "react";
import { Link } from "react-router-dom";

const ReviewsCard = ({ review }) => {
  const { imageUrl, title, rating } = review;

  return (
    <div>
      <div className="card bg-base-200 w-max-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            className="rounded-xl h-[300px] w-full object-cover"
            src={imageUrl}
            alt={title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title pl-4">
            {title}
            <div className="badge badge-secondary">{rating}</div>
          </h2>
          <div className="card-actions justify-center mt-4 px-4">
            <Link
              to={`/reviewdetails/${review._id}`}
              className="btn btn-primary btn-block text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
