import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import VideoPlayer from '../components/VideoPlayer';
import Button from '../components/Button';

function VideoScreen(props) {

    const onProceed = () => {
        console.log('Proceeded');
    }

    return (
        <View style={styles.container}>
            <VideoPlayer />
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
        backgroundColor: colors.primary
    }
})

export default VideoScreen;