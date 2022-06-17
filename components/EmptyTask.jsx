import React from 'react'
import { View, Text } from 'react-native'

const EmptyTask = ({text}) => {
    return (
        <View testID='emptyTask' style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>{text}</Text>
        </View>
    )
}

export default EmptyTask;
