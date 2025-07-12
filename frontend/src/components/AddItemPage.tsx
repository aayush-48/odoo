import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import axios from "axios"
import { ArrowLeft, Upload, X, Plus, LogOut } from "lucide-react";

interface AddItemPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const AddItemPage = ({ onNavigate, onLogout }: AddItemPageProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: ""
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [images, setImages] = useState<any[]>([]);

  const handleImageUpload = async (e : any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      // setSelectedImg(base64Image);
      setImages([...images, base64Image])
      // await updateProfile({ profilePic: base64Image });
    };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Item submitted:", { ...formData, tags, images });
    // onNavigate("dashboard");
    try{
      const res = await axios.post("http://localhost:8000/api/item/create", {
        ...formData, front_image : images[0], back_image: images[1], userId : "asd"
      })

      console.log(res);
      
    }catch(e){
      console.log(e);
      
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
                onClick={() => onNavigate("dashboard")}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
            </div>
            
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
          <p className="text-gray-600">Share your clothing items with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-600" />
                  Add Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* {images.map((image, index) => (
                    <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img src={image} alt={`Item ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setImages([...images, "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=300&fit=crop"])}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  >
                    <Plus className="w-8 h-8 text-gray-400" />
                  </button> */}
                  <label htmlFor="front_image">Add front image:</label>
                  <input
                  name="front_image"
                  type="file"
                  id="avatar-upload"
                  // className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  // disabled={isUpdatingProfile}
                />
                <label htmlFor="back_image">Add back image:</label>
                  <input
                  name="back_image"
                  type="file"
                  id="avatar-upload"
                  // className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  // disabled={isUpdatingProfile}
                />
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Item Details */}
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="rounded-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="rounded-lg h-24"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="tops">Tops</option>
                      <option value="bottoms">Bottoms</option>
                      <option value="dresses">Dresses</option>
                      <option value="outerwear">Outerwear</option>
                      <option value="footwear">Footwear</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <select
                      id="size"
                      value={formData.size}
                      onChange={(e) => handleInputChange("size", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <select
                    id="condition"
                    value={formData.condition}
                    onChange={(e) => handleInputChange("condition", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-purple-500"
                    required
                  >
                    <option value="New">New</option>
                    <option value="Gently Used">Gently Used</option>
                    <option value="Used">Used</option>
                    {/* <option value="good">Good</option> */}
                    {/* <option value="fair">Fair</option> */}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-purple-500"
                    required
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    {/* <option value="good">Good</option> */}
                    {/* <option value="fair">Fair</option> */}
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tags Section */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag (e.g., vintage, casual, summer)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 rounded-lg"
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="max-w-4xl mx-auto flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onNavigate("dashboard")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 px-8"
              >
                Publish Item
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;
