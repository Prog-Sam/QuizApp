import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import QuizForm from '../components/forms/QuizForm';
import Screen from '../components/Screen';
import { generateAnswerArray } from '../utility/QuizMethods';
import { getItems } from '../service/FakeItemService';
import { getQuizSession } from '../service/FakeQuizSession';
import { Form, SubmitButton } from '../components/forms';


const validationSchema = Yup.object().shape({
    UserAnswers: Yup.array().min(1, 'Please add at least one question')
});

function QuizScreen({quizSessionId = 1, quizId = 1}) {
    const [questions, setQuestions] = useState([]);
    const [quizSession, setQuizSession] = useState([]);

    // const { logIn } = useAuth();
    // const [loginFailed, setLoginFailed] = useState(false);

    const populateQuestions = () => {
        setQuestions(getItems({quizId}));
    }

    const populateQuizSession = () => {
        setQuizSession(getQuizSession(quizSessionId));
    }

    useEffect(() => {
        populateQuestions();
        populateQuizSession();
    },[])

    const handleSubmit = async (value) => {
        console.log(value);
    }

    return (
        <Screen style={styles.container}>
            {questions.length > 0 && (
                <Form
                    initialValues={{
                        UserAnswers: [...generateAnswerArray(questions,quizSession)]
                    }}
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={validationSchema}
                >
                    <QuizForm 
                        questions={questions}
                        quizSession={quizSession}
                        answers={generateAnswerArray(questions,quizSession)}
                        name='UserAnswers'
                        mode='test'
                    />
                    <SubmitButton title='Fininsh' />
                </Form>)
            }
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default QuizScreen;