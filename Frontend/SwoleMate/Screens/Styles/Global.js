import { StyleSheet} from 'react-native';

//exports stylesheet to be used in other classes
export default StyleSheet.create({
    //name
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    icon: {
        height: '100%',
        width: '100%',
    },
    hamburger: {
        width: 35,
        height: 35,
        marginLeft: 15,
        alignItems: 'center',
        borderColor: 'black',
        backgroundColor: '#F9F9F9'
    },
    spacer: {
        height: 15
    },
    spacerSmall: {
        height: 5
    },
    btnPrimary: {
        margin: 5,
        backgroundColor: '#007bff',
        padding: 5,
        borderRadius: 5,
        width: 150,
        alignItems: 'center'
    },
    btnSecondary: {
        margin: 5,
        backgroundColor: '#28a745',
        padding: 5,
        borderRadius: 5,
        width: 150,
        alignItems: 'center'
    },
    btn: {
        margin: 5,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
        borderWidth: 1
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    btnTextBlack: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    }
});