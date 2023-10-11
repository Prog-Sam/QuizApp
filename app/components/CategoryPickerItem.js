import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import Text from './Text';

function CategoryPickerItem({ item, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Icon backgroundColor={item.backgroundColor} name={item.icon} size={80} />
            <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 12.5,
        alignItems: 'center',
        width: '33%'
    },
    label: {
        marginTop: 5,
        textAlign: 'center'
    }
})

export default CategoryPickerItem;