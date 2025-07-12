import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { User, Upload, RefreshCw, CheckCircle, Plus, LogOut, ArrowRight } from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Dashboard = ({ onNavigate, onLogout }: DashboardProps) => {
  const uploadedItems = [
    { id: 1, title: "Vintage Leather Jacket", status: "active", swaps: 3 },
    { id: 2, title: "Summer Maxi Dress", status: "pending", swaps: 0 },
    { id: 3, title: "Designer Jeans", status: "active", swaps: 7 },
    { id: 4, title: "Wool Scarf", status: "swapped", swaps: 1 }
  ];

  const completedSwaps = [
    { id: 1, item: "Red Blazer", swappedWith: "Blue Denim Shirt", date: "2024-01-15" },
    { id: 2, item: "White Sneakers", swappedWith: "Black Boots", date: "2024-01-10" },
    { id: 3, item: "Floral Skirt", swappedWith: "Casual T-shirt", date: "2024-01-05" }
  ];

  const ongoingSwaps = [
    { id: 1, item: "Green Sweater", requestedBy: "Sarah", status: "pending" },
    { id: 2, item: "Athletic Shorts", requestedBy: "Mike", status: "approved" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "swapped": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => onNavigate("landing")} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">ReWear Dashboard</h1>
            </button>
            
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <Card className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Welcome back, User!</h2>
                <p className="opacity-90">Active member since January 2024</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">150</div>
                  <div className="text-sm opacity-90">Points</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Listings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-600" />
                My Listings
              </CardTitle>
              <Button
                onClick={() => onNavigate("add-item")}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {uploadedItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.swaps} interested users</p>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-between text-purple-600 hover:text-purple-700"
                onClick={() => onNavigate("browse")}
              >
                View All Items
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Completed Swaps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Completed Swaps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedSwaps.map((swap) => (
                <div key={swap.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{swap.item}</span>
                    <span className="text-xs text-gray-500">{swap.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">↔ {swap.swappedWith}</p>
                </div>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-between text-green-600 hover:text-green-700"
              >
                View History
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Ongoing Swaps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-orange-600" />
                Ongoing Swaps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ongoingSwaps.map((swap) => (
                <div key={swap.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{swap.item}</span>
                    <Badge className={swap.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {swap.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Requested by {swap.requestedBy}</p>
                </div>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-between text-orange-600 hover:text-orange-700"
              >
                Manage Requests
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => onNavigate("add-item")}
            className="h-16 bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-3"
          >
            <Plus className="w-6 h-6" />
            <span className="text-lg font-medium">Add New Item</span>
          </Button>
          <Button
            onClick={() => onNavigate("browse")}
            variant="outline"
            className="h-16 border-purple-200 text-purple-600 hover:bg-purple-50 flex items-center justify-center gap-3"
          >
            <RefreshCw className="w-6 h-6" />
            <span className="text-lg font-medium">Browse & Swap</span>
          </Button>
          <Button
            onClick={() => onNavigate("landing")}
            variant="outline"
            className="h-16 border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-3"
          >
            <User className="w-6 h-6" />
            <span className="text-lg font-medium">Community</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
