import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import WelcomeScreen from '../screen/WelcomeScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Welcome' component={WelcomeScreen} options={{
            headerShown: false
        }} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
)

export default AuthNavigator;