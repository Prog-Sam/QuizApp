import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import VideoPlayer from '../components/VideoPlayer';
import Button from '../components/Button';
import useQuizSession from '../quizSession/useQuizSession';
import routes from '../navigation/routes';
import storyContentApi from '../api/storyContent';
import { getAssetUri } from '../api/asset';


function VideoScreen({navigation}) {
    const [storyContent, setStoryContent] = useState(null);
    const {quizSession, proceedQuiz} = useQuizSession();
    
    const populateStoryContent = async () => {
        const {data} = await storyContentApi.getStoryContent(quizSession.tsc_number)
        console.log(data);
        setStoryContent(data[0]);
    }

    useState(() => {
        populateStoryContent();
    }, [])

    const onProceed = async () => {
        //update Quiz Session State
        await proceedQuiz();
        //navigate to new screen
        navigation.navigate(routes.QUIZ);
    }

    return (
        <View style={styles.container}>
            {storyContent && <VideoPlayer uri={getAssetUri(storyContent.tsc_file)} />}
            <Button 
                onPress={onProceed}
                title='Proceed'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.medium
    }
})

export default VideoScreen;