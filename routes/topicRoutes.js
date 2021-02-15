const express = require('express');
const topicController = require('../controllers/topicController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/topics', requireAuth, topicController.topic_get);
router.get('/topics/:id', requireAuth, topicController.question_get);
router.get('/add_question', requireAuth, topicController.add_question_get);
router.post('/add_question', requireAuth, topicController.add_question_post);
router.get('/my_topics', requireAuth, topicController.my_topic_get);
router.get('/my_topics/:id', requireAuth, topicController.my_question_get);
router.post('/add_myQuestion', requireAuth, topicController.add_myQuestion_post);
// router.post('/', blogController.blog_create_post);
// router.get('/:id', blogController.blog_details);
// router.delete('/:id', blogController.blog_delete);

module.exports = router;