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
        height: 60+(Platform.OS==='ios'?25:0),
        width: '100%',
        flexDirection: 'row',
    },
    headerTextContainer: {
        position: 'absolute',
        width: '100%',
        height: 60+(Platform.OS==='ios'?25:0),
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
        width: width / 1.5,
        height: width / 1.5,
        borderRadius: width / 3,
        backgroundColor: '#a479b6',
        marginLeft:width / 6,
        marginTop:-(width/5)
        //marginTop: -(Dimensions.get('window').width / 1.8) / 2,
        //marginLeft: 25
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
        height:50,
        width:50,
        borderRadius:25,
        borderWidth:2,
        borderColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    modalContentView:{
        width:width*0.8,
        maxHeight:height*0.7
    },
    helpButton:{
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:25,
        borderWidth:1,
        borderColor:'black',
        marginBottom:10,
        paddingHorizontal:10
    },
    contentContainer:{
        width:'100%',
        minHeight:200,
        backgroundColor:'white',

        overflow:'hidden'
    },
    textInput:{
        width:'100%',
        height:60,
        borderWidth:1,
        borderColor:'#9b59b6',
        borderRadius:10,
    },
    textInputSelected:{
        width:'100%',
        height:60,
        borderWidth:1,
        borderColor:'#1e1e1e',
        borderRadius:10,
    },
    modalOkButton:{
        alignItems:'center',
        justifyContent:'center',
        width:'80%',
        height:50,
        borderRadius:25,
        borderWidth:1,
        borderColor:'black',
        marginTop:20,
        backgroundColor:'#2ecc71'
    },
    item:{
        height:50,
        borderRadius:25,
        borderWidth:0.5,
        borderColor:'#9b59b6',
        justifyContent:'center',
        paddingHorizontal:10,
        marginBottom:10,
    },
    selectedItem:{
        height:50,
        borderRadius:25,
        backgroundColor:'#9b59b6',
        justifyContent:'center',
        paddingHorizontal:10,
        marginBottom:10,
    },
    save:{
        position:'absolute',
        right:20,
        top:20,
        padding:10,
        backgroundColor:'#3498db',
        borderRadius:10,
        borderWidth:0.5,
        borderColor:'white'
    },
})