import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Auth from "./features/auth/Auth";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { logOut, MeAsync } from "./features/auth/authSlice";
import Films from "./features/films/Films";

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const isLogIn =
    !!useAppSelector((state) => state.auth.user) &&
    !!localStorage.getItem("token");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(MeAsync());
    }
  }, [dispatch]);

  return (
    <div className="App">
      {modalOpen && <Auth onClose={() => setModalOpen(false)} />}
      <header className="navigation">
        <nav>
          <Link to="/">Home</Link>
          {isLogIn && <Link to="films">Films</Link>}
        </nav>
        <div>
          {isLogIn ? (
            <span onClick={() => dispatch(logOut())}>Log Out</span>
          ) : (
            <span onClick={() => setModalOpen(true)}>Log In</span>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<>Home</>} />
        {isLogIn && <Route path="films" element={<Films/>} />}
      </Routes>
    </div>
  );
}

export default App;
