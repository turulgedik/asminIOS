import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../Auth/login'
import CustomerProfile from '../Customer/Profile'
import StaffProfile from '../Staff/Profile'

export class Profile extends Component {
    render() {
        const {user,navigation}=this.props
        return (
            user===null?
            <Login navigation={navigation}/>:
            user.user_type===2?
            <CustomerProfile navigation={navigation}/>:
            <StaffProfile navigation={navigation}/>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.User.user

})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
