const { User, Thought } = require('../models');

const userController = {
  // get all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  // get single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((dbUser) => {
        if (!dbUser) {
          return res.json({ message: 'No user with this id!' });
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUser) => {
        if (!dbUser) {
          return res.json({ message: 'No user with this id!' });
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  // delete user (BONUS: and delete associated thoughts)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUser) => {
        if (!dbUser) {
          return res.json({ message: 'No user with this id!' });
        }

        // BONUS: get ids of user's `thoughts` and delete them all
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add friend to friend list
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((dbUser) => {
        if (!dbUser) {
          return res.json({ message: 'No user with this id!' });
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  // remove friend from friend list
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUser) => {
        if (!dbUser) {
          return res.json({ message: 'No user with this id!' });
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};

module.exports = userController;
