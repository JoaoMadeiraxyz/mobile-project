import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.label}>Insira qual o seu nome</Text>
      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="white" />

      <Text style={styles.label}>Insira qual a sua altura</Text>
      <TextInput style={styles.input} placeholder="Altura" placeholderTextColor="white" />

      <Text style={styles.label}>Insira qual o seu peso</Text>
      <TextInput style={styles.input} placeholder="Peso" placeholderTextColor="white" />

      <Text style={styles.label}>Insira qual a sua cidade</Text>
      <TextInput style={styles.input} placeholder="Cidade" placeholderTextColor="white" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '80%',
    padding: 10,
    color: 'white',
    marginBottom: 36,
    placeholderTextColor: "#CCCCCC",
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#6217b3',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
