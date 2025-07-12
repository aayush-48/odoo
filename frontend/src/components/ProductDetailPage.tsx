import React from "react";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Plus, Minus, Heart, Share2, LogOut } from "lucide-react";

interface ProductDetailPageProps {
  item: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const ProductDetailPage = ({ item, onNavigate, onLogout }: ProductDetailPageProps) => {
  const [description, setDescription] = useState("");

  const mockItem = {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    type: "Unisex",
    size: "M",
    condition: "Excellent",
    brand: "Levi's",
    color: "Blue",
    material: "100% Cotton",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop"
    ],
    owner: {
      name: "Sarah Johnson",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612e5ab?w=100&h=100&fit=crop"
    }
  };

  // Ensure we have a valid item with images array
  const currentItem = item || mockItem;
  const itemImages = currentItem.images || mockItem.images || [];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Safety check for image access
  const currentImage = itemImages.length > 0 ? itemImages[currentImageIndex] : mockItem.images[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate("browse")}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 border border-gray-300 px-3 py-1 rounded"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back</span>
              </button>
              <h1 className="text-lg font-bold text-gray-900">Product Detail Page</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-gray-300">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="text-gray-600 hover:text-red-600 border-gray-300"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-2 border-gray-300">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Add Images</h3>
                </div>
                <div className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <img
                    src={currentImage}
                    alt={currentItem.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="border-gray-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <Card className="border-2 border-gray-300">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Add Product Description</h2>
                </div>
                
                <div className="space-y-4">
                  {/* Product Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <div className="p-3 border border-gray-300 rounded bg-gray-50">
                      {currentItem.title}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="p-3 border border-gray-300 rounded bg-gray-50">
                      {currentItem.category}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <div className="p-3 border border-gray-300 rounded bg-gray-50">
                      {currentItem.type}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size
                    </label>
                    <div className="p-3 border border-gray-300 rounded bg-gray-50">
                      {currentItem.size}
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition
                    </label>
                    <div className="p-3 border border-gray-300 rounded bg-gray-50">
                      <Badge className="bg-green-100 text-green-800">
                        {currentItem.condition}
                      </Badge>
                    </div>
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <div className="p-3 border border-gray-300 rounded bg-gray-50">
                      {currentItem.brand}
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="p-3 border border-gray-300 rounded bg-gray-50">
                      {currentItem.color}
                    </div>
                  </div>

                  {/* Material */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material
                    </label>
                    <div className="p-3 border border-gray-300 rounded bg-gray-50">
                      {currentItem.material}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (Points)
                    </label>
                    <div className="p-3 border border-gray-300 rounded bg-gray-50 font-semibold">
                      {currentItem.price} Points
                    </div>
                  </div>

                  {/* Description Text Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description
                    </label>
                    <Textarea
                      placeholder="Enter detailed product description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-32 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      rows={6}
                    />
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="border-gray-300"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-2 border border-gray-300 rounded bg-gray-50 min-w-12 text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="border-gray-300"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => onNavigate("browse")}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => console.log("Product details saved")}
                    >
                      Save Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available to Review */}
            <Card className="border-2 border-gray-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Available to Review</h3>
                  <p className="text-sm text-gray-600">
                    This product is available for review and feedback
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
