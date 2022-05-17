import { Dimensions, Platform, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'#f1f1f1',
    },
    header:{
        width:'100%',
        height:100,
        position:'absolute',
        flexDirection:'row',
    },
    block:{
        flexDirection:'row',
        paddingHorizontal:10,
        marginBottom:10
    },
    photoItem:{
        width:100,
        height:100,
        borderRadius:25,
        borderWidth:1,
        borderColor:'#9b59b6',
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        overflow:'hidden'
    },
    tarotCard:{
        width:75,
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        overflow:'hidden'
    },
    playButton:{
        marginLeft:10,
        height:75,
        width:75,
        borderRadius:37.5,
        backgroundColor:'white',
        borderWidth:5,
        borderColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center'
    },
    progress:{
        position:'absolute',
        height:'100%',
        backgroundColor:'#9b59b6',
        top:0,
        left:0
    },
    textInput:{
        width:'100%',
        height:60,
        borderWidth:1,
        borderColor:'#9b59b6',
        backgroundColor:'#e6e5f3',
        borderRadius:10,
    },
    textInputSelected:{
        width:'100%',
        height:60,
        borderWidth:1,
        borderColor:'#1e1e1e',
        backgroundColor:'#e6e5f3',
        borderRadius:10,
    },
    sendButtom:{
        width:'60%',
        height:50,
        borderRadius:25,
        backgroundColor:'#9b59b6',
        borderWidth:1,
        borderColor:'#f0e178',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10
    }
})