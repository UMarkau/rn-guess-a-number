import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';

export const Header = ({ title }) => (
  <View
    style={{
      ...styles.headerBase,
      ...Platform.select({
        ios: styles.headerIOS,
        android: styles.headerAndroid
      })
    }}
  >
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIOS: {
    backgroundColor: 'white'
  },
  headerAndroid: {
    backgroundColor: Colors.primary
  },
  headerTitle: {
    color: '#002f35',
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  }
});
