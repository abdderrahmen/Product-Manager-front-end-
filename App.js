import React, {useState, useEffect } from "react";
import { 
    StyleSheet,
    View,
    FlatList,
    Alert,
    Text,
    TouchableOpacity,
    Modal,
    TextInput
  }
  from "react-native";
import uuid from 'react-native-uuid';
import Header from "./Components/Header";
import ListItem from "./Components/ListItem";
import AddItem from "./Components/AddItem";


const App = () => {
  const [items, setItems]= useState([]);
  const [isModalVisible, setIsModalVisible]= useState(false);
  const [inputText, setInputText]= useState();
  const [editItem, setEditItem]= useState();
  const [isRender, setIsRender]= useState();

//Add Products..  
const addItem = async (name) => {
  if (!name) {
    Alert.alert(
      'No item entered',
      'Please enter an item when adding to your shopping list',
      [
        {
          name: 'Understood',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }else{
    const res= await fetch('http://localhost:8080/products',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name})
  })
  
  const data = await res.json();
  data.id = uuid.v4();
  setItems( 
    [...items, data]
    )
  } 
}; 

//Get List of Products..
  useEffect(() => { 
    async function getResults() {
      
      const res = await fetch('http://localhost:8080/products' 
      ,{
        method: "GET"
      })
      const results = await res.json()
      
      setItems(results)
    }
    getResults()
  },[])

//UpdateProducte


   const onPressItem = (item) => {
    setIsModalVisible(true)
    setInputText(item.name)
    setEditItem(item.id)
  }

  const onPressSaveEdit = () =>{
    handelEditItem(editItem, inputText); //save input text to items
    setIsModalVisible(false); //close modal
   } 



   const handelEditItem = async(id, name) => {
    const res = await fetch(`http://localhost:8080/products/${id}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name})
    })
    
     const data = await res.json();
     const newData = items.map(item =>{
       if(item.id == id){
         item.name = name;
         return item
       }
       return item
     })
     setItems(newData);
     setIsRender(!isRender)
   }

   //Delete Products..
   deleteItem = async (id) => {
    await fetch(`http://localhost:8080/products/${id}`,
    {
    method:'DELETE'
    })
     setItems([...items.filter(item =>
     item.id !== id)])
 }

  return (
    <View style={styles.container}>      
     <Header />
     <AddItem  addItem={addItem} />
     <FlatList
     data={items}
     renderItem={({item})=><ListItem item={item} deleteItem={deleteItem} onPressItem={onPressItem} />}
     extraData={isRender}
     />
     {
       
       <Modal
     animationType='fade'
     visible={isModalVisible}
     onRequestClose={()=> setIsModalVisible(false)}
     >
    <View style={styles.modalView}>
     <Text style={styles.textModal}>
       Change Text :
     </Text>
     <TextInput
     style={styles.textInput}
     onChangeText={(text)=>setInputText(text)}
     defaultValue={inputText}
     editable={true}
     multiline={false}
     maxLength={200}
     />
     <TouchableOpacity
     onPress={()=> onPressSaveEdit()}
     style={styles.touchSave}
     >
    <Text style={styles.textSave}>Save</Text>
     </TouchableOpacity>
    </View>

     </Modal>
       
     }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: 'white',
    
  },
  qrcode: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  
  },
  containerr: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  textInput:{
width:'90%',
height:70,
borderColor:'grey',
borderWidth:1,
fontSize: 25
  },
  modalView:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center'

  },

  touchSave:{
  backgroundColor: "#f08080",
  padding: 9,
  margin: 5,
  paddingHorizontal: 120,
  alignItems:'center',
  marginTop:20,
  },

  textSave: {
  color: 'darkslateblue',
  fontSize: 20,
  textAlign: 'center',
 },
 textModal:{
  color: 'darkslateblue',
  fontSize: 24,
  textAlign: 'center',
  marginBottom: 10,
 }
});

export default App;

