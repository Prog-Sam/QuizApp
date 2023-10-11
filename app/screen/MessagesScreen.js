import React, { useState } from 'react';
import { FlatList, StyleSheet, View} from 'react-native';

import Screen from '../components/Screen';
import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import ListItemDeleteAction from '../components/lists/ListItemDeleteAction';

const initialMessages = [
    {
        id: 1,
        title: 't1 asdfadsfadsfadsighapsjmbtpppawegpuotgwqu9j0g6wug6qug6u9j-u90ju9jmq43ubqu m409u3590yu390yh35 -95hj  3ogb h3wahy3wpo jhqgh-w3 ]h5j h--]h 4w-]',
        description: 'sadf;aj sdfj asd;j fasd;jfoja sdopjgawe-r po]sjdgvoj [woaej gf[vo aj[r ]gja]opj gopawj gjpo ajwr]gj awr]g jap]wje gvpo]ajwwwwwwwwwwwwwwwwwga]wporjgp]oajw e]gp awpoegj] aw]errrrrrrrrrrrrrrrrrrgvp[oj wapogj apwog pj',
        image: require('../assets/mosh.jpg')
    },
    {
        id: 2,
        title: 't2',
        description: 'd2',
        image: require('../assets/mosh.jpg')
    }
]

function MessagesScreen(props) {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = (message) => {
        setMessages(messages.filter(m => m.id !== message.id))
    }

    return (
        <Screen>
                <FlatList 
                    data={messages}
                    keyExtractor={message => message.id.toString()}
                    renderItem={({item}) => (
                        <ListItem 
                            title={item.title}
                            subTitle={item.description}
                            image={item.image} 
                            onPress={() => console.log('Message Selected', item)}
                            renderRightActions={() => <ListItemDeleteAction onPress={() => handleDelete(item)} />}
                        />
                    )}
                    ItemSeparatorComponent={ListItemSeparator}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setMessages([
                            {
                                id: 2,
                                title: 't2',
                                description: 'd2',
                                image: require('../assets/mosh.jpg')
                            }
                        ])
                    }}
                />
        </Screen>
    );
}

const styles = StyleSheet.create({
    
})

export default MessagesScreen;