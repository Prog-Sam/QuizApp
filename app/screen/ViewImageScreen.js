import { View, Image, Text, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import colors from '../config/colors'

const WelcomeScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.closeIcon}>
                <MaterialCommunityIcons name='close' color='white' size={35}/>
            </View>
            <View style={styles.deleteIcon}>
                <MaterialCommunityIcons name='trash-can-outline' color='white' size={35}/>
            </View>
            <Image style={styles.image} source={require('../assets/chair.jpg')} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        top: 40,
        left: 30
    },
    container: {
        flex: 1,
        backgroundColor: colors.black
    },
    deleteIcon: {
        position: 'absolute',
        top: 40,
        right: 30
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    
})
 
export default WelcomeScreen;