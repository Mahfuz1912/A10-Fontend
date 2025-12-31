import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Login/Login";
import Register from "../Register/Regester";
import Profile from "../Profile/Profile";
import Home from "../Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import Contact from "../Contact/Contact";
import GameWatchList from "../Page/Game Watch List/GameWatchList";
import AddReview from "../Page/Add Review/AddReview";
import MyReview from "../Page/My Review/MyReview";
import AllReviews from "../Page/All Reviwe/AllReviews";
import ReviewDetails from "../Review Details/ReviewDetails";
import PrivateRoute from "../privateRoute/PrivateRoute";
import UpdateReview from "../UpdateReview/UpdateReview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => {
          return fetch("https://a10-backend-eight.vercel.app/reviews");
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/addreview",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/myreviews",
        element: <MyReview />,
        loader: () => fetch("https://a10-backend-eight.vercel.app/reviews"),
      },
      {
        path: "/watchlist",
        element: <GameWatchList />,
      },
      {
        path: "/allreviews",
        element: <AllReviews />,
        loader: () => fetch("https://a10-backend-eight.vercel.app/reviews"),
      },
      {
        path: "/reviewdetails/:id",
        element: <ReviewDetails />,
        loader: async ({ params }) => {
          const DetailsData = await fetch(
            `https://a10-backend-eight.vercel.app/reviews`
          );
          const data = await DetailsData.json();
          const singleDetails = data.find((detail) => detail._id == params.id);
          return singleDetails;
        },
      },
      {
        path: "/updateReview/:id",
        element: (
          <PrivateRoute>
            <UpdateReview />
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          return fetch(
            `https://a10-backend-eight.vercel.app/reviews/${params.id}`
          );
        },
      },
    ],
  },
]);
