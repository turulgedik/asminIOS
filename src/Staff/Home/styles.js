import { Dimensions, Platform, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f1f1f1',

    },
    headerContainer: {
        width:'100%',
        
        height:75,
        alignItems:'center',
        justifyContent:'center'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width
    },
    topBar:{
        marginTop:20,
        width:'100%',
        height:150,
        flexDirection:'row'
    },
    bottomBarItem:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:'100%',

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
    officeButton:{
        width:50,
        height:50,
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        borderWidth:2,
        borderColor:'white',
        right:10,
        top:15
    }
})