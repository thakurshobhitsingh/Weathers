import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const API_KEY = 'YOUR_API_KEY'; 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.log(error);
      setWeather(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌦️ Weather App</Text>
      <TextInput
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <Button title="Get Weather" onPress={getWeather} />

      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text>🌡️ Temp: {weather.main.temp}°C</Text>
          <Text>☁️ Condition: {weather.weather[0].description}</Text>
          <Text>💧 Humidity: {weather.main.humidity}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 8 },
  result: { marginTop: 20 },
  city: { fontSize: 20, fontWeight: 'bold' },
});

export default App;
