import React from "react";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, Filter, X, Grid3X3, List, LogOut, ChevronLeft, ChevronRight } from "lucide-react";

interface BrowsePageProps {
  onNavigate: (page: string, item?: any) => void;
  onLogout: () => void;
}

const BrowsePage = ({ onNavigate, onLogout }: BrowsePageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const mockItems = [
    { id: 1, title: "Vintage Denim Jacket", category: "Outerwear", type: "Unisex", size: "M", condition: "Excellent", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop", owner: "Sarah" },
    { id: 2, title: "Summer Floral Dress", category: "Dresses", type: "Female", size: "S", condition: "Good", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop", owner: "Emma" },
    { id: 3, title: "Classic White Sneakers", category: "Footwear", type: "Unisex", size: "9", condition: "New", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop", owner: "Mike" },
    { id: 4, title: "Wool Winter Coat", category: "Outerwear", type: "Male", size: "L", condition: "Excellent", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop", owner: "David" },
    { id: 5, title: "Casual T-Shirt", category: "Tops", type: "Kids", size: "M", condition: "Good", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop", owner: "Lisa" },
    { id: 6, title: "Designer Jeans", category: "Bottoms", type: "Female", size: "32", condition: "Excellent", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop", owner: "Tom" }
  ];

  const filters = {
    categories: ["Tops", "Bottoms", "Dresses", "Outerwear", "Footwear", "Accessories"],
    types: ["Male", "Female", "Kids", "Unisex"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    conditions: ["New", "Excellent", "Good", "Fair"]
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  // Filter items based on search query and selected filters
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.some(filter => 
        item.category === filter || 
        item.type === filter ||
        item.size === filter || 
        item.condition === filter
      );
    
    return matchesSearch && matchesFilters;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleItemClick = (item: any) => {
    onNavigate("product-detail", item);
  };

  const handleViewDetailsClick = (e: React.MouseEvent, item: any) => {
    e.stopPropagation(); // Prevent the card click from firing
    onNavigate("product-detail", item);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => onNavigate("landing")} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Browse Items</h1>
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
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {selectedFilters.length > 0 && (
                    <Button
                      onClick={clearFilters}
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Category</h4>
                    <div className="space-y-2">
                      {filters.categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes(category)}
                            onChange={() => toggleFilter(category)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Type</h4>
                    <div className="space-y-2">
                      {filters.types.map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes(type)}
                            onChange={() => toggleFilter(type)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Size</h4>
                    <div className="space-y-2">
                      {filters.sizes.map((size) => (
                        <label key={size} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes(size)}
                            onChange={() => toggleFilter(size)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Condition</h4>
                    <div className="space-y-2">
                      {filters.conditions.map((condition) => (
                        <label key={condition} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes(condition)}
                            onChange={() => toggleFilter(condition)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{condition}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Breadcrumb and View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Home / Browse Items {selectedFilters.length > 0 && `/ Filtered by: ${selectedFilters.join(", ")}`}
                <span className="ml-2">({filteredItems.length} items)</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                    {filter}
                    <button
                      onClick={() => toggleFilter(filter)}
                      className="hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Items Grid/List */}
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {displayedItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleItemClick(item)}>
                  <CardContent className="p-0">
                    <div className={viewMode === "grid" ? "block" : "flex"}>
                      <div className={viewMode === "grid" 
                        ? "aspect-square bg-gray-200 rounded-t-lg overflow-hidden" 
                        : "w-32 h-32 bg-gray-200 rounded-l-lg overflow-hidden flex-shrink-0"
                      }>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-500 mb-2">by {item.owner}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                          <Badge variant="outline" className="text-xs">{item.size}</Badge>
                          <Badge variant="outline" className="text-xs">{item.condition}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-purple-600 hover:text-purple-700 p-0 h-auto font-medium"
                          onClick={(e) => handleViewDetailsClick(e, item)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {displayedItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
