import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

import getUsers, { getUserById, createUser, updateUser, deleteUser } from './queries.js';

console.log(getUsers);


dotenv.config();

const port = process.env.PORT || 5432;
const app = express();

// console.log(app);
// console.log(process.env.env_user)

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', getUsers)
app.get('/users/:id', getUserById)
app.post('/users', createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})