import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import moment from 'moment';

import Screen from '../components/Screen';
import ListItem from '../components/lists/ListItem';
import colors from '../config/colors';
import Icon from '../components/Icon';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';
import Text from '../components/Text';

const menuItems = [
    {
        id: 1,
        quizSessionId: 1,
        userId: 3,
        score: 2,
        QuizSession: {
            id: 1,
            userId: 3,
            quizBundleId: 1,
            iat: Date.now(),
            QuizBundle: {
                id: 1,
                title: 'Test 1',
                preQuizId: 1,
                url: 'Some Video URL',
                postQuizId: 2
            }
        }
    },
]

function DashboardScreen({navigation}) {
    const {user, logOut} = useAuth();

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem 
                    title={`Welcome ${user.name}!`}
                    subTitle={`What's new today?`}
                    image={require('../assets/mosh.jpg')}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>HISTORY</Text>
                <FlatList 
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <ListItem 
                            title={item.QuizSession.QuizBundle.title} 
                            subTitle={`Taken at: ${moment(item.QuizSession.iat).toString()}`}
                            IconComponent={<Icon 
                                    name='play-circle'
                                    backgroundColor={colors.primary}
                                />
                            } 
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    )}
                    ItemSeparatorComponent={ListItemSeparator}
                />
            </View>
            <ListItem 
                title='Log Out'
                IconComponent={
                    <Icon name='logout' backgroundColor='#ffe66d' />
                }
                onPress={() => logOut()}
            />
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

export default DashboardScreen;