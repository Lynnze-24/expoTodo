import React from 'react'
import { View, Text } from 'react-native'
import { useDevice } from '../hooks/Device'

const DeviceTestComponent = () => {
    const {isWeb,isAndroid,isIOS} = useDevice()
    return (
        <View>
           {isWeb && (<Text>web</Text>)} 
           {isAndroid && (<Text>android</Text>)} 
           {isIOS && (<Text>ios</Text>)} 
        </View>
    )
}

export default DeviceTestComponent
