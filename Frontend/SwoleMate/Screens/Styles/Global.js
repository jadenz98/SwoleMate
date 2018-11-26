import { StyleSheet} from 'react-native';

//exports stylesheet to be used in other classes
export default StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    icon: {
        height: '100%',
        width: '100%'
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
    contentContainer: {
        flex: 0.8
    },
    screenShotImage: {
        width: 300,
        height: 600,
        margin: 10,
        borderWidth: 3,
        borderColor: 'black'
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
    btnDanger: {
        margin: 5,
        backgroundColor: '#dc3545',
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
        fontSize: 16,
        textAlign: 'center'
    },
    resetText: {
        color: "white",
        fontSize: 10,
        textAlign: 'center'
    },
    btnTextBlack: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    inputBox: {
        paddingLeft: 5,
        paddingRight: 5,
        width: 150,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1
    },
    background: {
        backgroundColor: '#45a1e8'
    },
    listContainer: {
        flex: 0.9,
        margin: 5,
        borderWidth: 2
    },
    listText: {
        fontSize: 14
    }
});
