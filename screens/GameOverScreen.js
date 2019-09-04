import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';
import { PrimaryButton } from '../components';

export default ({ roundsNumber, userNumber, onRestart }) => (
  <View style={styles.container}>
    <Text style={DefaultStyles.title}>The Game is Over!</Text>
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/images/success.png')}
        /* source={{
          uri: `https://cosmos-images2.imgix.net/file/spina/photo/18032/190218-mount-full.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=1880`
        }} - For images from the web, we also have to add width and height properties! */

        style={styles.image}
      />
    </View>
    <View style={styles.resultContainer}>
      <Text style={{ ...DefaultStyles.bodyText, ...styles.resultText }}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
        rounds to guess the number{' '}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
    </View>
    <PrimaryButton onPress={onRestart}>NEW GAME</PrimaryButton>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f4d1'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20
  }
});
