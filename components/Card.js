import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Card = ({ children, style }) => (
  <View style={{ ...styles.card, ...style }}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    shadowColor: '#45454d',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: '#eae7af',
    padding: 20,
    borderRadius: 10
  }
});
