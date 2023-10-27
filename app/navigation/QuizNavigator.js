import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

import routes from './routes'
import QuizesScreen from '../screen/QuizesScreen';
import QuizScreen from '../screen/QuizScreen';
import useQuizSession from '../quizSession/useQuizSession';
import quizState from '../config/quizState';

const Stack = createStackNavigator();

const QuizNavigator = () => {
    const {quizSession} = useQuizSession();
    let initialRouteName = quizSession ? quizState[quizSession.state.toString()] : routes.QUIZES;


    return (
        <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen name={routes.QUIZES} component={QuizesScreen} />
            <Stack.Screen name={routes.QUIZ} component={QuizScreen} options={
                {headerShown: false}
            }/>
        </Stack.Navigator>
    )

}
export default QuizNavigator;