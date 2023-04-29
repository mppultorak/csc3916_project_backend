import express  from "express"
import mongoose from "mongoose"
import Cors from 'cors'
import Videos from './dbmodel.js'

const app = express()
app.use(express.json())
app.use(Cors())
const port = process.env.PORT || 8080
const connection_url = 'mongodb+srv://API:secretpassword@webapi.pk3rdpf.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body
    Videos.create(dbVideos)
    .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        res.status(500).send(err)
      }) 
})

app.get("/vs/posts", (req, res) => {
    Videos.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.listen(port, () => console.log("Listening on port:", port))