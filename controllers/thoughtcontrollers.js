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
    createThought(req,res){
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
    },
    upThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
          .then((dbThought) => {
            if (!dbThought) {
              return res.json({ message: 'No thought with this id!' });
            }
            res.json(dbThought);
          })
          .catch((err) => {
            console.log(err);
            res.json(err);
          });
      },
      // delete thought
      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((dbThought) => {
            if (!dbThought) {
              return res.json({ message: 'No thought with this id!' });
            }
    
            // remove thought id from user's `thoughts` field
            return User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'Thought created but no user with this id!' });
            }
            res.json({ message: 'Thought successfully deleted!' });
          })
          .catch((err) => {
            console.log(err);
            res.json(err);
          });
      },
    
      // add a reaction to a thought
      addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((dbThought) => {
            if (!dbThought) {
              return res.json({ message: 'No thought with this id!' });
            }
            res.json(dbThought);
          })
          .catch((err) => {
            console.log(err);
            res.json(err);
          });
      },
      // remove reaction from a thought
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((dbThought) => {
            if (!dbThought) {
              return res.json({ message: 'No thought with this id!' });
            }
            res.json(dbThought);
          })
          .catch((err) => {
            console.log(err);
            res.json(err);
          });
      },
}
module.exports=thoughtcontrol