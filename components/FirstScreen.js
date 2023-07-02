import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import React from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import Card from './Card';
import { useIsFocused } from '@react-navigation/native';
let db = openDatabase({ name: 'UserDatabase2.db' });


const FirstScreen = ({ navigation }) => {
  let [listItems, setListItems] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
   getData();

  }, [isFocused]);

  function getData () {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setListItems(temp)
          console.log('temp: ', temp);
        }
      );
    });
    console.log('listItems: ', listItems);
  }

  function deleteUser(id) {
    // console.log('saveData: ', username, email, address);
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [id],
        (tx, results) => {
          getData();
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                 
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert('Please insert a valid User Id');
          }
        }
      );
    });
  }


  return (
    <View style={{ flex: 1, }}>
      <FlatList
        data={listItems}
        renderItem={({ item, index }) => {
          console.log('item: ', item);
          return (
            <Card username={item.user_name} email={item.user_email} address={item.user_address} navigation={navigation} item={item} onDeleteUser={() => { deleteUser(item.user_id) }} />
          )

        }} />

      <TouchableOpacity style={{ padding: 12, backgroundColor: 'purple', width: '30%', justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginRight: 20, borderRadius: 10, position: 'absolute', bottom: 20, right: 20 }} onPress={() => navigation.navigate('UserDetails')}>
        <Text style={{ color: '#fff' }}>Add New User</Text>
      </TouchableOpacity>

    </View>
  )
}

export default FirstScreen

