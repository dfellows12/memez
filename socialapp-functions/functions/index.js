const functions = require('firebase-functions');
const app = require('express')()
const FBAuth = require('./util/fbAuth')

const { getAllMemes, postOneMeme } = require('./handlers/memes')
const { signup, login } = require('./handlers/users')


//Scream routes
app.get('/memes', getAllMemes);
app.post('/meme', FBAuth, postOneMeme)

//Use routes
app.post('/signup', signup)
app.post('/login', login)   


exports.api = functions.https.onRequest(app);
