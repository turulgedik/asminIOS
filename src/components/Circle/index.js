import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styles } from './styles'
import icons from '../../icons'

export default class Circle extends Component {
    render() {

        const { index, defaultColor, hoverColor, items } = this.props
        console.log('index',index)
        console.log('defaultColor',defaultColor)
        console.log('hoverColor',hoverColor)
        return (
            <View style={styles.container}>

                {
                    items.map((item, i) => {
                        return (
                            <View style={{ width: 75, marginBottom: 20 }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                    <View style={[styles.circleContainer, { borderColor: index > i ? hoverColor : defaultColor }]}>
                                        <View style={[styles.circle, { backgroundColor: index > i ? hoverColor : defaultColor }]}>
                                            <Image source={item} style={{ width: 30, height: 30 }} />
                                        </View>
                                    </View>
                                    {
                                        i<items.length-1?
                                        <View style={[styles.arrow, { backgroundColor: index > i ? hoverColor : defaultColor }]} />:<View style={{flex:1}}/>
                                    }
                                </View>
                                <View style={{ marginTop: 10, width: 45, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 12, color: 'black' }}>{i+1}</Text>
                                </View>
                            </View>
                        )
                    })
                }



            </View>
        )
    }
}
