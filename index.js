const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrpytjs');
const db = require('./database/dbConfig.js');

const server = express();

// This line needed for POST requests
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.post('/api/register', (req, res) => {
    // Grab req.body for user data
    const user = req.body;
    user.password = bcrpyt.hashSync(user.password);
    // Use knex to insert into DB
    db('users').insert(user)
        .then(id => {
            res.status(201).send({id: ids[0]});
        })
        .catch(err => {
            res.status(500).send(err);
        });
    
});

server.post('/api/login', (req, res) => {
    // Verify username & password exists AND match
    // Never set a raw password in a data base
    const bodyUser = req.body;
    db('users').where('username', bodyUser.username)
    .then(users => {
        if (users.length && user.password === users[0].password){
            res.json({info: "Correct info bro"});
        } else {
            res.status(404).json({err: "Bad info"});
        }
    })
    .catch(err => {

     });
});

// protect this route, only authenticated users should see it
server.get('/api/users', (req, res) => {
  db('users')
    .select('id', 'username')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(3300, () => console.log('\nrunning on port 3300\n'));
