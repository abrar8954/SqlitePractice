import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import TextInputRe from '../reusable_comps/TextInputRe'
import { openDatabase } from 'react-native-sqlite-storage'
let db = openDatabase({ name: 'UserDatabase2.db' });
import { useNavigation } from '@react-navigation/native';

const UserDetails = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(50), user_address VARCHAR(255))',
                            []
                        );
                    } else {
                        console.log('Already Created Table!');
                    }
                }
            );
        });
    }, []);

    saveData = () => {
        console.log('saveData: ', username, email, address);
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_user (user_name, user_email, user_address) VALUES (?,?,?)',
                [username, email, address],
                (tx, results) => {

                    console.log('Results', results);
                    if (results.rowsAffected > 0) {
                        navigation.goBack();
                    }

                },
                error => {
                    console.log(error);
                }
            );
        });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInputRe placeholder={'Enter UserName'} value={username} onChangeText={setUserName} />
            <TextInputRe placeholder={'Enter Email'} value={email} onChangeText={setEmail} />
            <TextInputRe placeholder={'Enter Address'} value={address} onChangeText={setAddress} />
            <TouchableOpacity style={{ padding: 12, backgroundColor: 'purple', width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 20 }} onPress={() => saveData()}>
                <Text style={{ color: '#fff' }}>Save User</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserDetails

