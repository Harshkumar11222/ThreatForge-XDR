import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/landing/Home";
import Features from "../pages/landing/Features";
import Pricing from "../pages/landing/Pricing";
import About from "../pages/landing/About";
import Contact from "../pages/landing/Contact";
import Docs from "../pages/landing/Docs";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import Alerts from "../pages/dashboard/Alerts";
import Analytics from "../pages/dashboard/Analytics";
import Reports from "../pages/dashboard/Reports";
import Settings from "../pages/dashboard/Settings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/docs" element={<Docs />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}