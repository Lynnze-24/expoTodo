import React from 'react'
import { View, Text,StyleSheet,FlatList} from 'react-native'
import EmptyTask from '../../components/EmptyTask'
import Task from '../../components/Task'
import TaskContainer from '../../containers/TaskContainer'
import { useTaskContext } from '../../hooks/TaskContext'



const Complete = () => {
    const renderItem = ({ item }) => <Task name={item.name} isChecked={item.isChecked} id={item.id} key={item.id}/>;
    const {task} = useTaskContext()
    const completedTasks = task.filter(x=> x.isChecked)
    return (
       <TaskContainer  testID='CompleteScreen'>
           {completedTasks.length?
           (<FlatList data={completedTasks} renderItem={renderItem} keyExtractor={item => item.id} />)
           :(<EmptyTask text="There is no completed task" />)
        }
           
            
        </TaskContainer>
    )
}




export default Complete
