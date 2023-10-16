//TODO App
const express = require("express");
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const port = 5001;
const JWT_SECRET = "ASDFGHJKL"
let todos = [];
let tokens = [];

/*login
usernme: 
password:
*/
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username or Password is missing");
    }

    if (username !== "aftaf" || password !== 'Changeme') {
        return res.status(401).send("Username or password doesnot match");
    }

    //create Token
    const token = jwt.sign({username},JWT_SECRET );
    tokens.push(token);


    res.status(200).send({token, message: `Successfully Loggedin with user ${username}`});
});


/*logout

*/

//Creating a todo 
app.post('/todo', (req, res) => {
    console.log(req.body);
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({
            message: "Title is missing"
        })
    }
    const todo = {
        title: title,
        id: Date.now()
    }
    todos.push(todo)
    res.status(201).json({
        message: `Todo created successfully`,
        todo: todo
    })
})

//Read todo 
app.get('/todo', (req, res) => {
    res.status(200).json({
        message: "Success",
        todos: todos
    })
})


//Read todo by Id
app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(item => {
        //console.log("ITEM: ",item);
        return item.id == id;
    });
    if (!todo) {
        return res.status(404).json({
            message: `todo with ${id} not found`
        })
    }
    res.status(200).json({
        message: `Todo with ${id} successfully found`,
        todo: todo
    })
})
//Update the existing todo
app.put('/todo/:id', (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
    const exist = todos.find(todo => {
        return todo.id == id;
    });
    if (!exist) {
        return res.status(404).json({
            message: `todo with ${id} not found`
        })
    }
    const newTodos = todos.map(item => {
        if (item.id == id) {
            item.title = title
        }
        return item
    })
    todos = newTodos;

    res.status(200).json({
        message: `todo with id: ${id} is updated`,
        todos: todos
    })
})


//Delete the existing todo
app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    const exist = todos.find(todo => todo.id == id)
    if (!exist) {
        return res.status(404).json({
            message: `todo with ${id} not exist`
        })
    }
    const newTodos = todos.filter(todo => {
        return todo.id != id
    })
    todos = newTodos;
    console.log(todos)

    res.status(200).json({
        message: "Successfully Deleted"
    })
})


//listener
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})