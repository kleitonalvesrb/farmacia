import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListaMedicamentos from './src/listamedicamentos';
import Medicamento from './src/medicamento';

const App = ()=>{
  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista Medicamentos" component={ListaMedicamentos}/>
        <Stack.Screen name="Medicamento" component={Medicamento}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;