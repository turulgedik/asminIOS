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
    applePayButton:{
        width:'95%',
        height:50,
        backgroundColor:'#2f3640',
        borderRadius:25,
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center',
    },
    item:{
        flexDirection:'row',
        paddingHorizontal:10,
        borderRadius:30,
        borderWidth:1,
        borderColor:'#9b59b6',
        height:60,
        alignItems:'center',
        marginBottom:20
    },
    modalContentView:{
        width:width*0.8,
        maxHeight:height*0.7
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
})