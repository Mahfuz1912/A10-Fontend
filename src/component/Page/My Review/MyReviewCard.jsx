import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Optional: npm install react-icons
import { NavLink } from "react-router-dom";

const MyReviewCard = ({ review, index, onDelete }) => {
  const { title, genre, publishingYear, rating, imageUrl, _id } = review;

  const handleDelete = (id) => {
    // Removed confirm prompt; show a single alert on successful deletion only
    fetch(`https://a10-backend-eight.vercel.app/deleteReview/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.deletedCount > 0 || data.ok || data.success)) {
          // Inform parent to remove item from UI
          if (typeof onDelete === "function") onDelete(id);
          alert("Review deleted successfully!");
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        // keep only one alert (success); log errors for debugging
      });
  };

  return (
    <tr className="hover:bg-white/5 transition-colors group">
      {/* Serial Number */}
      <td className="p-5 font-mono text-gray-500">{index + 1}</td>

      {/* Game Image & Title */}
      <td>
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16 shadow-lg border border-white/10">
              <img src={imageUrl} alt={title} className="object-cover" />
            </div>
          </div>
          <div>
            <div className="font-bold text-lg group-hover:text-purple-400 transition-colors">
              {title}
            </div>
            <div className="text-xs opacity-50 px-2 py-0.5 rounded-full bg-base-300 w-fit">
              {genre}
            </div>
          </div>
        </div>
      </td>

      {/* Year & Details */}
      <td>
        <span className="text-sm text-gray-400">Published:</span>
        <span className="ml-2 font-medium">{publishingYear}</span>
      </td>

      {/* Rating */}
      <td className="hidden md:table-cell">
        <div className="flex items-center gap-2">
          <div
            className="radial-progress text-purple-500 text-[10px]"
            style={{ "--value": rating * 10, "--size": "2.5rem" }}
          >
            {rating}/10
          </div>
        </div>
      </td>

      {/* Actions */}
      <td className="p-5">
        <div className="flex justify-end gap-3">
          <button
            className="btn btn-sm btn-ghost bg-blue-500/10 hover:bg-blue-500 hover:text-white border-blue-500/20"
            title="Edit Review"
          >
            <NavLink to={`/updateReview/${_id}`}>
              <FaEdit size={16} />
              <span className="hidden lg:inline">Update</span>
            </NavLink>
          </button>

          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm btn-ghost bg-red-500/10 hover:bg-red-500 hover:text-white border-red-500/20"
            title="Delete Review"
          >
            <FaTrashAlt size={16} />
            <span className="hidden lg:inline">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyReviewCard;
