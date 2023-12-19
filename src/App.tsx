import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import zustandStore from "./store/ZustandStore";
import { useEffect, useState } from "react";
import PrivateRoutes from "./utils/ProtectedRoutes";
import DiscoverPage from "./components/Discover";
import CodeEditorPage from "./pages/CodeEditorPage";

function App() {
  const [shouldRender, setShouldRender] = useState(false);
  const sessionExpiryIn = zustandStore(state => state.userExpiryIn);

  function hasExpired() {
    if (sessionExpiryIn) {
      const currentEpoch = Date.now();
      setShouldRender(sessionExpiryIn < currentEpoch);
    }
    setShouldRender(false);
  }

  useEffect(() => {
    hasExpired();
  });

  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route element={<PrivateRoutes isValid={shouldRender} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/discover" element={<DiscoverPage />} />
          <Route path="/home/code" element={<CodeEditorPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
