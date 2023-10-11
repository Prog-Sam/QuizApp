import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import Text from '../Text';
import colors from '../../config/colors';

function ListItem({
    title, 
    subTitle, 
    image, 
    IconComponent, 
    onPress, 
    renderRightActions, 
    backgroundColor=colors.white, 
    titleColor=colors.black, 
    subTitleColor=colors.medium
}) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight 
                onPress={onPress}
                underlayColor={colors.light}
                >
                <View style={{...styles.container, backgroundColor}}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={styles.detailsContainer}>
                        <Text style={{...styles.title, color: titleColor}} numberOfLines={1}>{title}</Text>
                        {subTitle && <Text style={{...styles.subTitle, color: subTitleColor}} numberOfLines={1}>{subTitle}</Text>}
                    </View>
                    <MaterialCommunityIcons style={styles.icon} name='chevron-right' size={25}/>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center'
    },
    detailsContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    },
    subTitle: {
        color: colors.medium
    },
    title: {
        fontWeight: '500'
    },
    icon: {
        color: colors.medium
    }
    
})

export default ListItem;