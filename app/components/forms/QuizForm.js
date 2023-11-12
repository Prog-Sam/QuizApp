import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useFormikContext } from 'formik';

import AppText from '../Text';
import QuestionItemCard from '../QuestionItemCard';
import { pickAnswer } from '../../utility/QuizMethods';

function QuizForm({
        questions,
        answers,
        choiceArray,
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
                selected.value,
                questions[pointerIndex].tq_id,
                values[name],
                quizSession
                ))
        console.log(values);
    }

    const handleProceed = () => {
        if(pointerIndex === (questions.length-1)) return Alert.alert('Information', 'End of the Line.')
        setPointerIndex(pointerIndex+1);
    }

    const handleBack = () => {
        if(pointerIndex === 0) return Alert.alert('Information', 'End of the Line.')
        setPointerIndex(pointerIndex-1);
    }

    const finderIndex = (question) => {
        return values[name].findIndex(obj => obj.tq_id == question.tq_id);
    }

    return (
        <View style={styles.container}>
            <AppText style={styles.sessionText}>{`Session ${quizSession ? quizSession.tsc_iat : '00000000000000'}`}</AppText>
            <AppText style={styles.counter}>{`Question ${pointerIndex+1} of ${questions.length}`}</AppText>
            {
                (answers.length > 0) &&
                (
                    <QuestionItemCard 
                        questionItem={questions[pointerIndex]}
                        choiceArray={choiceArray[pointerIndex]}
                        onPress={handleSelect} 
                        onProceed={handleProceed} 
                        onBack={handleBack}
                        currentAnswer={values[name][finderIndex(questions[pointerIndex])].Answer}
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