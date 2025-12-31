import React, { useEffect, useState } from "react";

const GameWatchList = () => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetch("https://a10-backend-eight.vercel.app/watchList")
      .then((res) => res.json())
      .then((data) => setWatchList(data));
  }, []);

  const handelRemoveFromWatchList = (id) => {
    fetch(`https://a10-backend-eight.vercel.app/watchlist/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Removed from Watch List ❌");

        const remaining = watchList.filter((item) => item._id !== id);
        setWatchList(remaining);
      })
      .catch((error) => {
        console.error("Error deleting watchlist item:", error);
      });
  };
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        🎮 Game Watch List
      </h2>

      {watchList.length === 0 ? (
        <p className="text-center text-gray-500">Your watch list is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {watchList.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={item.imageUrl} alt={item.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>⭐ Rating: {item.rating}</p>
                <p>📅 Year: {item.publishingYear}</p>
              </div>
              <div>
                <button
                  onClick={() => handelRemoveFromWatchList(item._id)}
                  className="btn btn-primary"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameWatchList;
