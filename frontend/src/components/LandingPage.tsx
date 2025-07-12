import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Shirt, 
  Users, 
  Recycle, 
  Heart,
  Star,
  MapPin,
  Clock,
  Coins,
  Plus,
  Search,
  Filter,
  LogOut
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: string, item?: any) => void;
  onLogout?: () => void;
  isAdmin?: boolean;
  isAuthenticated?: boolean;
}

const LandingPage = ({ onNavigate, onLogout, isAdmin = false, isAuthenticated = false }: LandingPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle navigation - redirect to login if not authenticated for protected routes
  const handleNavigation = (page: string, item?: any) => {
    if (!isAuthenticated && ['browse', 'dashboard', 'add-item', 'admin'].includes(page)) {
      onNavigate("login");
    } else {
      onNavigate(page, item);
    }
  };

  const featuredItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
      title: "Vintage Denim Jacket",
      size: "M",
      condition: "Excellent",
      location: "Downtown",
      distance: "2.3 km",
      points: 45,
      owner: "Sarah M.",
      rating: 4.8,
      postedTime: "2 hours ago"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
      title: "Summer Floral Dress",
      size: "S",
      condition: "Like New",
      location: "Midtown",
      distance: "1.8 km",
      points: 35,
      owner: "Emma K.",
      rating: 4.9,
      postedTime: "5 hours ago"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
      title: "Designer Handbag",
      size: "One Size",
      condition: "Good",
      location: "Uptown",
      distance: "3.1 km",
      points: 60,
      owner: "Lisa R.",
      rating: 4.7,
      postedTime: "1 day ago"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
      title: "Wool Winter Coat",
      size: "L",
      condition: "Very Good",
      location: "Eastside",
      distance: "4.2 km",
      points: 80,
      owner: "Maria S.",
      rating: 4.6,
      postedTime: "2 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">ReWear</h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <button 
                onClick={() => onNavigate("home")}
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Home
              </button>
              
              {!isAuthenticated ? (
                <>
                  <button 
                    onClick={() => onNavigate("login")}
                    className="text-gray-700 hover:text-purple-600 font-medium"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => onNavigate("register")}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  {/* Show authenticated user navigation */}
                  <button 
                    onClick={() => handleNavigation("browse")}
                    className="text-gray-700 hover:text-purple-600 font-medium hidden md:block"
                  >
                    Browse
                  </button>
                  <button 
                    onClick={() => handleNavigation("dashboard")}
                    className="text-gray-700 hover:text-purple-600 font-medium hidden md:block"
                  >
                    My Items
                  </button>
                  {isAdmin && (
                    <button 
                      onClick={() => handleNavigation("admin")}
                      className="text-purple-600 hover:text-purple-700 font-medium hidden md:block"
                    >
                      Admin Panel
                    </button>
                  )}
                  <Button
                    onClick={() => handleNavigation("add-item")}
                    className="bg-purple-600 hover:bg-purple-700 text-white hidden sm:flex"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Community Clothing Exchange
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Give your clothes a second life. Swap, share, and discover unique pieces 
            while building a sustainable fashion community.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for clothes, shoes, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white shadow-sm"
            />
            <Button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700"
              onClick={() => handleNavigation("browse")}
            >
              Search
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"].map((category) => (
              <Badge 
                key={category}
                variant="outline" 
                className="cursor-pointer hover:bg-purple-50 hover:border-purple-300"
                onClick={() => handleNavigation("browse")}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">2,500+</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600">Active Members</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">15,000+</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600">Items Shared</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">8,500+</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600">Successful Swaps</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Items */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Featured Items</h3>
            <Button 
              variant="outline"
              onClick={() => handleNavigation("browse")}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card 
                key={item.id} 
                className="group hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleNavigation("item-detail", item)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 rounded-full bg-white/80 hover:bg-white p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isAuthenticated) {
                            onNavigate("login");
                          }
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-white/90 text-gray-900">
                        {item.condition}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">Size {item.size}</p>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location} • {item.distance}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-purple-600">{item.points}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{item.owner}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{item.postedTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Swapping?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join our community today and give your wardrobe a sustainable makeover. 
              List your first item and start discovering amazing pieces from others!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => handleNavigation("add-item")}
                className="bg-white text-purple-600 hover:bg-gray-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                List Your First Item
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleNavigation("browse")}
                className="border-white text-white hover:bg-white/10"
              >
                Start Browsing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;