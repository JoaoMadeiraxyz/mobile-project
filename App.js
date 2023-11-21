import React, { useEffect, useState } from 'react';
import { View, Text, Picker, TouchableOpacity, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import RegisterUserData from './firestore';
import { ListUsersData, DeleteUserData } from './firestore';

const Stack = createStackNavigator();

const App = () => {
  const [userData, setUserData] = useState({
    name: '',
    height: 0,
    weight: 0,
    city: '',
    sexo: '',
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await ListUsersData();
    setData(result);
  };

  const handleCalcularIMC = async () => {
    const { height, weight } = userData;

    if (height > 0 && weight > 0) {
      const alturaMetros = height / 100;
      const imc = (weight / (alturaMetros * alturaMetros)).toFixed(2);

      const newData = { ...userData, imc: imc };

      const isConnected = await handleNetworkConnectivity();

      if (isConnected) {
        await RegisterUserData(newData);
        await removeFromCache(newData);
      } else {
        saveToCache(newData);
      }

      setUserData((prevUserData) => ({
        ...prevUserData,
        name: '',
        height: 0,
        weight: 0,
        city: '',
        sexo: '',
      }));

      fetchData();
    } else {
      console.log('Por favor, insira valores válidos para altura e peso.');
    }
  };

  const deletarDados = async (id) => {
    await DeleteUserData(id);
    fetchData();
  }

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

  const removeFromCache = async (dataToRemove) => {
    try {
      const cachedData = await AsyncStorage.getItem('imcData') || '[]';
      let cachedArray = JSON.parse(cachedData);

      // Remover o item específico do array
      cachedArray = cachedArray.filter(item => item !== dataToRemove);

      await AsyncStorage.setItem('imcData', JSON.stringify(cachedArray));
      console.log('Dados enviados e removidos localmente');
    } catch (error) {
      console.error('Erro ao remover dados localmente:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={() => (
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

                <Text style={styles.label}>Insira qual o seu gênero</Text>
                <Picker
                  style={styles.pickerContainer}
                  selectedValue={userData.sexo}
                  onValueChange={(itemValue) => handleChange('sexo', itemValue)}
                  itemStyle={{ color: 'white' }}
                >
                  <Picker.Item label="Feminino" value="F" />
                  <Picker.Item label="Masculino" value="M" />
                </Picker>

                <TouchableOpacity style={styles.button} onPress={handleCalcularIMC}>
                  <Text style={styles.buttonText}>Calcular IMC</Text>
                </TouchableOpacity>
              </View>
            )}
            options={({ navigation }) => ({
              title: 'Tela Inicial',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                  <Text style={styles.button}>Ranking</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Details" component={() => (
            <View style={styles.container}>
              <Text style={styles.title}>Ranking</Text>
              <View style={styles.header}>
                <Text style={styles.headerText}>Nome</Text>
                <Text style={styles.headerText}>Cidade</Text>
                <Text style={styles.headerText}>IMC</Text>
                <Text style={styles.headerText}>SEXO</Text>
              </View>
              <FlatList
                style={styles.list}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.city}</Text>
                    <Text style={styles.itemText}>{item.imc}</Text>
                    <Text style={styles.itemText}>{item.sexo}</Text>
                    <TouchableOpacity onPress={() => deletarDados(item.id)}>
                      <Text style={styles.itemText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )} options={{ title: 'Ranking' }} />
        </Stack.Navigator>
      </NavigationContainer>
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
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '80%',
    padding: 10,
    color: 'white',
    marginBottom: 36,
    borderRadius: 8,
  },
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
  list: {
    width: '100%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 5,
    borderRadius: 8,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
});

export default App;
