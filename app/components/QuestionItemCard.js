import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { ListItemSeparator } from './lists';
import Text from './Text';
import colors from '../config/colors';
import AnswerCard from './AnswerCard';
import Button from './Button';
import Icon from './Icon';

// const generateChoices = (choicesString) => {
    //     let stringChoiceArray = choicesString.split('|');
    //     let choiceArray = [];
    //     for(let i=0; i < stringChoiceArray.length; i++){
        //         choiceArray.push({
            //             index: i,
//             value: stringChoiceArray[i]
//         });
//     }
//     return choiceArray;
// }
    
function QuestionItemCard({questionItem={}, choiceArray=[] , onPress, onBack, onProceed, currentAnswer=null}) {
    const {tq_question='question'} = questionItem;

    const getAnswerStyle = (value) => {
        if(value == currentAnswer) return colors.secondary;
        return colors.black;
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={[styles.text]}>{tq_question}</Text>
            </View>
            <View style={styles.answerContainer}>
                <FlatList
                    data={choiceArray}
                    ItemSeparatorComponent={<ListItemSeparator />}
                    keyExtractor={(item) => item.index.toString()}
                    renderItem={({item}) => (
                        <AnswerCard 
                        index={item.index}
                        value={item.value}
                            onPress={() => onPress(item)}
                            style={styles.answers}
                            borderColor={getAnswerStyle(item.value)}
                            color={getAnswerStyle(item.value)}
                        />
                    )}
                />
            </View>
            <View style={styles.navigationContainer}>
                <View style={styles.navigationSubContainer}>
                    <Button 
                        color={colors.white}
                        IconComponent={<Icon name='arrow-left-bold'/>}
                        onPress={onBack}
                    />
                </View>
                <View style={styles.navigationSubContainer}>
                    <Button 
                        color={colors.white}
                        IconComponent={<Icon name='arrow-right-bold'/>}
                        onPress={onProceed}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.medium,
        flex: 1
    },
    questionContainer: {
        backgroundColor: colors.white,
        borderRadius: 15,
        borderWidth: 5,
        height: 'auto',
        marginVertical: 10,
        width: '100%'
    },
    answerContainer: {
        backgroundColor: colors.light,
        borderRadius: 15,
        borderWidth: 5,
        height: 'auto',
        width: '100%',
        padding: 5
    },
    text: {
        fontWeight: 'bold',
        padding: 20,
        alignSelf: 'center'
    },
    answers: {
        marginVertical:10
    },
    navigationContainer: {
        backgroundColor: colors.medium,
        flexDirection: 'row'
    },
    navigationSubContainer: {
        width: '50%'
    }
})

export default QuestionItemCard;