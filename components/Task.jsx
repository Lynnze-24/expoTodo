import React,{useState} from 'react'
import { View, Text,StyleSheet,Alert,TouchableOpacity } from 'react-native'
import { Checkbox, IconButton } from 'react-native-paper';
import cusTheme from '../theme/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useTaskContext } from '../hooks/TaskContext';
import { useDevice } from '../hooks/Device';







const Task = ({name,isChecked,id,mock}) => {
//    mock is for testing cases
   
    const {toggleCheck,removeFromTask} = useTaskContext();
    const {isWeb} = useDevice()

    const confirmDelete = () =>{
        Alert.alert('', 'Are you sure to delete this item?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => removeFromTask(id) },
          ]);
    }

    const deleteWeb = ()=> removeFromTask(id)



    
   
    return (
        <View testID='task' style={styles.container}>
            <Checkbox.Android testID='checkbox' onPress={()=> toggleCheck(id) }  status={isChecked?'checked':'unchecked'}  color={cusTheme.primary}/>
            <Text testID='todoText' style={[styles.text,isChecked && styles.completed]}>{name}</Text>
            {mock?(<TouchableOpacity testID='delete'  onPress={isWeb?deleteWeb: confirmDelete}></TouchableOpacity>)
            :(<MaterialCommunityIcons  onPress={isWeb?deleteWeb: confirmDelete} style={styles.icon} name="delete" size={24} color={cusTheme.primary} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:3,
        borderColor:cusTheme.primary,
        borderRadius:10,
        borderWidth:1,
        marginVertical:5,
    },
    text:{
        fontSize:18,
    },
    completed:{
        textDecorationLine:'line-through'
    },
    icon:{
        position:'absolute',
        right:10,
        top:8,
    },
})

export default Task;
