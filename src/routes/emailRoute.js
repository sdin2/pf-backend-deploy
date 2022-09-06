const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { contactMail, rewardMail } = require('../controllers/MailController');
const router = Router();

router.post('/contact', async (req, res) => {
	const { name, email, subject, message } = req.body;
	try {
		await contactMail(name, email, subject, message);

		res.send('Message Successfully Sent!');
	} catch (error) {
		res.send('Message Could not be Sent');
	}
});

router.post('/reward', async (req, res) => {
	const { email } = req.body;
	try {
		await rewardMail(email);
		res.send('Mail succesfully sent!');
	} catch (error) {
		res.send('Your mail wasnt sent succesfully');
	}
});

module.exports = router;
