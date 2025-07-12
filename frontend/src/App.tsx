import React, { useState } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import AddItemPage from "./components/AddItemPage";
import BrowsePage from "./components/BrowsePage";
import AdminPanel from "./components/AdminPanel";
import ItemDetailPage from "./components/ItemDetailPage";
import ProductDetailPage from "./components/ProductDetailPage";
import NotFound from "./pages/NotFound";
import SwapPage from "./components/SwapPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const navigate = useNavigate();

  const handleLogin = (adminStatus = false) => {
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
    navigate("/");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  const handleNavigation = (page: string, item?: any) => {
    // Map page names to routes
    let path = "/";
    switch (page) {
      case "login":
        path = "/login";
        break;
      case "register":
        path = "/register";
        break;
      case "dashboard":
        path = "/dashboard";
        break;
      case "add-item":
        path = "/add-item";
        break;
      case "browse":
        path = "/browse";
        break;
      case "admin":
        path = "/admin";
        break;
      case "item-detail":
        path = "/item-detail";
        break;
      case "product-detail":
        path = "/product-detail";
        break;
      case "swap":
        path = "/swap";
        break;
      default:
        path = "/";
    }
    if (item) setSelectedItem(item);
    navigate(path);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onNavigate={handleNavigation} onLogout={handleLogout} isAdmin={isAdmin} isAuthenticated={isAuthenticated} />} />
      <Route path="/login" element={<LoginPage onNavigate={handleNavigation} onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onNavigate={handleNavigation} />} />
      <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigation} onLogout={handleLogout} />} />
      <Route path="/add-item" element={<AddItemPage onNavigate={handleNavigation} onLogout={handleLogout} />} />
      <Route path="/browse" element={<BrowsePage onNavigate={handleNavigation} onLogout={handleLogout} />} />
      <Route path="/admin" element={<AdminPanel onNavigate={handleNavigation} onLogout={handleLogout} />} />
      <Route path="/item-detail" element={<ItemDetailPage item={selectedItem} onNavigate={handleNavigation} onLogout={handleLogout} />} />
      <Route path="/product-detail" element={<ProductDetailPage item={selectedItem} onNavigate={handleNavigation} onLogout={handleLogout} />} />
      <Route path="/swap" element={<SwapPage onNavigate={handleNavigation} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;