import { Dimensions, Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    background:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        bottom:0,
        position:'absolute',
        
    },
    contentView:{
        backgroundColor:'white',
        width:'100%',
        borderRadius:25,
        overflow:'scroll',
        borderRadius:50,
        backgroundColor:'white',
        borderWidth:0.5,
        borderColor:'#e1e1e1',
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0
    },
    loginContainer:{
        flex:1,
        width:'100%',
        borderRadius:50,
        backgroundColor:'white',
        borderWidth:0.5,
        borderColor:'#e1e1e1',
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0
    },
    registerContainer:{
        position:'absolute',
        height:'60%',
        bottom:0,
        width:'100%',
        borderRadius:50,
        backgroundColor:'white',
        borderWidth:0.5,
        borderColor:'#e1e1e1',
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0
    },
    loginPanel:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20
    },
    loginItem:{
        width:'100%',
        marginBottom:10
    },
    page:{
      width:'100%',  
    },
    imageButton:{
        width:150,
        height:150,
        borderRadius:75,
        backgroundColor:'rgba(0,0,0,0.5)'
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
    loginButton:{
        width:'70%',
        height:50,
        backgroundColor:'#9b59b6',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        borderWidth:0.5,
        borderColor:'#6c5ce7'
    },
    nextButton:{
        width:'45%',
        height:50,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        borderWidth:0.5,
        borderColor:'#e6e5f3',
        zIndex:999
    },
    navButton:{
        position:'absolute',
        top:Platform.OS==='ios'?30:10,
        right:10,
        padding:10,
        borderColor:'white',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'white',
        zIndex:9999
    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 30,
        borderTopWidth: 30,
        borderRightColor: "transparent",
        borderTopColor: "red",
    },
    triangleCornerTopRight: {
        position:'absolute',
        right:0,
        top:0,
        borderTopColor:'#ecd447',
        transform: [{ rotate: "90deg" }],
    },
    triangleCornerBottomLeft: {
        position:'absolute',
        left:0,
        bottom:0,
        borderTopColor:'#ecd447',
        transform: [{ rotate: "270deg" }],
    },
    triangleCornerBottomRight: {
        transform: [{ rotate: "180deg" }],
        position:'absolute',
        right:0,
        bottom:0,
        borderTopColor:'#ecd447',
    },
    triangleCornerTopLeft: {
        position:'absolute',
        left:0,
        top:0,
        borderTopColor:'#ecd447',
    },

    userTypeButton:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderWidth:1,
        borderColor:'#e6e5f3'
    },
    userTypeButtonSelect:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderWidth:1,
        borderColor:'#ecd447'
    }
})