const axios = require('axios');
require('dotenv').config();
const nodeMail = require('nodemailer');

async function contactMail(name, email, subject, message) {
try {
	const transporter = await nodeMail.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.PASSWORD,
		},
	});
	const mailOption = {
		from: process.env.GMAIL_USER,
		to: process.env.GMAIL_USER,
		subject: subject,
		html: `You got a message from 
     ${email}
     ${name}
     ${message}`,
	};
	
		await transporter.sendMail(mailOption);
		return Promise.resolve('Message Sent Successfully!');
	} catch (error) {
		return Promise.reject(error);
	}
}

async function rewardMail(email) {
	const transporter = await nodeMail.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.PASSWORD,
		},
	});
	const mailOption = {
		from: process.env.GMAIL_USER,
		to: email,
		subject: 'Reward claimed!',
		html: `Your reward was claim succesfully your code is: ${process.env.CODE}`,
	};
	try {
		await transporter.sendMail(mailOption);
		return Promise.resolve('Message Sent Successfully!');
	} catch (error) {
		return Promise.reject(error);
	}
}

module.exports = {
	contactMail,
	rewardMail,
};
