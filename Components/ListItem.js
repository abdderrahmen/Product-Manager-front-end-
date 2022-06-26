import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
//import Icon from 'react-native-vector-icons/dist/FontAwesome';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 

const ListItem = ({item, deleteItem, onPressItem}) => {
  return (
    <TouchableOpacity style={styles.listItem}
    onPress={()=>{onPressItem(item)}}
    >
     <View style={styles.ListItemView}>
     <Text style={styles.ListItemtext}>{item.name}</Text>
     <AntDesign name="closecircle" size={20} color="firebrick" 
     onPress={()=> {deleteItem(item.id)} }
     />
     </View>
     
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    listItem:{
     padding: 15,
     backgroundColor: '#f8f8f8',
     borderBottomWidth: 1,
     borderColor: '#eee',

    },
    ListItemView:{
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',

      
    },
    ListItemtext:{
      fontSize: 20,
    },

});

export default ListItem;