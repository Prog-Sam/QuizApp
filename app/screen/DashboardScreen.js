import React, { useState } from 'react';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import useSubmissionQueue from '../submissionQueue/useSubmissionQueue';
import quizSessionApi from '../api/quizSession';
import { generateQuizSessionBundle } from '../utility/SubmissionMethods';
import _ from 'lodash';
import { getAssetUri } from '../api/asset';

function DashboardScreen({navigation}) {
    const [quizSessions, setQuizSessions] = useState([]);
    const {user} = useAuth();

    const {submitToServer} = useSubmissionQueue();

    const handleRefresh = async () => {
        await submitToServer();
        const {data, ok} = await quizSessionApi.getQuizSession(user.ta_username);
        if(!ok) setQuizSessions([]);
        setQuizSessions(_.reverse(data));
    }

    const handleProceed = async (quizSession) => {
        // console.log(quizSession);
        const item = await generateQuizSessionBundle(quizSession);

        navigation.navigate(routes.HISTORY_ITEM, {quizSessionBundle: item})
    }

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem 
                    title={`Welcome ${user.FULLNAME}!`}
                    subTitle={`What's new today?`}
                    image={{
                        uri: getAssetUri(user.image_path)
                    }}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.text}>HISTORY</Text>
                    <TouchableOpacity style={styles.refresh} onPress={handleRefresh}>
                        <Icon name='refresh' backgroundColor={colors.primary} />
                    </TouchableOpacity>
                </View>
                <FlatList 
                    data={quizSessions}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <ListItem 
                            title={item.tsc_number} 
                            subTitle={`IAT: ${item.tsc_iat}`}
                            IconComponent={<Icon 
                                    name='file-check'
                                    backgroundColor={colors.primary}
                                />
                            } 
                            onPress={() => handleProceed(item)}
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
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    refresh: {
        paddingRight: 10
    }
})

export default DashboardScreen;