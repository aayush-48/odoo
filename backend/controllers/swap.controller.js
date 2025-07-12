import jwt from "jsonwebtoken";
import Swap from "../models/swap.model.js";
import Item from "../models/item.model.js";
import User from "../models/user.model.js";

const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const requestSwap = async (req, res) => {
  try {
    const user = getUserFromToken(req);
    const requesterId = user._id;

    const { itemId, offeredItemId, swapType } = req.body;

    const item = await Item.findById(itemId);
    if (!item || item.status !== "available") {
      return res.status(404).json({ error: "Requested item not available" });
    }

    if (String(item.userId) === String(requesterId)) {
      return res.status(400).json({ error: "You cannot request your own item" });
    }

    if (swapType === "direct") {
      const offeredItem = await Item.findById(offeredItemId);
      if (
        !offeredItem ||
        offeredItem.userId.toString() !== requesterId.toString() ||
        offeredItem.status !== "available"
      ) {
        return res.status(400).json({ error: "Invalid offered item for swap" });
      }
    } else if (swapType === "points") {
      const userDoc = await User.findById(requesterId);
      const itemCost = item.points || 0;

      if (userDoc.points < itemCost) {
        return res.status(400).json({ error: `Insufficient points. Required: ${itemCost}` });
      }
    }

    const swap = await Swap.create({
      itemId,
      offeredItemId: swapType === "direct" ? offeredItemId : undefined,
      requesterId,
      ownerId: item.userId,
      swapType,
    });

    res.status(201).json({ message: "Swap request submitted", swap });
  } catch (err) {
    console.error("Request Swap Error:", err.message);
    if (err.message === "Unauthorized") {
      return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const approveSwapByOwner = async (req, res) => {
  try {
    const user = getUserFromToken(req);
    const ownerId = user._id;
    const { id } = req.params;

    const swap = await Swap.findById(id).populate("itemId offeredItemId requesterId");
    if (!swap || String(swap.ownerId) !== String(ownerId)) {
      return res.status(403).json({ error: "Not authorized to approve this swap" });
    }

    if (swap.status !== "pending") {
      return res.status(400).json({ error: "Swap already processed" });
    }

    if (swap.swapType === "points") {
      const pointsCost = swap.itemId.points || 0;
      const requester = await User.findById(swap.requesterId._id);
      const owner = await User.findById(ownerId);

      if (requester.points < pointsCost) {
        return res.status(400).json({ error: "Requester has insufficient points" });
      }

      requester.points -= pointsCost;
      owner.points += pointsCost;
      await requester.save();
      await owner.save();

      await Item.findByIdAndUpdate(swap.itemId._id, { status: "redeemed" });
    } else if (swap.swapType === "direct") {
      await Item.findByIdAndUpdate(swap.itemId._id, { status: "swapped" });
      await Item.findByIdAndUpdate(swap.offeredItemId._id, { status: "swapped" });
    }

    swap.status = "approved";
    await swap.save();

    res.status(200).json({ message: "Swap approved", swap });
  } catch (err) {
    console.error("Approve Swap Error:", err.message);
    if (err.message === "Unauthorized") {
      return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const rejectSwapByOwner = async (req, res) => {
  try {
    const user = getUserFromToken(req);
    const ownerId = user._id;
    const { id } = req.params;

    const swap = await Swap.findById(id);
    if (!swap || String(swap.ownerId) !== String(ownerId)) {
      return res.status(403).json({ error: "Not authorized to reject this swap" });
    }

    swap.status = "rejected";
    await swap.save();

    res.status(200).json({ message: "Swap rejected" });
  } catch (err) {
    console.error("Reject Swap Error:", err.message);
    if (err.message === "Unauthorized") {
      return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserSwaps = async (req, res) => {
  try {
    const user = getUserFromToken(req);
    const userId = user._id;

    const swaps = await Swap.find({
      $or: [{ requesterId: userId }, { ownerId: userId }],
    }).populate("itemId offeredItemId requesterId ownerId");

    res.status(200).json(swaps);
  } catch (err) {
    console.error("Get Swaps Error:", err.message);
    if (err.message === "Unauthorized") {
      return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
