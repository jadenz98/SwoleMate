import { StyleSheet, Platform} from 'react-native';

//exports stylesheet to be used in other classes
export default StyleSheet.create({
    //name
    inputBox: {
        paddingLeft: 5,
        paddingRight: 5,
        width: 150,
        borderColor: 'black',
        borderWidth: 1
    },
    button: {
        width: 75,
        alignItems: 'center',
        padding: 5,
        borderColor: 'black',
        backgroundColor: '#F9F9F9'
    },
    clearButton: {
        width: 75,
        alignItems: 'center',
        padding: 5,
        borderColor: 'black'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    title: {
        color: '#ffe82c',
        fontFamily: (Platform.OS === 'ios') ? 'AppleSDGothicNeo-Thin' : 'Roboto',
        fontSize: 50,
        fontWeight: 'bold'
    },
    background: {
        backgroundColor: '#45a1e8'
    }
});
