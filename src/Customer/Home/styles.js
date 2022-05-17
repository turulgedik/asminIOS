import { Dimensions, Platform, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'#f1f1f1',
        alignItems:'center',
        justifyContent:'center'
    },
    cone: {
        width: 0,
        height: 0,
        borderLeftWidth: 55,
        borderLeftColor: "transparent",
        borderRightWidth: 55,
        borderRightColor: "transparent",
        borderTopWidth: 100,
        borderTopColor: "red",
        borderRadius: 55,
    },
    topBarItem:{
        width:100,
        height:35,
        backgroundColor:'#9b59b6',
        borderRadius:25,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    bottomBarItem:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:'100%',

    },
    topUserItem:{
        width:width/3-50,
        height:width/3-50,
        borderWidth:5,
        borderRadius:(width/3-50)/2,
        padding:10
    },
    topUserBackView:{
        flex:1,
        borderRightColor:'#9b59b6',
        borderRightWidth:0.2,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderBottomColor:'#9b59b6',
        borderBottomWidth:0.2
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
    userTypeButton:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:60,
        borderWidth:1,
        borderColor:'#9b59b6'
    },
})