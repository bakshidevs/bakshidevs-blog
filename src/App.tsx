import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import useThemeStore from "./store/themeStore";

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
import ContactPage from "./pages/ContactPage.tsx";
import PostedBlogs from "./pages/profile/PostedBlogs.tsx";
import DraftBlogs from "./pages/profile/DraftBlogs.tsx";
import AdminOnly from "./components/AdminOnly.tsx";
import SavedBlogs from "./pages/profile/SavedBlogs.tsx";

export default function App() {
  const { isDarkModeEnabled } = useThemeStore();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="stoic-quote" element={<StoicQuotePage />} />
          <Route path="blogs" element={<AllBlogs />} />
          <Route path="blog/:slug" element={<BlogPage />} />
          <Route element={<LoggedOutProtectedRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignupPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="edit/:slug" element={<Write />} />
            <Route path="profile" element={<Profile />}>
              {/* admin only routes */}
              <Route element={<AdminOnly />}>
                <Route path="posted" element={<PostedBlogs />} />
                <Route path="drafts" element={<DraftBlogs />} />
              </Route>
              <Route path="saved" element={<SavedBlogs />} />
            </Route>
            <Route path="settings" element={<Settings />} />
            <Route element={<AdminOnly />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="write" element={<Write />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkModeEnabled ? "dark" : "light"}
      />
    </BrowserRouter>
  )
}