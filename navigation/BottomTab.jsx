import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import All from '../screens/todo/All';
import Complete from '../screens/todo/Complete';
import Incomplete from '../screens/todo/Incomplete';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons'; 
import theme from '../theme/Theme';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTab() {
  
  return (
    <Tab.Navigator 
        initialRouteName="All"
        activeColor={theme.secondary}
        inactiveColor={theme.disabled}
        shifting='true'
        
        barStyle={{ backgroundColor: theme.primary}}>
      <Tab.Screen 
        name="All" 
        component={All} 
        
        options={{
          tabBarLabel: 'All',
          tabBarTestID:'AllBtn',
          tabBarIcon: ({ color,focused }) => (
            <MaterialCommunityIcons  name="home" size={26} color={color} />)}}
            />
      <Tab.Screen 
        name="Completed" 
        component={Complete} 
        options={{
          tabBarLabel: 'Completed',
          tabBarTestID:'CompleteBtn',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons  name="playlist-check" size={27} color={color}  />
          ),}}/>
      <Tab.Screen
        name="Imcomplete" 
        component={Incomplete} 
        options={{
          tabBarLabel: 'Incomplete',
          tabBarTestID:'IncompleteBtn',
          tabBarIcon: ({ color,focused }) => (
            <FontAwesome  name="tasks" size={16} color={color}  style={{marginTop:4}}/>
          ),}}/>
    </Tab.Navigator>
  );
}

