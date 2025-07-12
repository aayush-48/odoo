import Item from "../models/item.model.js";
import cloudinary from "../lib/cloudinary.js"

export const createItemForSale = async(req, res) => {
    console.log(req.body);
    console.log('Incoming:', req.method, req.url);
    console.log('Headers:', req.headers['content-type']);
    
    const {userId, title, description, category, type, size, condition, tags, front_image, back_image} = req.body;
    try{
        if(!userId || !title || !description || !category || !type || !size || !condition || !front_image || !back_image){
            return res.status(400).json({message : `required data missing : ${req.body.size}`});
        }

        
        const front_image_res = await cloudinary.uploader.upload(front_image)
        const back_image_res = await cloudinary.uploader.upload(back_image)
        const images = [front_image_res.secure_url , back_image_res.secure_url]
        // console.log(`Reached here 1 ${  images}`);
        
        const item = await Item.create({
            userId,
            title,
            description,
            category,
            type,
            size,
            condition,
            tags,
            images
        })
        console.log("Reached here 2");

        return res.status(200).json({message : "New item created", 
            item
        })
    } catch(e){
        res.status(500).json({message : `Some internal error occurred... ${e}`})
    }
}

