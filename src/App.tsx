import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/root";
import { useEffect } from "react";
import { getAccessToken } from "./services/api/auth/auth.helper";
import useAppDispatch from "./hooks/useAppDispatch";
import { setUserData } from "./store/user/user.reducer";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setUserData)
    }
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
