const express = require('express')
const body_parser = require('body-parser')
const fileupload = require('express-fileupload')
const app = express()

const f = require('fs')
const { pipeline } = require('stream')

app.use(fileupload())
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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ui.html')
})

app.get('/send', (req, res) => {
    res.sendFile(__dirname + '/send.html')
})

app.get('/recieve', (req, res) => {
    res.sendFile(__dirname + '/recieve.html')
})





app.post('/upload', (req, res) => {
    console.log(req.files)
    var file = req.files.f1
    file.forEach(element => {
        element.mv(__dirname + '/Data/' + element.name, (err) => {
            console.log(err)
        })
    });


    res.send('Upload Successfully.')
})

app.get('/rfiles', (req, res) => {
    var obj = []
    f.readdir(__dirname + '/Data', (err, fils) => {
        fils.forEach(fo => {
            obj.push(fo)
        })
        console.log(obj)
        res.send(obj)

    })
})

app.get('/download/:name', (req, res) => {
    var fname = req.params.name
    var fill = __dirname + '/Data/' + fname
    console.log(fill)
    res.sendFile(fill)
})
app.listen(4444, '0.0.0.0', () => {
    console.log('File transfer server started')
})