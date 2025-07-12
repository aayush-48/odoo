import React from "react";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Heart, Share2, User, MapPin, Calendar, LogOut, Repeat2, Coins } from "lucide-react";
import axios from "axios";

interface ItemDetailPageProps {
  item: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const ItemDetailPage = ({ item, onNavigate, onLogout }: ItemDetailPageProps) => {
  const mockItem = item || {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "Beautiful vintage denim jacket in excellent condition. Perfect for casual outings and layering. Has been well-maintained and shows minimal signs of wear.",
    category: "Outerwear",
    type: "Unisex",
    size: "M",
    condition: "Excellent",
    tags: ["vintage", "denim", "casual", "layering"],
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop"
    ],
    owner: {
      name: "Sarah Johnson",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612e5ab?w=100&h=100&fit=crop",
      location: "Downtown District",
      joinedDate: "January 2024"
    },
    status: "available",
    pointsValue: 45
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSwapOptions, setShowSwapOptions] = useState(false);

  // Previous listings with proper image URLs
  const previousListings = [
    {
      id: 1,
      title: "Similar Item 1",
      category: "Outerwear",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Similar Item 2", 
      category: "Clothing",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Similar Item 3",
      category: "Accessories", 
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Similar Item 4",
      category: "Footwear",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop"
    }
  ];

  // Ensure images array exists and currentImageIndex is valid
  const images = mockItem.images || [];
  const validImageIndex = images.length > 0 ? Math.min(currentImageIndex, images.length - 1) : 0;
  
  // Ensure tags array exists
  const tags = mockItem.tags || [];

  const handleSwapRequest = async (swapType: 'item' | 'points') => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You must be logged in to request a swap.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/swap/request", {
        itemId: mockItem.id,
        type: swapType
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Swap request sent!");
      setShowSwapOptions(false);
    } catch (err) {
      alert("Failed to send swap request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate("browse")}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Browse</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-200">
                  {images.length > 0 ? (
                    <img
                      src={images[validImageIndex]}
                      alt={mockItem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No image available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? "border-purple-500" : "border-gray-200"
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockItem.title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-green-100 text-green-800">
                      {mockItem.status}
                    </Badge>
                    <Badge variant="outline">
                      {mockItem.category}
                    </Badge>
                    <Badge variant="outline">
                      {mockItem.type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-purple-600 font-semibold">
                    <Coins className="w-5 h-5" />
                    <span>{mockItem.pointsValue} points</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{mockItem.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Size</h3>
                  <p className="text-gray-600">{mockItem.size}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Type</h3>
                  <p className="text-gray-600">{mockItem.type}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Condition</h3>
                  <p className="text-gray-600">{mockItem.condition}</p>
                </div>
              </div>

              {tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Owner Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Item Owner</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={mockItem.owner.profileImage}
                    alt={mockItem.owner.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{mockItem.owner.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {mockItem.owner.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {mockItem.owner.joinedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!showSwapOptions ? (
                <Button
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center justify-center gap-2"
                  onClick={() => setShowSwapOptions(true)}
                >
                  <Repeat2 className="w-5 h-5" />
                  Request Swap
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center justify-center gap-2"
                    onClick={() => handleSwapRequest('item')}
                  >
                    <Repeat2 className="w-5 h-5" />
                    Swap with My Item
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full h-12 border-purple-200 text-purple-600 hover:bg-purple-50 font-medium flex items-center justify-center gap-2"
                    onClick={() => handleSwapRequest('points')}
                  >
                    <Coins className="w-5 h-5" />
                    Swap with My Points ({mockItem.pointsValue} Points)
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full text-gray-600 hover:text-gray-800"
                    onClick={() => setShowSwapOptions(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800 flex items-center justify-center gap-2"
                onClick={() => onNavigate("dashboard")}
              >
                <User className="w-4 h-4" />
                Message Owner
              </Button>
            </div>
          </div>
        </div>

        {/* Previous Listings Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Previous Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previousListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{listing.title}</h4>
                    <p className="text-sm text-gray-500">{listing.category}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
