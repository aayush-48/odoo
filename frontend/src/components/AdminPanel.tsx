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
  XCircle,
  Mail,
  Calendar,
  ShoppingBag,
  ArrowLeftRight
} from "lucide-react";

interface AdminPanelProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const AdminPanel = ({ onNavigate, onLogout }: AdminPanelProps) => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const [pendingItems, setPendingItems] = useState([
    { 
      id: 1, 
      title: "Vintage Leather Jacket", 
      user: "John Doe", 
      submitted: "2024-01-20", 
      status: "pending", 
      flagged: false,
      description: "Beautiful vintage leather jacket in excellent condition. Size M. Genuine leather with minimal wear.",
      category: "Outerwear",
      condition: "Good",
      images: ["jacket1.jpg", "jacket2.jpg"],
      location: "New York, NY"
    },
    { 
      id: 2, 
      title: "Designer Handbag", 
      user: "Sarah Smith", 
      submitted: "2024-01-19", 
      status: "pending", 
      flagged: true,
      description: "Authentic designer handbag with original tags. Minor scuff on bottom.",
      category: "Accessories",
      condition: "Very Good",
      images: ["bag1.jpg"],
      location: "Los Angeles, CA"
    },
    { 
      id: 3, 
      title: "Summer Dress", 
      user: "Emma Wilson", 
      submitted: "2024-01-18", 
      status: "pending", 
      flagged: false,
      description: "Flowy summer dress perfect for warm weather. Size S. Worn only once.",
      category: "Clothing",
      condition: "Excellent",
      images: ["dress1.jpg", "dress2.jpg", "dress3.jpg"],
      location: "Chicago, IL"
    },
  ]);

  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      items: 5, 
      swaps: 12, 
      joined: "2024-01-01", 
      status: "active",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      rating: 4.8,
      completedSwaps: 12,
      cancelledSwaps: 1,
      recentActivity: "Last active 2 hours ago"
    },
    { 
      id: 2, 
      name: "Sarah Smith", 
      email: "sarah@example.com", 
      items: 8, 
      swaps: 23, 
      joined: "2024-01-05", 
      status: "active",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      rating: 4.9,
      completedSwaps: 23,
      cancelledSwaps: 0,
      recentActivity: "Last active 1 day ago"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike@example.com", 
      items: 2, 
      swaps: 3, 
      joined: "2024-01-15", 
      status: "suspended",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St, Chicago, IL 60601",
      rating: 3.2,
      completedSwaps: 3,
      cancelledSwaps: 2,
      recentActivity: "Last active 1 week ago"
    },
  ]);

  const [swapRequests, setSwapRequests] = useState([
    { id: 1, requester: "John Doe", requestedItem: "Vintage Denim Jacket", offeredItem: "Leather Boots", status: "pending", date: "2024-01-20" },
    { id: 2, requester: "Sarah Smith", requestedItem: "Summer Dress", offeredItem: "Designer Bag", status: "approved", date: "2024-01-19" },
    { id: 3, requester: "Emma Wilson", requestedItem: "Classic Sneakers", offeredItem: "Winter Coat", status: "rejected", date: "2024-01-18" },
    { id: 4, requester: "Mike Johnson", requestedItem: "T-Shirt", offeredItem: "Jeans", status: "pending", date: "2024-01-17" },
  ]);

  const handleViewItem = (item: any) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleApprove = (itemId: number) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    setShowItemModal(false);
    console.log("Approved item:", itemId);
  };

  const handleReject = (itemId: number) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    setShowItemModal(false);
    console.log("Rejected item:", itemId);
  };

  const handleDeleteItem = (itemId: number) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    setShowItemModal(false);
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
                        onClick={() => handleViewItem(item)}
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
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewUser(user)}
                      >
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

      {/* Item Details Modal */}
      {showItemModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Item Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowItemModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedItem.title}</h3>
                  {selectedItem.flagged && (
                    <Badge className="bg-red-100 text-red-800">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Flagged
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Submitted by</p>
                    <p className="text-sm text-gray-900">{selectedItem.user}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date Submitted</p>
                    <p className="text-sm text-gray-900">{selectedItem.submitted}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Category</p>
                    <p className="text-sm text-gray-900">{selectedItem.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Condition</p>
                    <p className="text-sm text-gray-900">{selectedItem.condition}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
                  <p className="text-sm text-gray-900">{selectedItem.description}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Location</p>
                  <p className="text-sm text-gray-900">{selectedItem.location}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Images</p>
                  <div className="flex gap-2">
                    {selectedItem.images.map((image, index) => (
                      <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleApprove(selectedItem.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedItem.id)}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleDeleteItem(selectedItem.id)}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">User Profile</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
                  <Badge className={selectedUser.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {selectedUser.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </p>
                    <p className="text-sm text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-sm text-gray-900">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joined
                    </p>
                    <p className="text-sm text-gray-900">{selectedUser.joined}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-sm text-gray-900">{selectedUser.rating}/5.0</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Address</p>
                  <p className="text-sm text-gray-900">{selectedUser.address}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <ShoppingBag className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedUser.items}</p>
                    <p className="text-sm text-gray-600">Items Listed</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <ArrowLeftRight className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedUser.completedSwaps}</p>
                    <p className="text-sm text-gray-600">Completed Swaps</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedUser.cancelledSwaps}</p>
                    <p className="text-sm text-gray-600">Cancelled Swaps</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Recent Activity</p>
                  <p className="text-sm text-gray-900">{selectedUser.recentActivity}</p>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleUserStatusToggle(selectedUser.id)}
                    className={selectedUser.status === "active" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
                  >
                    {selectedUser.status === "active" ? "Suspend User" : "Activate User"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowUserModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;