import mongoose from "mongoose";

const wishlistSchema=new mongoose.Schema(
    {
        wishlistByuserId:{type:String,required:true},
        wishlistedItem:{type:Object,required:true}
    },{timestamps:true}
);

export default mongoose.model('Wishlist', wishlistSchema);