import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import RegisterUserData from '../firestore';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    height: 0,
    weight: 0,
    city: '',
  });

  useEffect(() => {
    // Verificar conectividade quando o componente é montado
    handleNetworkConnectivity();
  }, []);

  const calcularIMC = async () => {
    const { height, weight } = userData;

    if (height > 0 && weight > 0) {
      const alturaMetros = height / 100;
      const imc = (weight / (alturaMetros * alturaMetros)).toFixed(2);

      const data = { ...userData, imc: imc };

      // Verificar se há conectividade antes de decidir enviar para o Firebase ou salvar localmente
      const isConnected = await handleNetworkConnectivity();
      
      if (isConnected) {
        RegisterUserData(data);
      } else {
        saveToCache(data);
      }

      setUserData((prevUserData) => ({
        ...prevUserData,
        name: '',
        height: 0,
        weight: 0,
        city: '',
      }));

      navigation.navigate('Details');
    } else {
      // Tratamento para valores inválidos
      console.log('Por favor, insira valores válidos para altura e peso.');
    }
  };

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleNetworkConnectivity = async () => {
    const netInfoState = await NetInfo.fetch();
    const isConnected = netInfoState.isConnected;

    if (!isConnected) {
      console.log('Sem conexão com a internet.');
    }

    return isConnected;
  };

  const saveToCache = async (data) => {
    try {
      const cachedData = await AsyncStorage.getItem('imcData') || '[]';
      const cachedArray = JSON.parse(cachedData);
      cachedArray.push(data);

      await AsyncStorage.setItem('imcData', JSON.stringify(cachedArray));
      console.log('Dados salvos localmente');
    } catch (error) {
      console.error('Erro ao salvar dados localmente:', error);
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculadora de IMC</Text>

        <Text style={styles.label}>Insira qual o seu nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={userData.name}
          placeholderTextColor="white"
          onChangeText={(text) => handleChange('name', text)}
        />

        <Text style={styles.label}>Insira qual a sua altura</Text>
        <TextInput
          style={styles.input}
          value={userData.height}
          placeholder="Altura (cm)"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={(text) => handleChange('height', parseFloat(text))}
        />

        <Text style={styles.label}>Insira qual o seu peso</Text>
        <TextInput
          style={styles.input}
          value={userData.weight}
          placeholder="Peso (kg)"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={(text) => handleChange('weight', parseFloat(text))}
        />

        <Text style={styles.label}>Insira qual a sua cidade</Text>
        <TextInput
          style={styles.input}
          value={userData.city}
          placeholder="Cidade"
          placeholderTextColor="white"
          onChangeText={(text) => handleChange('city', text)}
        />

        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default HomeScreen;
