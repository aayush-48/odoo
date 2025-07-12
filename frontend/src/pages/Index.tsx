import React from "react";
import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigateTo = (page: string, item?: any) => {
    setCurrentPage(page);
    if (item) setSelectedItem(item);
  };

  const handleLogin = (isAdminUser = false) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);
    setCurrentPage(isAdminUser ? "admin" : "landing");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentPage("login");
  };

  if (!isAuthenticated) {
    if (currentPage === "register") {
      return <RegisterPage onNavigate={navigateTo} />;
    }
    return <LoginPage onNavigate={navigateTo} onLogin={handleLogin} />;
  }

  switch (currentPage) {
    case "landing":
      return <LandingPage onNavigate={navigateTo} onLogout={handleLogout} isAdmin={isAdmin} />;
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
      return <LandingPage onNavigate={navigateTo} onLogout={handleLogout} isAdmin={isAdmin} />;
  }
};

export default Index;
