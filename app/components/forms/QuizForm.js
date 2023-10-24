import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useFormikContext } from 'formik';

import AppText from '../Text';
import QuestionItemCard from '../QuestionItemCard';
import { getUser } from '../../service/FakeUserService';
import { generateAnswerArray, pickAnswer } from '../../utility/QuizMethods';

function QuizForm({
        questions,
        answers,
        name, 
        quizSession, 
        mode='test'
    }) {
    const [pointerIndex, setPointerIndex] = useState(0);
    const { setFieldValue, values} = useFormikContext();

    const handleSelect = (selected) => {
        setFieldValue(
            name, 
            pickAnswer(
                selected.index,
                values[name][pointerIndex].id,
                values[name]))
    }

    const handleProceed = () => {
        if(pointerIndex === (questions.length-1)) return Alert.alert('Information', 'End of the Line.')
        setPointerIndex(pointerIndex+1);
    }

    const handleBack = () => {
        if(pointerIndex === 0) return Alert.alert('Information', 'End of the Line.')
        setPointerIndex(pointerIndex-1);
    }

    return (
        <View style={styles.container}>
            <AppText style={styles.sessionText}>{`Session ${quizSession ? quizSession.iat : '00000000000000'}`}</AppText>
            <AppText style={styles.counter}>{`Question ${pointerIndex+1} of ${questions.length}`}</AppText>
            {
                (answers.length > 0) &&
                (
                    <QuestionItemCard 
                        questionItem={questions[pointerIndex]}
                        onPress={handleSelect} 
                        onProceed={handleProceed} 
                        onBack={handleBack}
                        currentAnswer={values[name][pointerIndex].currentAnswer}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    counter: {
        alignSelf: 'center'
    },
    sessionText: {
        marginTop: 20,
        alignSelf: 'center'
    }
})

export default QuizForm;