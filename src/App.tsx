import { BrowserRouter, Routes, Route } from "react-router"

// importing global layout component
import Layout from "./Layout"

// importing pages/routes
import Index from "./pages/Index"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
