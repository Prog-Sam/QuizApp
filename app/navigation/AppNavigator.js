import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import AccountScreen from '../screen/AccountScreen';
import routes from './routes';
import QuizesScreen from '../screen/QuizesScreen';
import DashboardNavigator from './DashboardNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen 
            name={routes.DASHBOARD} 
            component={DashboardNavigator}
            options={{
                tabBarIcon: ({color, size}) => <MaterialCommunityIcons name='newspaper-variant-outline' color={color} size={size} />
            }}
        />
        <Tab.Screen     
            name={routes.QUIZES} 
            component={QuizesScreen} 
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