const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const users = {
    users_list:
        [
            {
                id: 'xyz789',
                name: 'Charlie',
                job: 'Janitor',
            },
            {
                id: 'abc123',
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                id: 'ppp222',
                name: 'Mac',
                job: 'Professor',
            },
            {
                id: 'yat999',
                name: 'Dee',
                job: 'Aspring actress',
            },
            {
                id: 'zap555',
                name: 'Dennis',
                job: 'Bartender',
            },
            {
                id: 'wow333',
                name: 'Topher',
                job: 'daddy',
            }
        ]
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello!");
});

// app.get('/users', (req, res) => {
//     const name = req.query.name;
//     if (name != undefined) {
//         let result = findUserByName(name);
//         result = { users_list: result };
//         res.send(result);
//     }
//     else {
//         res.send(users);
//     }
// });

// const findUserByName = (name) => {
//     return users['users_list'].filter((user) => user['name'] === name);
// }

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = { users_list: result };
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find((user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    }
    else {
        res.send(users);
    }
});

const findUserByNameAndJob = (name, job) => {
    return users['users_list'].filter((user) => user['name'] === name && user['job'] === job);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    var user = addUser(userToAdd);
    res.status(201).send(user).end();
});


function addUser(user) {
    user.id = guidGenerator();
    users['users_list'].push(user);
    return user;
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    const userToRemove = findUserById(id);
    if(userToRemove === undefined || userToRemove.length === 0) {
        res.status(404).send("Resource not found.");
    }
    else {
        const index = users['users_list'].indexOf(userToRemove);
        users['users_list'].splice(index, 1);
        res.status(204).send("User Removed.").end();
    }
})

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});