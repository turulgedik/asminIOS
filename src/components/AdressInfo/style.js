import {Dimensions,Platform,StyleSheet} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles=StyleSheet.create({
    container:{
        width:'100%',
        padding:10
    },
    circleContainer:{
        width:35,
        height:35,
        borderRadius:17.5,
        borderWidth:2,
        borderColor:'#ecd447',
        alignItems:'center',
        justifyContent:'center'
    },
    circle:{
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#ecd447'
    },
    arrowRight:{
        flex:1,
        height:5,
        borderTopRightRadius:2.5,
        borderBottomRightRadius:2.5,
        backgroundColor:'#ecd447',
        marginTop:15
    },
    arrowBottom:{
        width:5,
        marginLeft:15,
        backgroundColor:'#ecd447',
        flex:1
    },
   
})