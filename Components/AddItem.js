import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

  const AddItem = ({addItem}) => {
  const [name, setName] = useState('');
  const onChange = textValue => setName(textValue);

  return (
    <View>
      <TextInput
        placeholder="Add Product..."
        style={styles.input}
        onChangeText={onChange}
        value={name}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addItem(name);
          setName('');
        }}>
        <Text style={styles.btnText}>
        <AntDesign name="pluscircleo" size={24} color="black" /> Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
  },
  btn: {
    backgroundColor: '#f08080',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddItem;