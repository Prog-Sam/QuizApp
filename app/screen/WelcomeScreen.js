import { View, Image, Text, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';

import colors from '../config/colors';
import Button from '../components/Button';

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground blurRadius={10} style={styles.background} source={require('../assets/background.jpg')}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo-red.png')}/>
                <Text style={styles.tagline}>We Need Answers!</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button title='Login' onPress={() => navigation.navigate('Login')} />
                <Button title='Register' color='secondary' onPress={() => navigation.navigate('Register')} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: 'flex-end'
    },
    buttonsContainer: {
        padding: 20,
    },
    logo: {
        height: 100,
        width: 100
    },
    logoContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        top: 70
    },
    registerButton: {
        backgroundColor: colors.secondary,
        height: 70,
        width: '100%'
    },
    tagline: {
        fontSize: 25,
        fontWeight: '600',
        paddingVertical: 20
    }
})
 
export default WelcomeScreen;