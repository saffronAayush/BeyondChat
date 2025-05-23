import ChattingSection from "./sections/ChattingSection.jsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import BlankChattingSection from "./components/BlankChattingSection.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/chat"} replace />,
  },
  {
    path: "/chat",
    element: <Home />,
    children: [
      {
        path: "",
        element: <BlankChattingSection />,
      },
      {
        path: ":chatId",
        element: <ChattingSection />,
      },
    ],
  },
  {
    path: "/*",
    element: <Navigate to={"/"} replace />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
