import { StyleSheet} from 'react-native';

//exports stylesheet to be used in other classes
export default StyleSheet.create({
    italics:{
        fontStyle: 'italic'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    username: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 250,
        height: 350,
        margin: 10,
        borderWidth: 3,
        borderColor: 'black'
    },
    profileInfo: {
        flex: 0.8
    },
    textBox: {
        flex: 0.9,
        borderWidth: 2,
        margin: 5,
        padding: 5,
        backgroundColor: 'white'
    },
    textLine: {
        flex: 0.9,
        borderBottomWidth: 1,
        margin: 5
    },
    spacer: {
        height: 15
    },
    listContainer: {
        flex: 0.9,
        margin: 5,
        borderWidth: 2
    },
    listText: {
        fontSize: 14
    },
    button: {
        width: 100,
        height: 35,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
