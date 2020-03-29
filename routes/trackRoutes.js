const express = require('express');
const requireAuth = require('../middlewares/requireAuth');

const { createTrack, getTracks } = require('../controller/trackController');

const router = express.Router();

router.use(requireAuth);

router.get('/', getTracks);
router.post('/', createTrack);

module.exports = router;
