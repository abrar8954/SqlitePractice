import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const TextInputRe = ({ placeholder, value, onChangeText }) => {
    return (

        <TextInput
            style={{ borderWidth: 1, borderRadius: 10, borderColor: '#000', width: '80%', marginBottom: 20,  padding: 10}}
            onChangeText={(val) => onChangeText(val)}
            value={value}
            placeholder={placeholder} />

    )
}

export default TextInputRe

const styles = StyleSheet.create({})