import React, { Component } from 'react'
import { View,Text,TouchableOpacity,Image,Modal, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import icons from '../icons'
import {styles} from './style'
import AuthModal from './modal'
import CustomTextInput from '../components/TextInput'
import Dot from '../components/Dots'
import Login from './login'
import  Register from './register'
import { LinearGradient } from 'expo-linear-gradient';
import ActionBottom from '../components/ActionBottom'

export class Auth extends Component {
    state={
        userType:1,
        page:'login',
        pageHeight:0
    }

    goPage=(page)=>{
        this.setState({page:page})
    }

    render() {
        const {phone,password,userType,page,pageHeight}=this.state
        //const {navigation,login,register}=this.props
        console.log('test',pageHeight)

        return (
            <LinearGradient style={{flex:1,width:'100%'}}
            colors={['#9b59b6','#f0e178']}>
                
                <Image source={icons.LogoFulll} style={{width:'100%',height:'50%', tintColor:'white'}} resizeMode='contain'/>
                <ActionBottom sperator={false} height={pageHeight} child={
                    <ScrollView style={{width:'100%',backgroundColor:'red',height:pageHeight}}>
                        {
                            page==='login'?
                            <Login goPage={this.goPage} login={null} heightChange={(height)=>{
                                this.setState({pageHeight:height})
                            }}/>:
                            <Register goPage={this.goPage} register={null} heightChange={(height)=>{
                                this.setState({pageHeight:height})
                            }}/>
                        }
                    </ScrollView>
                    
                }>
                    
                    
                </ActionBottom>
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
