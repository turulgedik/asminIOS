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
    modalContentView:{
        width:width*0.8,
        maxHeight:height*0.7
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
    removeImage:{
        position:'absolute',
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:'#e74c3c',
        alignItems:'center',
        justifyContent:'center',
        top:5,
        right:5
    },
    tarotCard:{
        width:75,
        height:120,
        borderRadius:15,
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        overflow:'hidden'
    },
    tarotCardSelected:{
        width:90,
        height:135,
        borderRadius:15,
        borderWidth:3,
        borderColor:'#2ecc71',
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        overflow:'hidden'
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
        borderTopColor:'#9b59b6',
        transform: [{ rotate: "90deg" }],
    },
    triangleCornerBottomLeft: {
        position:'absolute',
        left:0,
        bottom:0,
        borderTopColor:'#9b59b6',
        transform: [{ rotate: "270deg" }],
    },
    triangleCornerBottomRight: {
        transform: [{ rotate: "180deg" }],
        position:'absolute',
        right:0,
        bottom:0,
        borderTopColor:'#9b59b6',
    },
    triangleCornerTopLeft: {
        position:'absolute',
        left:0,
        top:0,
        borderTopColor:'#9b59b6',
    },
    answerTypeButton:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:60,
        borderWidth:1,
        borderColor:'#9b59b6',
        flexDirection:'row'
    },
    answerTypeButtonSelected:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:60,
        borderWidth:1,
        backgroundColor:'#9b59b6',
        flexDirection:'row'
    },
})