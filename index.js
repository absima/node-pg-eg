import express from 'express';
import pg from 'pg';
import * as dotenv from 'dotenv';
// import createTable from './createTable.js';

dotenv.config();

const port = process.env.PORT || 5432;
const { Pool, Client } = pg;
const app = express();

// console.log(app);
// console.log(process.env.env_user)

const pool = new Pool({
  user: process.env.env_user,
  host: process.env.env_host, 
  database: process.env.env_database,
  password: process.env.env_password,
  port: port
})

// pool.query('select * from users', (err, res) => {
//   app.get('/users', (rq, re) => re.send(createTable(res)))
// })

// // getting the tables
app.get(`/users`, (rq, re) => 
  pool.query(`select * from users`, (err, res) => 
    re.send(createTable(res)))
);

app.get(`/orders`, (rq, re) => 
  pool.query(`select * from orders`, (err, res) => 
    re.send(createTable(res)))
)

// // getting by ID
app.get(`/users/:id`, (rq, re) => 
  pool.query(`select * from users where id=$1`, [rq.params.id], 
    (err, res) => re.send(createTable(res)) ));

app.get(`/orders/:id`, (rq, re) => 
  pool.query(`select * from orders where id=$1`, [rq.params.id], 
    (err, res) => re.send(createTable(res)) ));

// // adding new entries
const [usrID, firstName, lastName, age, active] = [4, 'x','y', 100, true];
app.post(`/users`, (rq, re) => 
  pool.query(`insert into users values ($1,$2,$3,$4,$5)`,  
               [usrID, 
                firstName,
                lastName,
                age,
                active], 
    (err, res) => re.send(createTable(res)) ));

const [orderID, price, date, userID] = [5, 20, 'Sat Jan 02 2021', 3];
app.post(`/orders`, (rq, re) => 
  pool.query(`insert into users values ($1,$2,$3,$4)`,
              [ orderID, 
                price,
                date,
                userID] , 
    (err, res) => re.send(createTable(res)) ));    

// // updating
app.put(`/users/:id`, (rq, re) => 
  pool.query(`select * from users where id=$1`, [rq.params.id], 
    (err, res) => re.send(createTable(res)) ));

app.put(`/orders/:id`, (rq, re) => 
  pool.query(`select * from orders where id=$1`, [rq.params.id], 
    (err, res) => re.send(createTable(res)) ));

// // deleting
app.delete(`/users/:id`, (rq, re) => 
  pool.query(`select * from users where id=$1`, [rq.params.id], 
    (err, res) => re.send(createTable(res)) ));

app.delete(`/orders/:id`, (rq, re) => 
  pool.query(`select * from orders where id=$1`, [rq.params.id], 
    (err, res) => re.send(createTable(res)) ));

// // listening
app.listen(port, () => 
  console.log(`Server running on port ${port}`)
)


// // to create a visual html table
const createTable = (res) => {
  let b = 
    `<table>
      <tr>
    `
  res.fields.forEach(item => {
  b+= `<th> ${item.name} </th>`
  })
  b+= `</tr>`
  res.rows.forEach(item => {
  const itval = Object.values(item);
  b+= `<tr>`
  itval.forEach(itm => {
    b+= `<td> ${itm} </td>`
  })
  b+= `</tr>`
  })
  b+= `</table>`
  return b
}