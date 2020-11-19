const functions = require('firebase-functions');

const express = require('express')
const app = express()
const body_parser = require('body-parser')

app.use(body_parser.json())
app.use((req, res, next) => {
    // website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    // set to true if you need the website to include cookies in the requests sent
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var data = {
    "code": ""
};


var hi = {
    "active": []
}
app.get('/a', (req, res) => {
    res.send(data)
})

app.post('/a', (req, res) => {

    var code = req.body
    data = code
    console.log(data)
    res.send(data)
    res.end()
})

app.get('/sample', (req, res) => {
    res.send("Hello World")
})

app.get('/data', (req, res) => {
    res.send(hi)
})

app.post('/data', (req, res) => {
    var e = req.body
    var d = e.active
    hi.active.push(d)
    hi.active.reverse()
    console.log(hi)
    res.send(hi)
})

app.listen(3000, () => {
    console.log('hello')
})
exports.helloWorld = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });