import { BrowserRouter, Routes, Route } from "react-router";

// importing global layout component
import Layout from "./Layout.tsx";

// importing pages/routes
import Index from "./pages/Index.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NotFound from "./NotFound.tsx";

// protected routes
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Write from "./pages/Write.tsx";
import Profile from "./pages/Profile.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import LoggedOutProtectedRoute from "./components/LoggedOutProtectedRoute.tsx";
import Settings from "./pages/Settings.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AllBlogs from "./pages/AllBlogs.tsx";
import StoicQuotePage from "./pages/StoicQuotePage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="stoic-quote" element={<StoicQuotePage />}/>
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
