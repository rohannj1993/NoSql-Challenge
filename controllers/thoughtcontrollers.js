const{Thought,User}=require("../models")
const thoughtcontrol ={
    getallthoughts (req,res){
        Thought.find()
        .sort({createdAt:-1})
        .then((dbThought)=>{
            res.json(dbThought)
        })
        .catch((error)=>{
            res.json(error)
        })
    },
    getonethought(req,res){
        Thought.findOne({_id:req.params.thoughtId})
        .then((dbThought)=>{
            res.json(dbThought)
        })
        .catch((error)=>{
            res.json(error)
        })
    },
}
module.exports=thoughtcontrol