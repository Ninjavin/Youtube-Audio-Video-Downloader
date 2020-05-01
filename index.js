const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const port = process.env.PORT || 5000
const ytdl = require('ytdl-core')

app.get('/downloadVideo',(req, res) => {
    let { videoLink } = req.query
    let id = ytdl.getURLVideoID(videoLink)
    ytdl.getInfo(id, (err, info) => {
        if(err){
            console.log(err)
            throw err
        }
        else{
            res.header('Content-Disposition', 'attachment')
            res.header('Content-Type', 'video/mp4')
            ytdl(videoLink).pipe(res)
        }
    })
})

app.get('/downloadAudio',(req, res) => {
    let { audioLink } = req.query
    let id = ytdl.getURLVideoID(audioLink)
    ytdl.getInfo(id, (err, info) => {

        if(err){
            console.log(err)
            throw err
        }
        else{
            res.header('Content-Disposition', 'attachment')
            res.header('Content-Type', 'audio/mpeg')
            ytdl(audioLink, {filter: 'audioonly'}).pipe(res)
        }
    })
})

app.listen(port, () => {
    console.log(`Running on port: ${port}`)
})

