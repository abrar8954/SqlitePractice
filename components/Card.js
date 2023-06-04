import { Image, StyleSheet, Text, View, TouchableOpacity,  } from 'react-native'
import React, { useEffect } from 'react'

const Card = ({ username, email, address, navigation, item, onDeleteUser }) => {
 
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 20, marginTop: 10, }}>
      <View >
        <Text>{username}</Text>
        <Text style={{ marginTop: 7 }}>{email}</Text>
        <Text style={{ marginTop: 7 }}>{address}</Text>
      </View>

      <View style={{height: 80, justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => onDeleteUser(item.user_id)}>
          <Image source={require('../assests/delete.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UpdateScreen', {item})}>
          <Image source={require('../assests/edit.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Card

