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

function QuizesScreen({navigation}) {
    const [quizes, setQuizes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const {user} = useAuth();
    const {startQuiz, endQuiz} = useQuizSession();

    const populateQuizes = () =>  {
        setQuizes(getQuizBundles({includeQuizes:true}))
    }

    useEffect(() => {
        populateQuizes();
        endQuiz();
    },[])

    const handleProceed = async (item) => {
        startQuiz(item.id);
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
                    keyExtractor={quizes => quizes.id.toString()}
                    renderItem={({item}) => (
                        <ListItem 
                            title={item.title}
                            subTitle={`Difficulty Level: ${item.PreQuiz.difficulty} => ${item.PostQuiz.difficulty}`}
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