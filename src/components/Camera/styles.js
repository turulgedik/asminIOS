import {Dimensions,Platform,StyleSheet} from 'react-native'
const windowWidth = Dimensions.get('window').width;

export const styles=StyleSheet.create({

    modalContentView:{
        width:windowWidth*0.8,
    },
    header: {
        height: 60,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        flexDirection: 'row'
    },
    headerTextContainer: {
        position: 'absolute',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        zIndex:-999
    },
    takeView:{
        position:'absolute',
        width:100,
        height:100,
        bottom:20,
        left:windowWidth/2-50,
        backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        zIndex:999
    },
    takeButton:{
        width:75,
        height:75,
        borderRadius:37.5,
        borderWidth:2,
        borderColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    backButton:{
        position:'absolute',
        width:60,
        height:60,
        top:20,
        left:20,
        backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        zIndex:998
    },
})