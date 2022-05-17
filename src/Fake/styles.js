import {Dimensions,StyleSheet} from 'react-native'
const { width, height } = Dimensions.get('window')

export const styles=StyleSheet.create({


    background:{
        flex:1
    },
    modalContentView:{
        width:width*0.8,
        maxHeight:height*0.7
    },
    modalBack:{
        backgroundColor:'rgba(0,0,0,0.3)',
        width:'100%',
        height:height,
        paddingTop:30
    },
    modalContent:{
        width:'100%',
        height:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'white'
    },
    textInput:{
        width:'100%',
        height:60,
        borderWidth:1,
        borderColor:'#e1e1e1',
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
    item:{
        width:'100%',
        minHeight:120,
        borderRadius:25,
        backgroundColor:'#9b59b6',
        paddingHorizontal:5,
        paddingTop:5,
        marginBottom:20
    },
})