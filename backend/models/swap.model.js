import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const swapSchema = new Schema({
  itemId: {
    type: Types.ObjectId,
    ref: 'Item',
    required: [true, "Item reference is required"]
  },
  requesterId: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, "Requester (user initiating the swap) is required"]
  },
  ownerId: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, "Owner of the item is required"]
  },
  adminId: {
    type: Types.ObjectId,
    ref: 'User',
    default: null 
  },
  swapType: {
    type: String,
    enum: {
      values: ['direct', 'points'],
      message: "Swap type must be either 'direct' or 'points'"
    },
    required: [true, "Swap type is required"]
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'approved', 'rejected', 'completed'],
      message: "Status must be one of: pending, approved, rejected, completed"
    },
    default: 'pending'
  }
}, { timestamps: true });

const Swap = mongoose.model("Swap", swapSchema);
export default Swap;
