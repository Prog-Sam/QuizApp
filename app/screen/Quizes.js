import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Alert} from 'react-native';

import Screen from '../components/Screen';
import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import { getQuizBundles} from '../service/FakeQuizBundleService'
import Icon from '../components/Icon';
import colors from '../config/colors';

// const Quizes = [
//     {
//         id: 1,
//         title: 't1 asdfadsfadsfadsighapsjmbtpppawegpuotgwqu9j0g6wug6qug6u9j-u90ju9jmq43ubqu m409u3590yu390yh35 -95hj  3ogb h3wahy3wpo jhqgh-w3 ]h5j h--]h 4w-]',
//         description: 'sadf;aj sdfj asd;j fasd;jfoja sdopjgawe-r po]sjdgvoj [woaej gf[vo aj[r ]gja]opj gopawj gjpo ajwr]gj awr]g jap]wje gvpo]ajwwwwwwwwwwwwwwwwwga]wporjgp]oajw e]gp awpoegj] aw]errrrrrrrrrrrrrrrrrrgvp[oj wapogj apwog pj',
//         image: require('../assets/mosh.jpg')
//     },
//     {
//         id: 2,
//         title: 't2',
//         description: 'd2',
//         image: require('../assets/mosh.jpg')
//     }
// ]

function MessagesScreen(props) {
    const [quizes, setQuizes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const populateQuizes = () =>  {
        setQuizes(getQuizBundles({includeQuizes:true}))
    }

    useEffect(() => {
        populateQuizes();
    },[])

    const handlePress = (item) => {
         Alert.alert('Confirmation', 'Are you ready to take this quiz?', [
            {text: 'Yes', onPress: () => console.log(item)},
            {text: 'No'}
    ])
}
    return (


        <Screen>
                <FlatList 
                    data={quizes}
                    keyExtractor={quizes => quizes.id.toString()}
                    renderItem={({item}) => (
                        <ListItem 
                            title={item.title}
                            subTitle={`Difficulty Level: ${item.PreQuiz.difficulty} => ${item.PostQuiz.difficulty}`}
                            IconComponent={<Icon 
                                name='book' 
                                iconColor={colors.white} 
                                backgroundColor={colors.secondary}/>} 
                            onPress={() => handlePress(item)}
                        />
                    )}
                    ItemSeparatorComponent={ListItemSeparator}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setQuizes([
                            ...populateQuizes()
                        ])
                    }}
                />
        </Screen>
    );
}

const styles = StyleSheet.create({
    
})

export default MessagesScreen;