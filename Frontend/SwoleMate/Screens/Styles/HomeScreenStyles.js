import { StyleSheet} from 'react-native';

//exports stylesheet to be used in other classes
export default StyleSheet.create({
    //name
    icon: {
        height: '100%',
        width: '100%',
    },
    button: {
        width: 35,
        height: 35,
        alignItems: 'center',
        borderColor: 'black',
        backgroundColor: '#F9F9F9',
    },
    card: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 20,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
      },
});