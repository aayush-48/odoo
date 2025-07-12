import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const itemSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories', 'Others']
  },
  type: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Kids', 'Unisex'],
    trim: true
  },
  size: {
    type: String,
    required: true,
    trim: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Excellent', 'Good', 'Fair'],
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  images: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: "At least one image is required."
    }
  },
  status: {
    type: String,
    enum: ['active', 'swapped', 'pending'],
    default: 'active'
  },
  points: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
    validate: {
      validator: function (val) {
        return Number.isInteger(val);
      },
      message: "Points must be a non-negative integer"
    }
  }
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
export default Item;
