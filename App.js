import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import LoginScreen from './app/screen/LoginScreen';
import WelcomeScreen from './app/screen/WelcomeScreen';
import MessagesScreen from './app/screen/MessagesScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import RegisterScreen from './app/screen/RegisterScreen';
import AppNavigator from './app/navigation/AppNavigator';
import NavigationTheme from './app/navigation/NavigationTheme';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer theme={NavigationTheme}>
        <AuthNavigator />
        {/* <AppNavigator /> */}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
