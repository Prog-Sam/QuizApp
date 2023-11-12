 import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useDeviceOrientation } from '@react-native-community/hooks'; 

function VideoPlayer({uri}) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const isLandscape = useDeviceOrientation() == 'landscape';

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={{
                    width: '100%',
                    height: isLandscape ? '100%' : '30%',
                }}
                source={{
                uri: uri||'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default VideoPlayer;

