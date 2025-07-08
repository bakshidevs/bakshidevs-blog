import { BrowserRouter, Routes, Route } from "react-router";

// importing global layout component
import Layout from "./Layout";

// importing pages/routes
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import NotFound from "./NotFound";

// protected routes
import ProtectedRoute from "./components/ProtectedRoute";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import SignupPage from "./pages/SignupPage";
import LoggedOutProtectedRoute from "./components/LoggedOutProtectedRoute";
import Settings from "./pages/Settings";
import BlogPage from "./pages/BlogPage";
import Dashboard from "./pages/Dashboard";
import AllBlogs from "./pages/AllBlogs";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route element={<LoggedOutProtectedRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/write" element={<Write />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
