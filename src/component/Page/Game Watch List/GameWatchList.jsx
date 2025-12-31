import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FaTrash,
  FaStar,
  FaCalendarAlt,
  FaImage,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import { authContext } from "../../AuthProvider/AuthProvider";

const GameWatchList = () => {
  const { user, loading } = useContext(authContext);
  const [watchList, setWatchList] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      setFetchLoading(true);
      return;
    }

    if (!user || !user.email) {
      setWatchList([]);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setFetchLoading(true);
    setError(null);

    fetch(
      `https://a10-backend-eight.vercel.app/watchList?email=${encodeURIComponent(
        user.email
      )}`,
      {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${res.status}`
          );
        }
        return res.json();
      })
      .then((data) => {
        setWatchList(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;

        const errorMessage = err.message || "Failed to load watch list";
        setError(errorMessage);

        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      })
      .finally(() => {
        setFetchLoading(false);
      });

    return () => controller.abort();
  }, [user, user?.email, loading]);

  const handleRemoveFromWatchList = (id, title) => {
    Swal.fire({
      title: "Remove from Watch List?",
      html: `<p>Are you sure you want to remove <strong>"${title}"</strong> from your watch list?</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (!result.isConfirmed) return;

      setDeletingId(id);

      fetch(`https://a10-backend-eight.vercel.app/watchList/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
              errorData.message || `HTTP error! status: ${res.status}`
            );
          }
          return res.json();
        })
        .then(() => {
          const remaining = watchList.filter((item) => item._id !== id);
          setWatchList(remaining);

          Swal.fire({
            title: "Removed!",
            text: `"${title}" has been removed from your watch list.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            timer: 2000,
            timerProgressBar: true,
          });
        })
        .catch((error) => {
          console.error("Error deleting watchlist item:", error);

          Swal.fire({
            title: "Error",
            text: error.message || "Failed to remove item. Please try again.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        })
        .finally(() => setDeletingId(null));
    });
  };

  // Loading state
  if (loading || fetchLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
          <p className="text-lg text-gray-600">Loading your watch list...</p>
        </div>
      </div>
    );
  }

  // No user logged in
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-yellow-400 mr-2" />
            <p className="text-yellow-700">
              Please log in to view your watch list.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          🎮 Game Watch List
        </h2>
        <p className="text-gray-600">
          Manage the games you want to watch or play later.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {watchList.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your watch list is empty
            </h3>
            <p className="text-gray-500 mb-4">
              Start adding games to your watch list to see them here!
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Game
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {watchList.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          {item.imageUrl ? (
                            <img
                              className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                              src={item.imageUrl}
                              alt={item.title}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/64?text=No+Image";
                                e.target.onerror = null;
                              }}
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                              <FaImage className="text-gray-400 text-xl" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.title || "Untitled Game"}
                          </div>
                          {item.genre && (
                            <div className="text-sm text-gray-500">
                              {item.genre}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          {item.rating ? item.rating.toFixed(1) : "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {item.publishingYear || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() =>
                          handleRemoveFromWatchList(item._id, item.title)
                        }
                        disabled={deletingId === item._id}
                        className={`
                          inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200
                          ${
                            deletingId === item._id
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                          }
                        `}
                        aria-label={`Remove ${item.title} from watch list`}
                      >
                        {deletingId === item._id ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Removing...
                          </>
                        ) : (
                          <>
                            <FaTrash className="mr-2" />
                            Remove
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">{watchList.length}</span>{" "}
                game(s) in your watch list
              </div>
              <div className="text-sm text-gray-600">
                Total games:{" "}
                <span className="font-semibold">{watchList.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameWatchList;
