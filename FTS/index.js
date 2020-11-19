const e = require('express')
const express = require('express')
const app = express()
const fileupload = require('express-fileupload')
const fs = require('fs')

app.use(fileupload())

var html1 = '<a href="'
var html2 = '"'
var html4 = '>'
var html3 = '</a><br><br>'
var html5 = '<hr><hr>For Multiple Files...<hr><form action="/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ" enctype="multipart/form-data" method="POST"><input type="file" name="f1" multiple><button type="submit">Upload</button></form>'
var html6 = '<hr><hr>For Single Files...<hr><form action="/ewfnwfretergergrg5t4tregrgregreg" enctype="multipart/form-data" method="POST"><input type="file" name="f1"><button type="submit">Upload</button></form>'

var dir = process.argv.slice(2)[0] + ':'
console.log(dir)

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


app.use('/data', (req, res) => {
    var path = '';
    if (req.url != 'favicon.ico') {
        path = req.url
        if (path.includes('%20')) {
            path = path.replace(/%20/g, ' ')
        }
    }
    console.log(path)
    var f = fs.statSync(dir + path)
    if (f.isFile()) {
        res.sendFile(dir + path)
        return
    }


    fs.readdir(dir + path, (err, files) => {
        if (err) {
            res.send(err)
        }
        console.log(files)
        console.log('hi')

        var text = '';
        files.forEach(element => {
            if (element == 'System Volume Information' || element == '$RECYCLE.BIN') {

            } else {
                if (path == '/') {
                    path = ''
                }
                var stata = fs.statSync(dir + path + '/' + element)
                if (stata.isFile()) {
                    text = text + html1 + '/data' + path + '/' + element + html2 + 'download' + html4 + element + html3
                } else {
                    text = text + html1 + '/data' + path + '/' + element + html2 + html4 + element + html3
                }


            }
        });



        text = text + html5 + html6
        console.log(text)

        res.send(text)

    })
})


app.post('/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ', (req, res) => {
    //console.log(req.files)
    var file = req.files.f1

    console.log(file)

    file.forEach(element => {
        element.mv(dir + '/FTS/' + element.name, (err) => {
            console.log(err)
        })
    });



    res.send('Upload Successfully.')
})


app.post('/ewfnwfretergergrg5t4tregrgregreg', (req, res) => {
    var element = req.files.f1

    console.log(element)

    element.mv(dir + '/FTS/' + element.name, (err) => {
        console.log(err)
    })




    res.send('Upload Successfully.')
})



app.listen('2222', '0.0.0.0', () => {

    console.log('server listening at 2222')
})