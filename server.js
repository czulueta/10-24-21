const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const { Z_NO_COMPRESSION } = require("zlib")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/tododb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, () => console.log("connected to the database")
)

app.use("/auth", require("./routes/authRouter.js"))
app.use("/todo", require("./routes/todoRouter.js"))

app.use((err, req, res, next) => {
    return res.send({ errMsg: err.message })
})

app.listen(9000, () => {
    console.log("successfully running on port 9000")
})