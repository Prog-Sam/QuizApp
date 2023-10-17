import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../screen/AccountScreen';
import MessagesScreen from '../screen/MessagesScreen';
import {ACCOUNT} from './routes'

const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name={ACCOUNT} component={AccountScreen} />
        <Stack.Screen name='Messages' component={MessagesScreen} />
    </Stack.Navigator>
)

export default AccountNavigator;