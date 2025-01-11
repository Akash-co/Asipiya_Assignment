const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'sys'
});

db.connect((err) => {
    if (!err) {
        console.log("Connected to database successfully");
    } else {
        console.log("Database Connection Failed:", err);
    }
});

// Add New Task
app.post('/new-task', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Title and Description are required" });
    }

    const query = 'INSERT INTO todos (title, description, createdAt, status) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, new Date(), 'active'], (err) => {
        if (err) {
            console.error('Failed to store:', err);
            return res.status(500).json({ error: 'Database error while storing task' });
        }

        console.log('Task saved');
        db.query('SELECT * FROM todos', (error, tasks) => {
            if (error) {
                return res.status(500).json({ error: 'Error fetching updated task list' });
            }
            res.json(tasks);
        });
    });
});

// Get All Tasks
app.get('/read-tasks', (req, res) => {
    db.query('SELECT * FROM todos', (err, tasks) => {
        if (err) {
            console.error("Failed to read tasks:", err);
            return res.status(500).json({ error: "Error fetching tasks" });
        }
        res.json(tasks);
    });
});

// Update Task
app.post('/update-task', (req, res) => {
    const { updateId, title, description } = req.body;
    if (!updateId || !title || !description) {
        return res.status(400).json({ error: "ID, Title, and Description are required" });
    }

    const query = 'UPDATE todos SET title = ?, description = ? WHERE id = ?';
    db.query(query, [title, description, updateId], (err) => {
        if (err) {
            console.error('Failed to update:', err);
            return res.status(500).json({ error: "Database error while updating task" });
        }

        console.log('Task updated');
        db.query('SELECT * FROM todos', (error, tasks) => {
            if (error) {
                return res.status(500).json({ error: "Error fetching updated tasks" });
            }
            res.json(tasks);
        });
    });
});

// Delete Task
app.post('/delete-task', (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "Task ID is required" });
    }

    const query = 'DELETE FROM todos WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Failed to delete:', err);
            return res.status(500).json({ error: "Database error while deleting task" });
        }

        console.log('Task deleted');
        db.query('SELECT * FROM todos', (error, tasks) => {
            if (error) {
                return res.status(500).json({ error: "Error fetching updated task list" });
            }
            res.json(tasks);
        });
    });
});

// Mark Task as Completed
app.post('/complete-task', (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "Task ID is required" });
    }

    const query = 'UPDATE todos SET status = ? WHERE id = ?';
    db.query(query, ['completed', id], (err) => {
        if (err) {
            console.error('Failed to mark as completed:', err);
            return res.status(500).json({ error: "Database error while updating status" });
        }

        console.log('Task marked as completed');
        db.query('SELECT * FROM todos', (error, tasks) => {
            if (error) {
                return res.status(500).json({ error: "Error fetching updated tasks" });
            }
            res.json(tasks);
        });
    });
});

// Start Server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
