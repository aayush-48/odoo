import express from "express";
import {
  requestSwap,
  approveSwapByOwner,
  rejectSwapByOwner,
  getUserSwaps,
} from "../controllers/swap.controller.js";

const router = express.Router();

router.post("/request", requestSwap);

router.patch("/approve/:id", approveSwapByOwner);

router.patch("/reject/:id", rejectSwapByOwner);

router.get("/my-swaps", getUserSwaps);

export default router;
