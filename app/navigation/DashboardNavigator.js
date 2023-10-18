import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

import DashboardScreen from '../screen/DashboardScreen';
import HistoryItemScreen from '../screen/HistoryItemScreen';
import routes from './routes';

const Stack = createStackNavigator();

const DashboardNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name={routes.DASHBOARD} component={DashboardScreen} options={{
            headerShown: false
        }} />
        <Stack.Screen 
            name={routes.HISTORY_ITEM}
            component={HistoryItemScreen} 
            options={({route}) => ({
                    title: `${route.params.QuizSession.QuizBundle.title} - ${route.params.QuizSession.iat}`
                }
            )}
        />
    </Stack.Navigator>
)

export default DashboardNavigator;