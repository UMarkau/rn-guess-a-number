import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/colors';

export const PrimaryButton = ({ children, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback onPress={() => onPress()}>
        <View style={styles.container}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  container: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }
});
