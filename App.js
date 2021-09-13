import React from 'react';
import Home from './screens/Home';
import Detail from './screens/Detail';
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
          headerTintColor: 'red',
          header: () => <NavBar />,
        }}
        />
       <Stack.Screen name='Detail' component={Detail} options={{headerTintColor: 'red'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;