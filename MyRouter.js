import React, { Component } from 'react'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadUser,logOut, getCSRF, getAppStatus} from './src/redux/actions/auth'

import Login from './src/Auth/login'
import Register from './src/Auth/register'

import CustomerHome from './src/Customer/Home'
import StaffList from './src/Customer/List'
import StaffCart from './src/Customer/Profile/StaffCart'
import CustomerProfile from './src/Customer/Profile'
import Market from './src/Customer/Market'
import Order from './src/Customer/Market/order'
import Form from './src/Customer/Form'
import PreviewFal from './src/PreviewFal'
import Gift from './src/Customer/Gift'
import Followers from './src/Followers'

import StaffHome from './src/Staff/Home'
import History from './src/History'
import Payment from './src/Staff/Payment'

import SplashView from './src/splash'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraPage from './src/components/Camera';

import Home from './src/Navigate/home'
import Profile from './src/Navigate/profile'
import Office from './src/Staff/Office'
import Fake from './src/Fake';

const Stack = createNativeStackNavigator();


export class MyRouter extends Component {

    state={
        token:''
    }

    constructor(props){
        super(props)
        
        setTimeout(() => {
            this.getToken()
        }, 3000);
        
    }
    componentDidMount(){
        this.props.getCSRF()
        this.props.getAppStatus()
    }

    getToken=async()=>{
        try {
            console.log('getToken')
            const value = await AsyncStorage.getItem('token')
            console.log('value',value)
            this.setState({token:value},()=>{
                if(value!==null){
                    this.props.loadUser(value)
                }
            })
            
            
        } catch(e) {

        }
    }

    render() {
        const {user,auth,appStatus} = this.props
        const {token}=this.state
        console.log('user',appStatus)
        return (
            <NavigationContainer>
                {
                    auth.isLoading || token===''?
                    <Stack.Navigator screenOptions={{
                        headerShown:false,
                    }}>
                        <Stack.Screen name="Splash" component={SplashView} />
                    </Stack.Navigator>:
                    !appStatus?
                    <Stack.Navigator screenOptions={{
                        headerShown:false,
                    }}>
                        <Stack.Screen name="Fake" component={Fake} />
                    </Stack.Navigator>:
                   <Stack.Navigator
                        screenOptions={{
                            headerShown:false,
                        }}>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Profile" component={Profile} />
                            <Stack.Screen name="Register" component={Register} />
                            <Stack.Screen name="StaffCart" component={StaffCart} />
                            <Stack.Screen name="CameraPage" component={CameraPage} />
                            <Stack.Screen name="PreviewFal" component={PreviewFal} />
                            <Stack.Screen name="Market" component={Market} /> 
                            <Stack.Screen name="Order" component={Order} />     
                            <Stack.Screen name="Form" component={Form} />   
                            <Stack.Screen name="StaffList" component={StaffList} />
                            <Stack.Screen name="Payment" component={Payment} />
                            <Stack.Screen name="History" component={History} />
                            <Stack.Screen name="Office" component={Office} />
                            <Stack.Screen name="Gift" component={Gift} />
                            <Stack.Screen name="Followers" component={Followers} />

                    </Stack.Navigator>
                }
            </NavigationContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    auth:state.User.auth,
    user:state.User.user,
    appStatus:state.App.status
})

const mapDispatchToProps = {
    loadUser,
    logOut,
    getCSRF,
    getAppStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRouter)
