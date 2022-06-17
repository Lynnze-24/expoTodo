import React,{useState} from 'react'
import { View, Text,StyleSheet,Keyboard} from 'react-native'
import { TextInput,IconButton } from 'react-native-paper';
import { useTaskContext } from '../hooks/TaskContext';
import cusTheme from '../theme/Theme';
import uuid from 'react-native-uuid';
// import { Feather } from '@expo/vector-icons';

const Topbar = () => {
    const [text, setText] = useState("");
    const [error, setError] = useState(null);
    const {addToTask} = useTaskContext();
    
    const addNewTask = ()=>{
        if(text===''){
            setError('Please type something')
            return Keyboard.dismiss();
        }
        let newItem = {
            id:uuid.v4(),
            isChecked:false,
            name:text
        }
        addToTask(newItem);
        setText("");
        Keyboard.dismiss()
        if(error){
            setError(null)
        }
        
    }

    const keyPressHandle = function(e){
        if(e.nativeEvent.key === "Enter"){
            addNewTask()
        }
    }



    return (
        <View style={styles.container} >
            <TextInput
            onKeyPress={keyPressHandle }
            dense={true}
            mode='outlined'
            placeholder='Write a todo'
           style={styles.textInput}
            value={text}
            outlineColor={error?cusTheme.danger:cusTheme.primary}
            onChangeText={text => setText(text)}
            activeOutlineColor={error?cusTheme.danger:cusTheme.lpr}
            testID='textInput'
            />
           { error && (<Text testID='errorMessage' style={styles.error}>{error}</Text>)}
             <IconButton
             style={styles.iconButton}
                icon="plus"
                type="MaterialCommunityIcons"
                color={cusTheme.primary}
                size={20}
                onPress={addNewTask}
                testID='plusButton'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:cusTheme.bg,
      padding:20,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      position:'relative',
    },
    iconButton:{
        width:40,
        height:40,
        marginTop:10,
        marginLeft:10,
        borderColor:cusTheme.primary,
        borderWidth:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    textInput:{
        flex:1,
        backgroundColor:'transparent',
        
    },
    error:{
        position:'absolute',
        top:75,
        left:20,
        color:cusTheme.danger,
    },
});

export default Topbar;
