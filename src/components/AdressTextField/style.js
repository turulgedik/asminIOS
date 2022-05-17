import {Dimensions,Platform,StyleSheet} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles=StyleSheet.create({
    container:{
        marginHorizontal:10,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#ecd447',
        paddingVertical:5
    },
   
})