import mongoose from "mongoose";

const orderSchema=new mongoose.Schema(
    {
        transcationinfo:{type:Object,required:true},
        transcationBy:{type:Object,required:true},
        transcationOf:{type:Object,required:true}
    
    },{timestamps:true}
);

export default mongoose.model('Order', orderSchema);