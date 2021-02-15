const express = require('express');
const interviewController = require('../controllers/interviewController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/companies', requireAuth, interviewController.company_get);
router.get('/companies/:id', requireAuth, interviewController.experience_get);
router.post('/add_experience', requireAuth, interviewController.add_experience_post);
// router.get('/add_question', requireAuth, interviewController.add_question_get);
// router.get('/topics/:id', requireAuth, interviewController.question_get);
// router.get('/add_question', requireAuth, interviewController.add_question_get);
// router.post('/add_question', requireAuth, interviewController.add_question_post);
// router.get('/my_topics', requireAuth, interviewController.my_topic_get);
// router.get('/my_topics/:id', requireAuth, interviewController.my_question_get);
// router.post('/add_myQuestion', requireAuth, interviewController.add_myQuestion_post);
// router.post('/', blogController.blog_create_post);
// router.get('/:id', blogController.blog_details);
// router.delete('/:id', blogController.blog_delete);

module.exports = router;