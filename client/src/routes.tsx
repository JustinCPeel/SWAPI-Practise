import { createBrowserRouter } from "react-router-dom";
import { CharacterSelection, Home } from "./pages";

export const Routes = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Home /> },
      {
        path: "comparisons",
        element: <CharacterSelection />,
      },
    ],
  },
]);
