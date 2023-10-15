//MiddleWear Example
const express = require("express");

const host = "localhost";  //127.0.0.1

const port = 3000;

const app = express();

app.use(express.json());

const todos = ["write blog", "Trek", "Teach"];

const requestMiddleware = (req, res, next) => {
    console.log(`HEADER:: ${JSON.stringify(req, header)}
    PATH:: ${req.path}
    BODy:: ${JSON.stringify(req.body)}`);

    next();
};

app.use(requestMiddleware);

const checkGender = (req, res, next) => {
    if (req.body.gender) {
        req.gender = "F";
        next();
    } else {
        res.status(404).send("You are MALE");
    }
}

app.get("/todo", checkGender, (req,res) =>{
    res.send({ todos,message: `Accessed by : ${req.gender}`});
})

app.post("/todo", (req,res) =>{
    const todo = req.body.todo;
    todos.push(todo);
    res.send({todos, message:`Accessed by : ${req.gender}`});
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})