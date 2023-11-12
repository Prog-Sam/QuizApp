import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';

import Text from '../components/Text';
import colors from '../config/colors';
import Screen from '../components/Screen';
import { ListItem } from '../components/lists';
import ListItemSeparator from '../components/lists';
import Icon from '../components/Icon';
import quizApi from '../api/quiz';
import useQuizSession from '../quizSession/useQuizSession';
import moment from 'moment';
import { extractScore } from '../utility/QuizMethods';
import Button from '../components/Button';
import useSubmissionQueue from '../submissionQueue/useSubmissionQueue';
import routes from '../navigation/routes';
import { generateQuizSessionBundle } from '../utility/SubmissionMethods';

// const quizSessionBundle = 
//     {
//         PostQuizAnswers: [
//             {Answer: "A",
//              QuizSessionId: "20231101200819",
//              Type: 1,
//              id: 0,
//              tq_id: "1"},
//              {Answer: "A",
//              QuizSessionId: "20231101200819",
//              Type: 1,
//              id: 1,
//              tq_id: "2"},
//              {Answer: "De Guzman",
//              QuizSessionId: "20231101200819",
//              Type: 1,
//              id: 2,
//              tq_id: "3"}],
//         PreQuizAnswers: [
//             {Answer: "A",
//              QuizSessionId: "20231101200819",
//              Type: 0,
//              id: 0,
//              tq_id: "3"},
//              {Answer: "Dela Rosa",
//              QuizSessionId: "20231101200819",
//              Type: 0,
//              id: 1,
//              tq_id: "2"},
//              {Answer: "A",
//                 QuizSessionId: "20231101200819",
//                 Type: 0,
//                 id: 2,
//                 tq_id: "1"
//             }],
//     id: "20231101200819",
//     ta_id: "1",
//     ta_status: "1",
//     tr_id: "1",
//     qBundle.tsc_iat: 1698840499061,
//     qBundle.tsc_number: "1006"
// }

function HistoryItemScreen({navigation, route}) {
    const [questions, setQuestions] = useState([]);
    const [qBundle, setQBundle] = useState({tsc_number: '', tsc_iat: ''});
    const [preTestScore, setPretestScore] = useState({score:0,questionScore:0});
    const [postTestScore, setPosttestScore] = useState({score:0,questionScore:0});
    const [details, setDetails] = useState([]);

    const {addToSubmissionQueue} = useSubmissionQueue();

    const {quizSession} = useQuizSession();
    
    const populateQuestions = async () => {
        const {data} = await quizApi.getQuizes(qBundle.tsc_number)
        setQuestions(data);
        populateScores(data);
    }

    const populateScores = async (questionArray) => {
        setPretestScore(extractScore(qBundle.PreQuizAnswers, questionArray));
        setPosttestScore(extractScore(qBundle.PostQuizAnswers, questionArray));
    }

    useEffect(() => {
        // console.log(route.params.quizSessionBundle);
        if(!route.params) setQBundle(quizSession);
        else setQBundle(route.params.quizSessionBundle);
        populateQuestions();
        setDetails([
        {title: 'QUIZ', value: qBundle.tsc_iat},
        {title: 'STORY CONTENT', value: qBundle.tsc_number},
        {title: 'DATE TAKEN', value: qBundle.tsc_iat},
        {title: 'PRE-TEST SCORE', value: (!preTestScore.questionScore) ? 'Loading' :`${preTestScore.score}/${preTestScore.questionScore}`},
        {title: 'POST-TEST SCORE', value: (!postTestScore.questionScore) ? 'Loading' :`${postTestScore.score}/${postTestScore.questionScore}`},
        ])
    },[questions])

    const handleEnd = async () => {
        const submitted = addToSubmissionQueue(qBundle);
        if(!submitted) return Alert.alert('Submission Failed', 'Submitting to the queue failed.')

        navigation.navigate(routes.QUIZES);

    }

    return (
        <Screen style={styles.screen}>
                <View style={styles.container}>
                <Text style={styles.text}>DETAILS</Text>
                <FlatList 
                    data={details}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <ListItem 
                            title={item.title} 
                            subTitle={item.value}
                            IconComponent={<Icon 
                                    name='disc'
                                    backgroundColor={colors.primary}
                                />
                            } 
                            onPress={() => console.log(item)}
                        />
                    )}
                    ItemSeparatorComponent={ListItemSeparator}
                />
            </View>
            {!route.params && <Button title={'END'} onPress={handleEnd}/>}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    screen: {
        backgroundColor: colors.light
    },
    text: {
        paddingLeft: 10
    }
})

export default HistoryItemScreen;