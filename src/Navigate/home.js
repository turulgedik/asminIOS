import React, { Component } from 'react'
import { connect } from 'react-redux'
import CustomerHome from '../Customer/Home'
import StaffHome from '../Staff/Home'

export class Home extends Component {
    render() {

        const {user,navigation}=this.props

        return (
            user===null || user.user_type===2?
            <CustomerHome navigation={navigation}/>:
            <StaffHome navigation={navigation}/>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.User.user
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
