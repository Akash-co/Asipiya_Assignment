
# Asipiya_Assignment

# ToDo List Application

## Description
This is a full-stack ToDo List application built using **React.js** for the frontend and **Node.js with Express.js and MySQL** for the backend. It allows users to create, update, complete, and delete tasks.

---

## Features
- Add new tasks with a title and description.
- View all tasks.
- Filter tasks by **All**, **Active**, and **Completed**.
- Edit tasks.
- Mark tasks as completed.
- Delete tasks.

---

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MySQL
- **Database:** MySQL

---

## Installation Guide

### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo/todo-app.git
cd todo-app
```

### **2. Backend Setup**
#### Install dependencies:
```sh
cd backend
npm install
```
#### Configure MySQL Database:
- Open MySQL and create a database:
  ```sql
  CREATE DATABASE sys;
  ```
- Run the following SQL command to create the `todos` table:
  ```sql
  CREATE TABLE todos (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    description VARCHAR(100) NOT NULL,
    createdAt DATE NOT NULL,
    status VARCHAR(45) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id)
);

  ```
   ```
 Update database credentials in **`server.js`**
  js ```
 
  const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root123',
      database: 'sys'
  });
 ``` ```
  

#### Start the Backend Server:
```sh
npm start
```
Your backend should now be running on **http://localhost:5000**

---

### **3. Frontend Setup**
#### Install dependencies:
```sh
cd frontend
npm install
```
#### Start the Frontend:
```sh
npm start
```
Your frontend should now be running on **http://localhost:3000**

---

## API Endpoints
| Endpoint          | Method | Description |
|------------------|--------|-------------|
| `/read-tasks`    | GET    | Fetch all tasks |
| `/new-task`      | POST   | Add a new task |
| `/update-task`   | POST   | Update a task |
| `/delete-task`   | POST   | Delete a task |
| `/complete-task` | POST   | Mark a task as completed |

---

## Usage
1. Open **http://localhost:3000** in your browser.
2. Add tasks using the input fields.
3. Use the **Active** and **Completed** tabs to filter tasks.
4. Click **Complete** to mark a task as completed.
5. Click **Edit** to modify a task.
6. Click **Delete** to remove a task.

---

## Troubleshooting
- **Database connection issue?** Ensure MySQL is running and credentials are correct.
- **Frontend not loading?** Run `npm install` in the frontend directory.
- **Backend not responding?** Restart the server using `npm start`.

---

## Author
- **Kaanushan Sivarasah**
- [GitHub](https://github.com/your-github)
- [LinkedIn](https://linkedin.com/in/your-profile)

---

## License
This project is licensed under the MIT License.
