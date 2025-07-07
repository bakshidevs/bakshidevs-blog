import { BrowserRouter, Routes, Route } from "react-router";

// importing global layout component
import Layout from "./Layout";

// importing pages/routes
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./NotFound";

// protected routes
import ProtectedRoute from "./components/ProtectedRoute";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import LoggedOutProtectedRoute from "./components/LoggedOutProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<LoggedOutProtectedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/write" element={<Write />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
