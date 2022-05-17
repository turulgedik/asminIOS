import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View,Text } from 'react-native'
import {styles} from './style'

export default class Dot extends Component {
    static propTypes = {
        size:PropTypes.number,
        count:PropTypes.number,
        index:PropTypes.number,
        color:PropTypes.string
    }

    item=(cc=0)=>{
        const {size,count,index,color} = this.props
        var items=[]
        for (let i = 0; i < count; i++) {
            console.log('anana')
            items.push(
                <View style={{width:size,height:size,borderRadius:size/2,borderColor:color,borderWidth:1,backgroundColor:i<=index?color:'white',marginRight:5}}/>
            )
        }

        return items
    }

    render() {
        console.log('pros',this.props)
        return (
            <View style={{flexDirection:'row'}}>
                {this.item()}
            </View>
        )
    }
}

Dot.defaultProps={
    size:20,
    count:5,
    index:2,
    color:'red'
}