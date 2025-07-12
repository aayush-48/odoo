import React from "react";
import { useState, useEffect } from "react";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import LandingPage from "../components/LandingPage";
import Dashboard from "../components/Dashboard";
import AddItemPage from "../components/AddItemPage";
import ItemDetailPage from "../components/ItemDetailPage";
import ProductDetailPage from "../components/ProductDetailPage";
import BrowsePage from "../components/BrowsePage";
import AdminPanel from "../components/AdminPanel";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthenticated(true);
      // Optionally decode JWT to check admin, or store admin flag in localStorage
      // For now, assume admin if a flag is set
      const adminFlag = localStorage.getItem("isAdmin");
      setIsAdmin(adminFlag === "true");
    }
  }, []);

  const navigateTo = (page: string, item?: any) => {
    console.log('navigateTo called:', page, item);
    setCurrentPage(page);
    if (item) setSelectedItem(item);
  };

  const handleLogin = (isAdminUser = false) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);
    localStorage.setItem("isAdmin", isAdminUser ? "true" : "false");
    setCurrentPage(isAdminUser ? "admin" : "landing");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("isAdmin");
    setCurrentPage("login");
  };

  if (!isAuthenticated) {
    if (currentPage === "register") {
      return <RegisterPage onNavigate={navigateTo} />;
    }
    if (currentPage === "login") {
      return <LoginPage onNavigate={navigateTo} onLogin={handleLogin} />;
    }
    // Show landing page with login/register buttons if not authenticated
    return <LandingPage onNavigate={navigateTo} isAuthenticated={false} />;
  }

  switch (currentPage) {
    case "landing":
      return <LandingPage onNavigate={navigateTo} onLogout={handleLogout} isAdmin={isAdmin} isAuthenticated={isAuthenticated} />;
    case "dashboard":
      return <Dashboard onNavigate={navigateTo} onLogout={handleLogout} />;
    case "add-item":
      return <AddItemPage onNavigate={navigateTo} onLogout={handleLogout} />;
    case "item-detail":
      return <ItemDetailPage item={selectedItem} onNavigate={navigateTo} onLogout={handleLogout} />;
    case "product-detail":
      return <ProductDetailPage item={selectedItem} onNavigate={navigateTo} onLogout={handleLogout} />;
    case "browse":
      return <BrowsePage onNavigate={navigateTo} onLogout={handleLogout} />;
    case "admin":
      return isAdmin ? <AdminPanel onNavigate={navigateTo} onLogout={handleLogout} /> : <LandingPage onNavigate={navigateTo} onLogout={handleLogout} isAdmin={isAdmin} />;
    default:
      return <LandingPage onNavigate={navigateTo} onLogout={handleLogout} isAdmin={isAdmin} isAuthenticated={isAuthenticated} />;
  }
};

export default Index;
