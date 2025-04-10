import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';

export default function App() {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Tente adivinhar o número!');
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; // Número aleatório entre 1 e 100
  }

  const resetGame = () => {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setMessage('Tente adivinhar o número!');
    setAttempts(0);
  };

  const handleGuess = () => {
    const numericGuess = parseInt(guess, 10);
  
    if (isNaN(numericGuess)) {
      Alert.alert('Entrada inválida', 'Por favor, insira um número válido.');
      return;
    }
  
    if (numericGuess > 100) {
      Alert.alert('Número inválido', 'Por favor, insira um número menor ou igual a 100.');
      return;
    }
  
    if (guess.includes('.')) {
      Alert.alert('Número inválido', 'Por favor, insira um número inteiro.');
      return;
    }
  
    setAttempts(attempts + 1);
  
    if (numericGuess === targetNumber) {
      Alert.alert('Parabéns!', 'Você acertou o número!', [{ text: 'Jogar novamente', onPress: resetGame }]);
    } else if (attempts + 1 >= 5) {
      Alert.alert('Fim de jogo!', `Você excedeu o número de tentativas. O número era ${targetNumber}.`, [
        { text: 'Tentar novamente', onPress: resetGame },
      ]);
    } else if (numericGuess < targetNumber) {
      setMessage('O número é maior!');
    } else {
      setMessage('O número é menor!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerte o Número</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.attempts}>Tentativas: {attempts}/5</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite seu palpite"
        value={guess}
        onChangeText={setGuess}
      />
      <Button title="Enviar Palpite" onPress={handleGuess} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginVertical: 20,
  },
  attempts: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
  },
});