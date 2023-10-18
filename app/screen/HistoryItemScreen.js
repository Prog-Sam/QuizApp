import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Text from '../components/Text';
import colors from '../config/colors';
import Screen from '../components/Screen';
import { ListItem } from '../components/lists';
import ListItemSeparator from '../components/lists';
import Icon from '../components/Icon';

function HistoryItemScreen({route}) {
    const {id, QuizSession, score, User} = route.params
    const details = [
        {title: 'ID', value: id},
        {title: 'User', value: User.name},
        {title: 'Score', value: score},
        {title: 'Pre-Quiz ID', value: QuizSession.QuizBundle.preQuizId},
        {title: 'Post-Quiz ID', value: QuizSession.QuizBundle.postQuizId},
    ]

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
                                    name='play-circle'
                                    backgroundColor={colors.primary}
                                />
                            } 
                            onPress={() => console.log(item)}
                        />
                    )}
                    ItemSeparatorComponent={ListItemSeparator}
                />
            </View>
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