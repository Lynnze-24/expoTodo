import React, { createContext, useContext, useState,useEffect} from 'react'
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext();


export function useTaskContext(){
    return useContext(TaskContext)
}

export function TaskProvider({children,mock,val}) {
    // mock and val are for testing
    const initial = mock?mock : [];
    const [task, setTask] = useState(initial);
    const fetchTasks = mock||val? ()=>{return}:async() => {
        let localTasks= await AsyncStorage.getItem('TaskAHL') || null;
        if(localTasks){
            setTask(JSON.parse(localTasks));
        }
    }// second function is for testing 

    
    useEffect(()=> {
        fetchTasks()
    
    }, [])
    
    const addToTask = async(item)=>{
        let newTask = [...task,item]
        setTask(newTask)
        AsyncStorage.setItem('TaskAHL',JSON.stringify(newTask))
    }
    const removeFromTask = async(id)=>{
        let newTask = task.filter(x=> x.id!== id);
        setTask(newTask)
        AsyncStorage.setItem('TaskAHL',JSON.stringify(newTask))
    }

    const toggleCheck = async(id) =>{
        let newTask = [...task];
       let changedItem = newTask.find(x=> x.id=== id);
       changedItem.isChecked = !changedItem.isChecked;
       setTask(newTask);
       AsyncStorage.setItem('TaskAHL',JSON.stringify(newTask))
    }
    
    const value = val || {task,addToTask,removeFromTask,toggleCheck};
    
    return (
        <TaskContext.Provider value={value}>
        {children}
      </TaskContext.Provider>
    )
}