import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Text from './Text';
import colors from '../config/colors';

const generateLetter = (index) => {
    return String.fromCharCode(index+65)
}

function AnswerCard({
        index=0, 
        value='Message', 
        style={}, 
        onPress,
        borderColor=colors.black,
        color=colors.black
    }) 
    {
    return (
        <TouchableOpacity style={[styles.cardContainer, style, {borderColor: borderColor}]} onPress={onPress}>
            <Text style={[styles.letter, {color}]}>{`${generateLetter(index)}.)`}</Text>
            <Text style={[styles.text, {color}]}>{value}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 'auto',
        width: '100%',
        borderRadius: 20,
        borderColor: colors.black,
        borderWidth: 2,
        backgroundColor: colors.light
    },
    text: {
        fontWeight: 'bold',
        padding: 20,
        alignSelf: 'center'
    },
    letter: {
        paddingTop: 5,
        paddingLeft: 10,
        position: 'absolute'
    }
    
})

export default AnswerCard;