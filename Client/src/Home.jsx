import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    // State variables to manage the current tab, task title, description, todos list, edit mode, and update task ID
    const [tab, setTab] = useState(1); // 1: All, 2: Active, 3: Completed
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    // Fetch tasks from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/read-tasks')
        .then(res => {
            setTodos(res.data);
        });
    }, []);

    // Handle tab switching
    const handleTabs = (tab) => {
        setTab(tab);
    };

    // Handle adding a new task
    const handleAddTask = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/new-task', { title, description })
        .then(res => {
            setTodos(res.data);
            setTitle('');
            setDescription('');
        });
    };

    // Handle editing an existing task
    const handleEdit = (id, title, description) => {
        setIsEdit(true);
        setTitle(title);
        setDescription(description);
        setUpdateId(id);
    };

    // Handle updating an existing task
    const updateTask = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/update-task', { updateId, title, description })
        .then(res => {
            setTodos(res.data);
            setTitle('');
            setDescription('');
            setIsEdit(false);
        });
    };

    // Handle deleting a task
    const handleDelete = (id) => {
        axios.post('http://localhost:5000/delete-task', { id })
        .then(res => {
            setTodos(res.data);
        });
    };

    // Handle marking a task as complete
    const handleComplete = (id) => {
        axios.post('http://localhost:5000/complete-task', { id })
        .then(res => {
            setTodos(res.data);
        });
    };

    // Filter todos based on the selected tab
    const filteredTodos = todos?.filter(todo => {
        if (tab === 1) return true; // Show all tasks
        if (tab === 2) return todo.status !== 'completed'; // Show active tasks
        if (tab === 3) return todo.status === 'completed'; // Show completed tasks
        return true;
    });

    return (
        <div className='bg-gray-100 w-screen h-screen flex flex-col items-center justify-center'>
            <h2 className='font-bold text-2xl mb-4'>ToDo List</h2>
            
            {/* Form to add or update a task */}
            <form className='flex gap-2' onSubmit={isEdit ? updateTask : handleAddTask}>
                <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    type='text' 
                    placeholder='Title' 
                    className='w-40 p-2 border border-blue-300 rounded-md' 
                    required 
                />
                <input 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    type='text' 
                    placeholder='Description' 
                    className='w-52 p-2 border border-blue-300 rounded-md' 
                    required 
                />
                <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md'>
                    {isEdit ? 'Update' : 'Add'}
                </button>
            </form>

            {/* Tabs to filter tasks */}
            <div className='flex text-sm w-80 justify-evenly mt-4'>
                <p onClick={() => handleTabs(1)} className={`${tab === 1 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>All</p>
                <p onClick={() => handleTabs(2)} className={`${tab === 2 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>Active</p>
                <p onClick={() => handleTabs(3)} className={`${tab === 3 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>Completed</p>
            </div>

            {/* List of filtered tasks */}
            {filteredTodos?.map(todo => (
                <div key={todo.id} className='bg-white p-3 w-80 mt-3 rounded-md'>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col w-full'>
                            <p className='text-lg font-semibold'>{todo.title}</p>
                            <p className='text-sm text-gray-700'>{todo.description}</p>
                            <p className='text-xs text-gray-500'>{new Date(todo.createdAt).toLocaleString()}</p>
                        </div>
                        <div className='flex flex-col items-end space-y-1'>
                            {todo.status !== 'completed' && (
                                <button className='text-green-600' onClick={() => handleComplete(todo.id)}>Complete</button>
                            )}
                            {todo.status !== 'completed' && (
                                <button className='text-blue-600' onClick={() => handleEdit(todo.id, todo.title, todo.description)}>Edit</button>
                            )}
                            <button className='text-red-500' onClick={() => handleDelete(todo.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
