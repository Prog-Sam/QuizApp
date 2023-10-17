import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

import ListingsScreen from '../screen/ListingsScreen';
import ListingDetailsScreen from '../screen/ListingDetailsScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator mode='modal'>
        <Stack.Screen name='Listings' component={ListingsScreen} />
        <Stack.Screen name='ListingDetails' component={ListingDetailsScreen} />
    </Stack.Navigator>
)

export default FeedNavigator;