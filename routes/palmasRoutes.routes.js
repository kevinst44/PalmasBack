const express = require('express');
const router = express.Router();
const {InfoSalon, PalmasBot} = require('./controllers/palmas.js');

router.post('/salon', InfoSalon);
router.post('/palmasbot', PalmasBot);

module.exports = router;