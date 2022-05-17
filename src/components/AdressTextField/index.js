import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { styles } from './style'
import { TextField } from 'rn-material-ui-textfield'

export default class MyTextField extends Component {
    static propTypes = {
        prop: PropTypes,
        style:PropTypes.object
    }

    render() {
        const {style}=this.props
        return (
            <View style={styles.container}>
                <TextField style={{height:60,margin:5,position:'absolute'}} fontSize={8}/>
            </View>
        )
    }
}


MyTextField.defaultProps={
    
}
