import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { 
  Shield, 
  Users, 
  Package, 
  AlertCircle, 
  Check, 
  X, 
  Search, 
  Trash2, 
  LogOut, 
  Eye,
  Repeat2,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

interface AdminPanelProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const AdminPanel = ({ onNavigate, onLogout }: AdminPanelProps) => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const [pendingItems, setPendingItems] = useState([
    { id: 1, title: "Vintage Leather Jacket", user: "John Doe", submitted: "2024-01-20", status: "pending", flagged: false },
    { id: 2, title: "Designer Handbag", user: "Sarah Smith", submitted: "2024-01-19", status: "pending", flagged: true },
    { id: 3, title: "Summer Dress", user: "Emma Wilson", submitted: "2024-01-18", status: "pending", flagged: false },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", items: 5, swaps: 12, joined: "2024-01-01", status: "active" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", items: 8, swaps: 23, joined: "2024-01-05", status: "active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", items: 2, swaps: 3, joined: "2024-01-15", status: "suspended" },
  ]);

  const [swapRequests, setSwapRequests] = useState([
    { id: 1, requester: "John Doe", requestedItem: "Vintage Denim Jacket", offeredItem: "Leather Boots", status: "pending", date: "2024-01-20" },
    { id: 2, requester: "Sarah Smith", requestedItem: "Summer Dress", offeredItem: "Designer Bag", status: "approved", date: "2024-01-19" },
    { id: 3, requester: "Emma Wilson", requestedItem: "Classic Sneakers", offeredItem: "Winter Coat", status: "rejected", date: "2024-01-18" },
    { id: 4, requester: "Mike Johnson", requestedItem: "T-Shirt", offeredItem: "Jeans", status: "pending", date: "2024-01-17" },
  ]);

  const handleApprove = (itemId: number) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    console.log("Approved item:", itemId);
  };

  const handleReject = (itemId: number) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    console.log("Rejected item:", itemId);
  };

  const handleDeleteItem = (itemId: number) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    console.log("Deleted item:", itemId);
  };

  const handleUserStatusToggle = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "suspended" : "active" }
        : user
    ));
  };

  const handleSwapAction = (swapId: number, action: "approve" | "reject") => {
    setSwapRequests(prev => prev.map(swap => 
      swap.id === swapId 
        ? { ...swap, status: action === "approve" ? "approved" : "rejected" }
        : swap
    ));
    console.log(`${action} swap:`, swapId);
  };

  const stats = [
    { label: "Total Users", value: users.length.toString(), icon: Users, color: "text-blue-600" },
    { label: "Pending Items", value: pendingItems.length.toString(), icon: Package, color: "text-orange-600" },
    { label: "Flagged Content", value: "5", icon: AlertCircle, color: "text-red-600" },
    { label: "Pending Swaps", value: swapRequests.filter(s => s.status === "pending").length.toString(), icon: Repeat2, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            
            <div className="flex items-center gap-4">
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab("pending")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "pending"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pending Items
                <Badge className="ml-2 bg-orange-100 text-orange-800">
                  {pendingItems.length}
                </Badge>
              </button>
              <button
                onClick={() => setSelectedTab("users")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "users"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Manage Users
              </button>
              <button
                onClick={() => setSelectedTab("swaps")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "swaps"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Swap Management
                <Badge className="ml-2 bg-purple-100 text-purple-800">
                  {swapRequests.filter(s => s.status === "pending").length}
                </Badge>
              </button>
              <button
                onClick={() => setSelectedTab("reports")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "reports"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reports
              </button>
            </nav>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Content based on selected tab */}
        {selectedTab === "pending" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-600" />
                Pending Item Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        {item.flagged && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">by {item.user}</p>
                      <p className="text-xs text-gray-500">Submitted: {item.submitted}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleApprove(item.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleReject(item.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(item.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No pending items</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <Badge className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        {user.items} items • {user.swaps} swaps • Joined {user.joined}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUserStatusToggle(user.id)}
                        className={user.status === "active" ? "border-red-200 text-red-600 hover:bg-red-50" : "border-green-200 text-green-600 hover:bg-green-50"}
                      >
                        {user.status === "active" ? "Suspend" : "Activate"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedTab === "swaps" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Repeat2 className="w-5 h-5 text-purple-600" />
                Swap Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {swapRequests.map((swap) => (
                  <div key={swap.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">Swap Request</h4>
                        <Badge className={
                          swap.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          swap.status === "approved" ? "bg-green-100 text-green-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {swap.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                          {swap.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {swap.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                          {swap.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>{swap.requester}</strong> wants to swap <strong>{swap.offeredItem}</strong> for <strong>{swap.requestedItem}</strong>
                      </p>
                      <p className="text-xs text-gray-500">Requested: {swap.date}</p>
                    </div>
                    
                    {swap.status === "pending" && (
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleSwapAction(swap.id, "approve")}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleSwapAction(swap.id, "reject")}
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedTab === "reports" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Reports & Flagged Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No reports at this time</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
