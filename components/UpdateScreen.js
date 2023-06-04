import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, } from 'react'
import TextInputRe from '../reusable_comps/TextInputRe'
import { openDatabase } from 'react-native-sqlite-storage'
let db = openDatabase({ name: 'UserDatabase2.db' });
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

const UpdateScreen = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        console.log('dataItem: ', route.params.item);
        setUserName(route.params.item.user_name);
        setEmail(route.params.item.user_email);
        setAddress(route.params.item.user_address);

    }, []);

    updateData = () => {
        // console.log('saveData: ', username, email, address);
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE table_user set user_name=?, user_email=? , user_address=? where user_id=?',
                [username, email, address, route.params.item.user_id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'User updated successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.goBack(),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Updation Failed');
                },
            );
        });

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInputRe placeholder={'Enter UserName'} value={username} onChangeText={setUserName} />
            <TextInputRe placeholder={'Enter Email'} value={email} onChangeText={setEmail} />
            <TextInputRe placeholder={'Enter Address'} value={address} onChangeText={setAddress} />
            <TouchableOpacity style={{ padding: 12, backgroundColor: 'blue', width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 20 }} onPress={() => updateData()}>
                <Text style={{ color: '#fff' }}>Update User</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpdateScreen;

