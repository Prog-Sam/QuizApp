import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import Screen from '../components/Screen';
import ListItem from '../components/lists/ListItem';
import colors from '../config/colors';
import Icon from '../components/Icon';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import useAuth from '../auth/useAuth';
import { getAssetUri } from '../api/asset';

const menuItems = [
    // {
    //     title: 'My Listings',
    //     icon: {
    //         name: 'format-list-bulleted',
    //         backgroundColor: colors.primary
    //     }
    // },
    // {
    //     title: 'My Messages',
    //     icon: {
    //         name: 'email',
    //         backgroundColor: colors.secondary
    //     },
    //     targetScreen: 'Messages'
    // }
]

function AccountScreen({navigation}) {
    const {logOut, user} = useAuth();

    console.log(user);
    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem 
                    title={user.FULLNAME}
                    subTitle={user.ta_username}
                    image={{
                        uri: getAssetUri(user.image_path)
                    }}
                />
            </View>
            <View style={styles.container}>
                <FlatList 
                    data={menuItems}
                    keyExtractor={(item) => item.title}
                    renderItem={({item}) => (
                        <ListItem 
                            title={item.title} 
                            IconComponent={<Icon 
                                    name={item.icon.name}
                                    backgroundColor={item.icon.backgroundColor} 
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
    }
})

export default AccountScreen;