import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';
import { NumberContainer } from '../components';
import { Card, PrimaryButton } from '../components';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
    <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
  </View>
);

export default ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses(currentPastGuesses => [
      nextNumber.toString(),
      ...currentPastGuesses
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <PrimaryButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </PrimaryButton>
        <PrimaryButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </PrimaryButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> - Has a bad performance for realy long arrays. It's better to use Flatlist for cases when we need to render big amount of items. */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={itemData => renderListItem(pastGuesses.length, itemData)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f2f4d1'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 400,
    maxWidth: '90%'
  },
  listItem: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f2e3c9',
    justifyContent: 'space-between',
    width: '100%'
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '60%' : '80%'
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
});
