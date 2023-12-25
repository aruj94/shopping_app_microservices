import Express from "express";

const app = Express();
app.use(Express.json());

app.use('/', (req, res, next) => {
    return res.status(200).json({"msg": "hello"})
})

app.listen(8002, () => {
    console.log('listening to port 8002')
})