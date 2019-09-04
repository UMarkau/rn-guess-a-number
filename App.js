import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Header } from './components';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={error => console.log(error)}
      />
    );

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);
  };

  const renderScreen = () => {
    if (userNumber && guessRounds <= 0) {
      return (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      );
    } else if (userNumber && guessRounds > 0) {
      return (
        <GameOverScreen
          onRestart={configureNewGameHandler}
          roundsNumber={guessRounds}
          userNumber={userNumber}
        />
      );
    } else {
      return <StartGameScreen onStartGame={startGameHandler} />;
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title='Guess a Number' />
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
