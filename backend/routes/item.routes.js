import express from "express"
import { createItemForSale } from "../controllers/item.controller.js"

const router = express.Router()

router.post("/create", createItemForSale);

export default router