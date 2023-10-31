import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Yup from 'yup';

import QuizForm from '../components/forms/QuizForm';
import { allQuestionsAnswered, generateAnswerArray } from '../utility/QuizMethods';
import { getItems } from '../service/FakeItemService';
import { Form, SubmitButton } from '../components/forms';
import useQuizSession from '../quizSession/useQuizSession';
import routes from '../navigation/routes';
import { getQuizBundle } from '../service/FakeQuizBundleService';

const validationSchema = Yup.object().shape({
    UserAnswers: Yup.array().min(1, 'Please add at least one question')
});

function QuizScreen({navigation}) {
    const [questions, setQuestions] = useState([]);
    const [answerArray, setAnswerArray] = useState([]);
    const scrollView = useRef();

    const {quizSession, saveAnswers, proceedQuiz, endQuiz} = useQuizSession();

    const populateQuestions = async () => {
        const quizBundle = await getQuizBundle(quizSession.quizBundleId);

        const quizId = quizSession.state == 1 ? 
            quizBundle.preQuizId : quizBundle.postQuizId;
        
        const localQuestions = getItems({quizId});
        setQuestions(localQuestions);
        console.log(quizSession);
        setAnswerArray([...generateAnswerArray(localQuestions,quizSession)])
    }

    useEffect(() => {
        if(quizSession) populateQuestions();
    },[quizSession])

    const handleSubmit = async (state) => {
        //Check If all has been Answered
        const {ok, message} = allQuestionsAnswered(state.UserAnswers)
        if(!ok) return Alert.alert(message);
        //Save Answers to local state
        await saveAnswers(state.UserAnswers,quizSession.state);
        //Empty Answers Array
        setAnswerArray([]);
        //update Quiz Session State
        await proceedQuiz();
        //navigate to new screen
        (quizSession.state == 1) ? 
        navigation.navigate(routes.VIDEO):
        navigation.navigate(routes.QUIZES);
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