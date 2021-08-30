const router = require('express').Router();
const {
  getallthoughts,
  getonethought,
  createThought,
  upThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtcontrollers');

// /api/thoughts
router.route('/').get(getallthoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getonethought).put(upThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
