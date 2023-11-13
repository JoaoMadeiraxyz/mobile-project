import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Insira qual a sua altura</Text>
      <TextInput style={styles.input} placeholder="Altura" placeholderTextColor="white" />

      <Text style={styles.label}>Insira qual o seu peso</Text>
      <TextInput style={styles.input} placeholder="Peso" placeholderTextColor="white" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '80%',
    padding: 10,
    color: 'white',
    marginBottom: 24,
  },
  button: {
    backgroundColor: 'blue', // Cor do botão, ajuste conforme necessário
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
