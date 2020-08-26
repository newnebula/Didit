// const path = require('path');
const express = require('express');
const diditsController = require('../controllers/didits');
const router = express.Router();
const isAuthFile = require('../middleware/is-auth');
isAuth=isAuthFile.isAuth;



router.post('/post-new-didit', isAuth ,diditsController.postNewDidit);
router.post('/update-didit', isAuth , diditsController.updateDidit);
router.get('/all-didits',isAuth ,diditsController.showAllDidits);
router.post('/delete-didit',isAuth , diditsController.deleteDidit);


module.exports = router;
