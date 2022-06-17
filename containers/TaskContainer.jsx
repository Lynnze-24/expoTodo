import React from 'react'
import { View,StyleSheet } from 'react-native'
import cusTheme from '../theme/Theme'

const TaskContainer = ({children,testID}) => {
    const taskid = testID? testID:'TaskCon'; 
    return (
        <View testID={taskid} style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:cusTheme.bg,
      flex:1,
      paddingHorizontal:20
    },
})

export default TaskContainer;
