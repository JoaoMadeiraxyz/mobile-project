// App.js
import React  from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/home';
import RankScreen from './components/ranks';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Tela Inicial',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                <Text style={styles.button}>Detalhes</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Details" component={RankScreen} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    fontWeight: 500,
    color: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
export default App;
