import React from 'react'
import {FlatList} from 'react-native'
import EmptyTask from '../../components/EmptyTask'
import Task from '../../components/Task'
import TaskContainer from '../../containers/TaskContainer'
import { useTaskContext } from '../../hooks/TaskContext'




const All = ({mock}) => {
    // mock is for testing
    const renderItem = ({ item }) => <Task mock={mock?true:false}  name={item.name} isChecked={item.isChecked} id={item.id} key={item.id}/>;
    const {task} = useTaskContext()
    return (
       <TaskContainer testID='AllScreen'>
            {task.length?
           (<FlatList data={task} renderItem={renderItem} keyExtractor={item => item.id} />)
           :(<EmptyTask text="There is no task" />)
        }
        </TaskContainer>
    )
}




export default All
