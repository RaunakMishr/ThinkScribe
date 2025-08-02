import fs from 'fs';
import Blog from '../models/Blog.js';
import imagekit from '../config/imagekit.js';

export const addBlog = async(req, res)=>{
    try {
        const {title, subTitle, description, category, isPublished}= JSON.parse(req.body.blog);
        const imageFile = req.file;

        //check if all fields are present !imageFile
        if(!title || !description || !category){
            return res.json({success:false, message:"Missing required fields"})
        }
        //we have to store image, we will store image url, so first we are storing it on cloud

        const fileBuffer = fs.readFileSync(imageFile.path)
        //upload image
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName: imageFile.originalname,
            folder:"/blogs"
        })
        //optimise and transform image using imagekit
        const optimisedImageURL = imagekit.url({
            path: uploadResponse.filePath,
            transformation:[{
                quality:'auto'}, //auto compression
                {format:'webp'}, //convert to modern format
                {width:'1280'}//width resizing
            ]
        })

        const image = optimisedImageURL;

        await Blog.create({title, subTitle, description, category, image, isPublished})
        res.json({success:true, message:"Blog added successfully!"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

