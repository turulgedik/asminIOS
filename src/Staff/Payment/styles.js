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
    ovalBack: {
        width: '100%',
        height: 280,
        backgroundColor: '#9b59b6',
        overflow: 'hidden',
        alignItems:'center',
    },
    boxContainer:{
        width:200,
        height:200,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
        backgroundColor:'#a479b6'
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
        marginLeft:width - ((width/1.3))
    },

    modalContentView:{
        width:width*0.8,
        maxHeight:height*0.7
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
        paddingTop:0,
    },
    monthView:{
        position:'absolute',
        top:0,
        right:10,
        paddingVertical:10,
        paddingHorizontal:20,
        borderWidth:1,
        borderColor:'white',
        borderRadius:20
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
})