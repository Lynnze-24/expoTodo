import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text} from 'react-native';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from './navigation/BottomTab';

import { NavigationContainer } from '@react-navigation/native';
import { useDevice } from './hooks/Device';
import Topbar from './components/Topbar';
import cusTheme from './theme/Theme';
import { TaskProvider } from './hooks/TaskContext';

export default function App() {
  const{isWeb} = useDevice();
  return (

    <SafeAreaProvider style={{backgroundColor:'black'}}>
      <NavigationContainer >
        <TaskProvider>
         <SafeAreaView style={[styles.container,{width:'100%',maxWidth:isWeb?600:'100%',alignSelf:'center'}]}>
           <StatusBar/>
           <Topbar/>
            <BottomTab/>
         </SafeAreaView>
         </TaskProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: cusTheme.bg,
    
  }
});
