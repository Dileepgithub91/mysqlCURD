const express = require("express");
const app = express();

app.use(express.json());
const port = 3004;
const connection = require('./connection');

// Create  with validation
app.post('/create', (req, res) => {
    const { Name, Email, phone, gender } = req.body;

    if (!Name || !Email || !phone || !gender) {
        res.status(400).json({ error: 'Missing required fields' });
    } else {
        const query = 'INSERT INTO custom (Name, Email, phone, gender) VALUES (?, ?, ?, ?)';
        connection.query(query, [Name, Email, phone, gender], (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error creating user' });
            } else {
                res.status(201).send({ message: 'User created successfully'});
            }
        });
    }
});

//get 
app.get('/read',(req,res)=>{
    const query='SELECT * FROM custom';
    connection.query(query,(err,results)=>{
        if(err){
            res.status(500).send({error:'Error Retrieve user'});

        }
        else{
            res.status(200).send(results);
        }
    });
});

// Update  with validation
app.put('/update/:userPhone', (req, res) => {
    const userPhone = req.params.userPhone;
    const { Name, Email, phone, gender } = req.body;

    if (!Name || !Email || !phone || !gender) {
        res.status(400).send({ error: 'Missing required fields' });
    } else {
        const query = 'UPDATE custom SET Name=?, Email=?, phone=?, gender=? WHERE phone=?';
        connection.query(query, [Name, Email, phone, gender, userPhone], (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error updating custom' });
            } else {
                res.status(200).send({ message: 'User updated successfully' });
            }
        });
    }
});

// Delete 
app.delete('/delete/:userPhone', (req, res) => {
    const userPhone = req.params.userPhone;

    if (!userPhone) {
        res.status(400).send({ error: 'Missing user phone number' });
    } else {
        const query = 'DELETE FROM custom WHERE phone=?';
        connection.query(query, [userPhone], (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error deleting user' });
            } else {
                res.status(200).send({ message: 'User deleted successfully' });
            }
        });
    }
});



// Create server
app.listen(port, (err) => {
    if (err) throw err;
    else console.log("Server is running at port", port);
});
