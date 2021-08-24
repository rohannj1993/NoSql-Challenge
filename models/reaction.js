const {Schema, model}=require("mongoose")
const dateFormat = require("../utils/date")
const reactionSchema = new Schema ({
 reactionId:{
    type: Schema.Types.ObjectId,
    default: ()=> new Types.ObjectId()
 },
  reactionBody:{
      type:String,
      required:true,
      maxLength:280
  },
   userName:{
       type: String,
       required: true,
   },
   createdAt:{
       type:Date,
       default:Date.now,
       get:timestamp=>dateFormat(timestamp)
   }
   


}
{
 toJSON:{
     getters:true
 },
 id:false   
}
);
module.exports= reactionSchema;