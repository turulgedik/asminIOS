import React, { Component } from 'react'
import {styles} from './style'
import {View, Text, TouchableOpacity, Modal,KeyboardAvoidingView } from 'react-native'

export default class AuthModal extends Component {

    constructor(props){
        super(props)
        this.state={
            visible:true,
            closeButton:props.closeButton===undefined?true:props.closeButton,
        }
    }

    onShow=()=>{
        this.setState({visible:true}) 
    }
    onClose=()=>{
        this.setState({visible:false})
    }

    render() {

        const childrenProps=React.Children.map(this.props.children,child=>{
            if(React.isValidElement(child)){
                return React.cloneElement(child,{modalClose:this.onClose})
            }
            return child
        })

        return (
            <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                <KeyboardAvoidingView style={styles.background} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                    <View style={styles.contentView}>
                        {childrenProps}
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}
