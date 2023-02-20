import React, { useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, Image, Button, View, TextInput } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [foto, setFoto ] = useState(null);
  const [position, setPosition] = useState('');
  const [rugnummer, setRugnummer] = useState('');

  
  const addPlayer = () => {
    setPlayers([...players, { name, position, rugnummer, foto: null }]);
    setName('');
    setFoto(null);
    setPosition('');
    setRugnummer('');
  };

   camlaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (res) => {
      console.log('response = ', res);
      setFoto(res);
      console.log('foto = ', foto);
    });
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Naam"
      />
      <TextInput
        style={styles.input}
        value={position}
        onChangeText={setPosition}
        placeholder="Positie"
      />
      <TextInput
        keyboardType='numeric'
        style={styles.input}
        value={rugnummer}
        onChangeText={setRugnummer}
        placeholder="rugnummer"
        
      />
      

      <TouchableOpacity onPress={addPlayer} style={styles.button}>
        <Text style={{ color: '#fff' }}>Add Player</Text>
      </TouchableOpacity>
      <FlatList
      keyExtractor={item => item.name}
      data={players}
      renderItem={({item}) => (
        <View style={styles.playerContainer}>
          <View>
          {foto && (
          <Image
              source={{  uri:foto.assets[0].uri }}
              style={{width:70, height:80,borderRadius:30, borderColor: "black", borderWidth:2 }}
            />
          )}
          </View>
          <View style={{alignItems:"center",flex:1}}>
            <Text style={{fontWeight:"bold"}}>{item.name}</Text>
            <Text>{item.position}</Text>
            <Text>{item.rugnummer}</Text>
          </View>
          
          <Button
            style={{borderRadius:20}}
            title="Take Picture"
            onPress={camlaunch}
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
    backgroundColor: 'darkgrey',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
  },
  button: {
    marginTop:15,
    backgroundColor: 'green',
    padding: 12,
    borderRadius:10,
  },
  playerContainer: {
    marginTop: 60,
    height: 70,
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
  },
});

export default App;
