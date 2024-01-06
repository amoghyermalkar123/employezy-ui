import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import zustandStore from "./store/ZustandStore";
import { useEffect, useState } from "react";
import PrivateRoutes from "./utils/ProtectedRoutes";
import DiscoverPage from "./components/Discover";
import CodeEditorPage from "./pages/CodeEditorPage";
import AdminDash from "./pages/admin/AdminDash";
import ManageJobsPage from "./pages/admin/ManageApplicants";
import LandingPage from "./pages/LandingPage";
import ManageJobPage from "./pages/admin/ManageJobPage";

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
          <Route
            path="/home/discover"
            element={<DiscoverPage searchTerm="" />}
          />
          <Route path="/home/code" element={<CodeEditorPage />} />
          <Route path="/admin/manage" element={<ManageJobsPage />} />
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/admin/managejobs" element={<ManageJobPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
