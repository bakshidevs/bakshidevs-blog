import { BrowserRouter, Routes, Route } from "react-router"

// importing global layout component
import Layout from "./Layout"

// importing pages/routes
import Index from "./pages/Index"
import Login from "./pages/Login"
import NotFound from "./NotFound"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
