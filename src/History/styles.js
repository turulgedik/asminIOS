import { Dimensions, Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    header: {
        height: 75,
        paddingHorizontal:10,
        width: '100%',
        flexDirection: 'row',
        backgroundColor:'#9b59b6'
    },
    headerTextContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    dateTimeContainer: {
        width: '100%',
        height: 250,
        backgroundColor: '#9b59b6',
        overflow: 'hidden',
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0
    },
    dateTimeBoxContainer:{
        position:'absolute',
        top:0,
        width:'100%',
        height:200,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    dateTimeBox:{
        width:Dimensions.get('window').width/3.5,
        height:Dimensions.get('window').width/3.5,
        backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:25
    },
    oval: {
        width: Dimensions.get('window').width / 1.8,
        height: Dimensions.get('window').width / 1.8,
        borderRadius: (Dimensions.get('window').width / 1.8) / 2,
        backgroundColor: '#a479b6',
        marginTop: -(Dimensions.get('window').width / 1.8) / 2,
        marginLeft: 25
    },
    contentContainer:{
        width:'100%',
        minHeight:200,
        marginTop:-50,
        backgroundColor:'#f1f1f1',
        borderRadius:50,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        overflow:'hidden',
        paddingVertical:20,
        paddingHorizontal:10
    },
    bottom:{
        height:60,
        width:'100%',
        paddingHorizontal:10,
        flexDirection:'row',
        borderTopWidth:0.5,
        borderTopColor:'#e1e1e1'
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
    textInput:{
        width:'80%',
        height:40,
        borderWidth:1,
        borderColor:'#e1e1e1',
        backgroundColor:'#e6e5f3',
        borderRadius:20,
    },
    textInputSelected:{
        width:'80%',
        height:40,
        borderWidth:1,
        borderColor:'#1e1e1e',
        backgroundColor:'#e6e5f3',
        borderRadius:20,
    },
})