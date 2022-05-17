import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style'

export default class AdressInfo extends Component {

    static propTypes = {
        adressList: PropTypes.array
    }

    render() {
        const { adressList,click } = this.props
        console.log(this.props)
        return (
            <View style={styles.container} >
                {
                    adressList.map((item, i) => {
                        const arrowBottom = (i + 1) < adressList.length ? true : false
                        console.log(arrowBottom)
                        return (
                            <TouchableOpacity style={{ height: 150, }} disabled={click!==undefined || click!==null?false:true} onPress={()=>{
                                click(item)
                            }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <View style={{ width: 75, height: '100%', flexDirection: 'row' }}>
                                        <View>
                                            <View style={styles.circleContainer}>
                                                <View style={styles.circle} />
                                            </View>
                                            {arrowBottom?<View style={styles.arrowBottom}/>:null}
                                        </View>
                                        <View style={styles.arrowRight} />
                                    </View>
                                    <View style={{flex:1,marginLeft:10}}>
                                        <Text style={{fontSize:18,fontWeight:'700'}}>{item.text}</Text>
                                        <Text style={{marginTop:10,fontSize:13,fontStyle:'italic'}}>{item.description}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}


AdressInfo.defaultProps = {
    adressList: []
}