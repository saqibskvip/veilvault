import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  ScrollView,
  Image,
} from 'react-native';

export default function App() {
  const [savedPassword, setSavedPassword] = useState(null);
  const [input, setInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [vault, setVault] = useState([]); // fake storage

  const handleSetPassword = () => {
    if (input.length >= 4) {
      setSavedPassword(input);
      setInput('');
      alert('Password set! Now enter to unlock.');
    } else {
      alert('Use at least 4 characters.');
    }
  };

  const handleUnlock = () => {
    if (input === savedPassword) {
      setIsUnlocked(true);
    } else {
      alert('Wrong password!');
    }
    setInput('');
  };

  const handleAddFakeImage = () => {
    const newItem = {
      id: Date.now(),
      type: 'image',
      uri: 'https://placekitten.com/300/200',
    };
    setVault([...vault, newItem]);
  };

  const handleDelete = (id) => {
    setVault(vault.filter((item) => item.id !== id));
  };

  const colors = {
    background: darkMode ? '#000' : '#fff',
    text: darkMode ? '#fff' : '#000',
    inputBg: darkMode ? '#222' : '#eee',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.toggleRow}>
        <Text style={{ color: colors.text }}>🌙 Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {!savedPassword ? (
        <>
          <Text style={[styles.title, { color: colors.text }]}>Set Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
            placeholder="Enter password"
            placeholderTextColor="#888"
            secureTextEntry
            value={input}
            onChangeText={setInput}
          />
          <Button title="Set Password" onPress={handleSetPassword} />
        </>
      ) : !isUnlocked ? (
        <>
          <Text style={[styles.title, { color: colors.text }]}>Enter Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
            placeholder="Enter password"
            placeholderTextColor="#888"
            secureTextEntry
            value={input}
            onChangeText={setInput}
          />
          <Button title="Unlock" onPress={handleUnlock} />
        </>
      ) : (
        <>
          <Text style={[styles.title, { color: colors.text }]}>🔓 VeilVault Unlocked</Text>
          <Button title="➕ Add Fake Image" onPress={handleAddFakeImage} />
          <ScrollView style={{ width: '100%' }}>
            {vault.map((item) =>
              item.type === 'image' ? (
                <View key={item.id} style={{ marginVertical: 10 }}>
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: '100%', height: 200, borderRadius: 10 }}
                  />
                  <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
                </View>
              ) : null
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
