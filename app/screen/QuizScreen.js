import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Yup from 'yup';

import QuizForm from '../components/forms/QuizForm';
import { allQuestionsAnswered, generateAnswerArray, generateChoiceArray } from '../utility/QuizMethods';
import { Form, SubmitButton } from '../components/forms';
import useQuizSession from '../quizSession/useQuizSession';
import routes from '../navigation/routes';
import quizApi from '../api/quiz';
import { shuffle } from '../utility/shuffle';

const validationSchema = Yup.object().shape({
    UserAnswers: Yup.array().min(1, 'Please add at least one question')
});

function QuizScreen({navigation}) {
    const [questions, setQuestions] = useState([]);
    const [answerArray, setAnswerArray] = useState([]);
    const [choiceArray, setChoiceArray] = useState([]);
    const scrollView = useRef();

    const {quizSession, saveAnswers, proceedQuiz, endQuiz} = useQuizSession();

    const populateQuestions = async () => {
        // const quizBundle = await getQuizBundle(quizSession.quizBundleId);

        // const quizId = quizSession.state == 1 ? 
        //     quizBundle.preQuizId : quizBundle.postQuizId;
        
        // const localQuestions = getItems({quizId});
        // setQuestions(localQuestions);
        // console.log(quizSession);
        // setAnswerArray([...generateAnswerArray(localQuestions,quizSession)])
        // console.log(quizSession);

        const localQuestions = await quizApi.getQuizes(quizSession.tsc_number);
        let shuffledQuestions = shuffle(localQuestions.data);
        setQuestions(shuffledQuestions);
        setAnswerArray([...generateAnswerArray(shuffledQuestions, quizSession)]);
        setChoiceArray([...generateChoiceArray(shuffledQuestions)]);
    }

    useEffect(() => {
        if(quizSession) populateQuestions();
    },[quizSession])

    const handleSubmit = async (state) => {
        // Check If all has been Answered
        const {ok, message} = allQuestionsAnswered(state.UserAnswers)
        if(!ok) return Alert.alert(message);
        // Save Answers to local state
        await saveAnswers(state.UserAnswers,quizSession.state);
        //Empty Answers Array
        setAnswerArray([]);
        setChoiceArray([]);
        //update Quiz Session State
        await proceedQuiz();
        //navigate to new screen
        (quizSession.state == 1) ? 
        navigation.navigate(routes.VIDEO):
        navigation.navigate(routes.HISTORY_ITEM);

    }

    return (
        <ScrollView ref={scrollView} style={styles.container}>
            {(questions.length > 0 && answerArray.length > 0) && (
                <Form
                    initialValues={{
                        UserAnswers: [...answerArray]
                    }}
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={validationSchema}
                >
                    <QuizForm 
                        questions={questions}
                        quizSession={quizSession}
                        answers={answerArray}
                        choiceArray={choiceArray}
                        name='UserAnswers'
                        mode='test'
                    />
                    <SubmitButton title='Fininsh' />
                </Form>)
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default QuizScreen;