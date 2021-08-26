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
    createthought(req,res){
        Thought.create(req.body)
        .then((dbThought)=>{
            return User.findOneAndUpdate (
            {_id:req.body.userId},
            {$push:{thoughts:dbThought._id}},
            {new:true}
            )
        })
        .then((dbUser)=>{
            if(!dbUser){
                 res.json({
                    message:"Thought was created,but no associated user!"
                })
            }
            res.json({message:"Thought was created"})
        })
        .catch((error)=>{
            res.json(error)
        })
    }
}
module.exports=thoughtcontrol