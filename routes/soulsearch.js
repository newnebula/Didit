// const path = require('path');
const express = require('express');
const soulsearchController = require('../controllers/soulsearch');
const router = express.Router();
const isAuthFile = require('../middleware/is-auth');
isAuth=isAuthFile.isAuth;


// router.post('/post-new-soulsearch', soulsearchController.postNewSoulsearch);
// router.post('/update-soulsearch/:iId', soulsearchController.updatSoulsearch);
// router.get('/all-days', soulsearchController.showAllDays);
// router.get('/all-soulsearches', soulsearchController.showAllSoulsearches);
router.get('/last-week', isAuth, soulsearchController.weekData);
router.post('/get-month', isAuth, soulsearchController.monthData);



module.exports = router;