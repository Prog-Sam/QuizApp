import { Platform } from 'react-native';
import colors from './colors';

export default defaultStyles = {
    colors,
    text: {
        color: colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir'
    }
}
