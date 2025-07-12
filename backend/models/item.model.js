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
    trim: true
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
    enum: ['New', 'Gently Used', 'Used'],
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
    enum: ['available', 'swapped', 'redeemed'],
    default: 'available'
  },
  approved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
export default Item;
