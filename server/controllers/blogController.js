import fs from 'fs';
import Blog from '../models/Blog.js';
import imagekit from '../config/imagekit.js';

export const addBlog = async(req, res)=>{
    try {
        const {title, subTitle, description, category, isPublished}= JSON.parse(req.body.blog);
        const imageFile = req.file;

        //check if all fields are present
        if(!title || !description || !category || !imageFile){
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


export const getAllBlogs = async(req, res)=>{
    try {
        const blogs = await Blog.find({isPublished:true})
        res.json({success:true, blogs})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getBlogById = async(req, res)=>{
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success:false, message:"Blog Not Found"})
        }
        res.json({success:true, blog})
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
}



export const deleteBlogById = async(req, res)=>{
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        res.json({success:true, message:"Blog deleted successfully!"})
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
}

export const togglePublish = async(req, res)=>{
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished
        await blog.save();
        res.json({success:true, message:"Blog status updated!"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}