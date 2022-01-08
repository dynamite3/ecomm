import mongoose from "mongoose";

const productSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        description:{type:String,required:true},
        img:{type:String,required:true},
        category:{type:Array},
        size:{type:Array},
        color:{type:Array},
        price:{type:Number},
    },{timestamps:true}
);

export default mongoose.model('Product', productSchema);
