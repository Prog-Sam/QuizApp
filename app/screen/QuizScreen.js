import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import * as Yup from 'yup';

import QuizForm from '../components/forms/QuizForm';
import { generateAnswerArray } from '../utility/QuizMethods';
import { getItems } from '../service/FakeItemService';
import { getQuizSession } from '../service/FakeQuizSession';
import { Form, SubmitButton } from '../components/forms';
import { getLocalQuizSession } from '../quizSession/storage';
import useAuth from '../auth/useAuth';
import useQuizSession from '../quizSession/useQuizSession';
import routes from '../navigation/routes';
import { getQuizBundle } from '../service/FakeQuizBundleService';

const validationSchema = Yup.object().shape({
    UserAnswers: Yup.array().min(1, 'Please add at least one question')
});

function QuizScreen({quizSessionId = 1, quizId = 1, navigation}) {
    const [questions, setQuestions] = useState([]);
    const [answerArray, setAnswerArray] = useState([]);

    const {quizSession} = useQuizSession();

    const populateQuestions = async () => {
        const quizBundle = await getQuizBundle(quizSession.quizBundleId);

        const quizId = quizSession.state == 1 ? 
            quizBundle.preQuizId : quizBundle.postQuizId;
        
        const localQuestions = getItems({quizId});
        setQuestions(localQuestions);
        console.log([...generateAnswerArray(localQuestions,quizSession)]);
        setAnswerArray([...generateAnswerArray(localQuestions,quizSession)])
    }

    useEffect(() => {
        if(quizSession) populateQuestions();
    },[quizSession])

    const handleSubmit = async (value) => {
        console.log(value);
        setAnswerArray([]);
        navigation.navigate(routes.QUIZES)
    }

    return (
        <ScrollView style={styles.container}>
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