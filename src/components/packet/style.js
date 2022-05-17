import {Dimensions,Platform,StyleSheet} from 'react-native'

export const styles=StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        padding:10
    },
    infoBox:{
        flex:1,

    },
    circleContainer:{
        width:45,
        height:45,
        borderRadius:22.5,
        borderWidth:3,
        borderColor:'#ecd447',
        alignItems:'center',
        justifyContent:'center'
    },
    circle:{
        width:25,
        height:25,
        borderRadius:12.5,
        backgroundColor:'#ecd447',
        alignItems:'center',
        justifyContent:'center'
    },
    arrow:{
        flex:1,
        height:5,
        backgroundColor:'#ecd447'
    }
})