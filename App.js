import React, { useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, Image, Button, View, TextInput } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [rugnummer, setRugnummer] = useState('')
  const [image, setImage ] = useState("null");
  
  const addPlayer = () => {
    setPlayers([...players, { name,position, rugnummer, image:null }]);
    setName('');
    setPosition('');
    setRugnummer('');
    setImage(null)
  };

  const openCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (res) => {
      setImage(res);
      console.log('response = ', res.assets[0].uri);

    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Naam"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        value={position}
        onChangeText={setPosition}
        placeholder="Positie"
        keyboardType="default"
      />
      <TextInput
        keyboardType='numeric'
        style={styles.input}
        value={rugnummer}
        onChangeText={setRugnummer}
        placeholder="Voer het Rugnummer in"
      />

      <TouchableOpacity onPress={addPlayer} style={styles.button}>
        <Text style={{ color: '#fff' }}>Add Player</Text>
      </TouchableOpacity>
      <FlatList
      keyExtractor={item => item.name}
      data={players}
      renderItem={({item}) => (
        <View style={styles.playerContainer}>
          <View style={{height:60, width:60,backgroundColor:'black' }}>
          {item.image && item.image.uri && (
          <Image
              source={{  uri:item.image }}
              style={{width:60, height:60,borderRadius:30 }}
            />
          )}
          </View>
          <View style={{alignItems:"center",flex:1}}>
            <Text style={{fontWeight:"bold"}}>{item.name}</Text>
            <Text>{item.position}</Text>
            <Text>{item.rugnummer}</Text>
          </View>
          <Button
            title="Take Picture"
            onPress={(openCamera)}
          />
        </View>
      )}
      
          />
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
  },
  playerContainer: {
    height: 70,
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
    color: "white",
  },
});

export default App;
