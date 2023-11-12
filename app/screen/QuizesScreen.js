import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Alert} from 'react-native';
import _ from 'lodash';

import Screen from '../components/Screen';
import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import { getQuizBundles} from '../service/FakeQuizBundleService'
import Icon from '../components/Icon';
import colors from '../config/colors';
import useAuth from '../auth/useAuth';
import useQuizSession from '../quizSession/useQuizSession';
import routes from '../navigation/routes';
import { getLocalQuizSession } from '../quizSession/storage';
import storyContentApi from '../api/storyContent';
import quizApi from '../api/quiz';

function QuizesScreen({navigation}) {
    const [quizes, setQuizes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const {startQuiz, endQuiz} = useQuizSession();
    const {user} = useAuth();

    const populateQuizes = async () =>  {
        const {data} = await storyContentApi.getStoryContents(user.ta_username);
        setQuizes(data);
    }
    
    useEffect(() => {
        populateQuizes();
        endQuiz();
    },[])
    
    const handleProceed = async (item) => {
        const {data} = await quizApi.getQuizes(item.tsc_number);

        if(!data) return Alert.alert('Cannot Proceed!', 'Quiz has no questions as of the moment.')
        
        startQuiz(item.tsc_number);
        navigation.navigate(routes.QUIZ)
    }

    const handlePress = (item) => {
         Alert.alert('Confirmation', 'Are you ready to take this quiz?', [
            {text: 'Yes', onPress: () => handleProceed(item)},
            {text: 'No'}
    ])
}
    return (


        <Screen>
                <FlatList 
                    data={quizes}
                    keyExtractor={quizes => quizes.tsc_id.toString()}
                    renderItem={({item}) => (
                        <ListItem 
                            title={item.tsc_content}
                            subTitle={`Story Number: ${item.tsc_number}`}
                            IconComponent={<Icon 
                                name='book' 
                                iconColor={colors.white} 
                                backgroundColor={colors.secondary}/>} 
                            onPress={() => handlePress(item)}
                        />
                    )}
                    ItemSeparatorComponent={ListItemSeparator}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setQuizes([
                            ...populateQuizes()
                        ])
                    }}
                />
        </Screen>
    );
}

const styles = StyleSheet.create({
    
})

export default QuizesScreen;