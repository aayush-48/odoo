import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const swapSchema = new Schema({
  itemId: {
    type: Types.ObjectId,
    ref: 'Item',
    required: [true, "Item reference is required"]
  },
  offeredItemId: {
    type: Types.ObjectId,
    ref: 'Item',
    required: function () {
      return this.swapType === 'direct';
    }
  },
  requesterId: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, "Requester is required"]
  },
  ownerId: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, "Owner is required"]
  },
  swapType: {
    type: String,
    enum: ['direct', 'points'],
    required: [true, "Swap type is required"]
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

const Swap = mongoose.model("Swap", swapSchema);
export default Swap;
