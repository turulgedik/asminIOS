import React, { Component } from 'react'
import {View,Image} from 'react-native'
import icons from './icons'

export default class SplashView extends Component {
    render() {
        return (
            <View style={{flex:1,width:'100%',backgroundColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}}>
                <Image style={{width:'100%',height:'100%'}} source={icons.LogoFulllGif} resizeMode='contain'/>
            </View>
        )
    }
}
