const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:1111@cluster0.c57watv.mongodb.net/')
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Error connecting to MongoDB:', err));