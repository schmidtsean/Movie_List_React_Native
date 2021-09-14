import React from 'react';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Search from './screens/Search';
import NavBar from './components/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const App = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen 
        name='Home'  
        component={Home} 
        options={{
          header: ({navigation}) => <NavBar navigation={navigation} />
        }}
        />
       <Stack.Screen 
          name= 'Detail'
          component={Detail} 
          options={{
            headerTintColor: 'black'
      }} />
      <Stack.Screen 
          name= 'Search'
          component={Search} 
          options={{
            headerTintColor: 'black'
      }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;