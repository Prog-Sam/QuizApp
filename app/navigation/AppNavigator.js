import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import ListingsScreen from '../screen/ListingsScreen';
import ListingEditScreen from '../screen/ListingEditScreen';
import AccountScreen from '../screen/AccountScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';

import routes from './routes';
import Dashboard from '../screen/Dashboard';
import Quizes from '../screen/Quizes';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen 
            name={routes.DASHBOARD} 
            component={Dashboard}
            options={{
                tabBarIcon: ({color, size}) => <MaterialCommunityIcons name='newspaper-variant-outline' color={color} size={size} />
            }}
        />
        <Tab.Screen     
            name={routes.QUIZES} 
            component={Quizes} 
            options={{
                tabBarIcon: ({color, size}) => <MaterialCommunityIcons name='play-circle' color={color} size={size} />
            }}
        />
        <Tab.Screen 
            name='Account' 
            component={AccountScreen} 
            options={{
                tabBarIcon: ({color, size}) => <MaterialCommunityIcons name='account' color={color} size={size} />
            }}
        />
    </Tab.Navigator>
)

export default AppNavigator;