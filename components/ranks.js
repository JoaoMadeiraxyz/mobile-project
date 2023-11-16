import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { ListUsersData } from '../firestore';

const RankScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  async function fetchData() {
    const result = await ListUsersData();
    setData(result);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nome</Text>
        <Text style={styles.headerText}>Cidade</Text>
        <Text style={styles.headerText}>IMC</Text>
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
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list:{
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default RankScreen;
