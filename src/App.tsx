import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import zustandStore from "./store/ZustandStore";
import { useEffect, useState } from "react";

function App() {
  const [shouldRender, setShouldRender] = useState(false);

  function hasExpired() {
    const sessionExpiryIn = zustandStore(state => state.userExpiryIn);
    if (sessionExpiryIn) {
      const currentEpoch = Date.now();
      setShouldRender(sessionExpiryIn < currentEpoch)
    }
    setShouldRender(false)
  }

  useEffect(() => {
    hasExpired()
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
