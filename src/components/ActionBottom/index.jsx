import React,{useState} from 'react'
import {StyleSheet,View,Text,Dimensions,Animated, ScrollView, TouchableOpacity} from 'react-native'

const {width,height}=Dimensions.get('screen')


const ActionBottom=(props)=>{

    const [alignment] = useState(new Animated.Value(0))
    const [up, setUp] = useState(false);
    
    const bringUpActionSheet=()=>{
        Animated.timing(alignment,{
            toValue:1,
            duration:500
        }).start()
    }

    const hideUpActionSheet=()=>{
        Animated.timing(alignment,{
            toValue:0,
            duration:500
        }).start()
    }

    const requestHeight=props.height!==undefined?props.height:90

    const actionSheetIntropolate=alignment.interpolate({
        inputRange:[0,1],
        outputRange:[(-height / 2) + requestHeight, 0]
    })

    const actionSheetStyle={
        bottom:actionSheetIntropolate
    }

    const gestureHandler=()=>{
        
        if(!up){
            bringUpActionSheet()
            setUp(true)
        }else{
            hideUpActionSheet()
            setUp(false)
        }
    }

    return(
        <Animated.View style={[styles.container,actionSheetStyle]}>
            {
                props.sperator===undefined?
                <TouchableOpacity style={styles.grabber} onPress={()=>gestureHandler()}>
                    <View style={{height:5,width:60,backgroundColor:'#aaa'}}/>
                </TouchableOpacity>:null
            }
            {
                props.child
            }
        </Animated.View>
    )
}


const styles=StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        height:height/2,
        borderTopRightRadius:40,
        borderTopLeftRadius:40,
        width:width,
        backgroundColor:'white',
        borderWidth:0.3,
        borderColor:'#1e1e1e',
        paddingVertical:10,
        alignItems:'center'
    },
    grabber:{
        width:'100%',
        paddingVertical:5,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10
    }
})

export default ActionBottom