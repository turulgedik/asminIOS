import { Dimensions, Platform, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'#f1f1f1',
        alignItems:'center',
        justifyContent:'center'
    },
    header: {
        height: 60,
        width: '100%',
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
    ovalBack: {
        width: '100%',
        height: 250,
        backgroundColor: '#9b59b6',
        borderRadius: 50,
        overflow: 'hidden',
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0
    },
    boxContainer:{
        position:'absolute',
        top:0,
        width:'100%',
        height:200,
        alignItems:'center',
        justifyContent:'center',
        justifyContent:'space-evenly'
    },
    box:{
        width:Dimensions.get('window').width/3,
        height:Dimensions.get('window').width/3,
        backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:(Dimensions.get('window').width/3)/2,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
    },
    oval: {
        width: Dimensions.get('window').width / 1.8,
        height: Dimensions.get('window').width / 1.8,
        borderRadius: (Dimensions.get('window').width / 1.8) / 2,
        backgroundColor: '#a479b6',
        marginTop: -(Dimensions.get('window').width / 1.8) / 2,
        marginLeft: 25
    },
    boxInBottom:{
        position:'absolute',
        bottom:0,
        width:'100%',
        flexDirection:'row',
        paddingVertical:10,
    },
    info:{
        position:'absolute',
        right:20,
        top:20,
        padding:10,
    },
    sendButtom:{
        width:'60%',
        height:50,
        borderRadius:25,
        backgroundColor:'#f0e178',
        borderWidth:1,
        borderColor:'#9b59b6',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10
    }
})