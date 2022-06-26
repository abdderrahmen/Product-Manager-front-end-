import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
     <Text style={styles.text}>Products List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: '#a52a2a'
    
  },
  text:{
      color: '#fff',
      fontSize: 23,
      textAlign: 'center',
  },
});

export default Header;