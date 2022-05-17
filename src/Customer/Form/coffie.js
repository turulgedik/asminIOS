import React, { Component } from 'react'
import { View,Text,TouchableOpacity,Image } from 'react-native'
import { connect } from 'react-redux'
import icons from '../../icons'
import {falAction} from '../../redux/actions/fal'
import {styles} from './styles'
import {FORM_COFFIE} from '../../redux/actions/types'

export class Coffie extends Component {

    savePhoto=(type)=>{
        const {navigation,falAction}=this.props
        navigation.navigate('CameraPage',{save:(photo)=>{
            console.log('photo',photo)
            const data={
                type,
                image:photo
            }
            falAction(FORM_COFFIE,data)
        }})
    }

    removeImage=(type)=>{
        const {falAction}=this.props
        const data={
            type,
            image:null
        }
        falAction(FORM_COFFIE,data)
    }

    render() {
        const {navigation,item,falAction}=this.props
        console.log('coffie',item)
        return (
            <View style={{paddingHorizontal:10,paddingBottom:20}}>
                <Text style={{fontSize:20,fontWeight:'700',marginBottom:20}}>Fincan Fotoğraf Ekle</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
                    <TouchableOpacity style={styles.photoItem} onPress={()=>this.savePhoto('image1')}>
                        {
                            item.coffie.image1===null?
                                <Image source={icons.Plus} style={{width:40,height:40,tintColor:'#9b59b6'}} />:
                            <Image source={{ uri: item.coffie.image1.uri }} style={{ width: '100%', height: '100%' }}  />
                        }
                        {
                            item.coffie.image1!==null?
                            <TouchableOpacity style={styles.removeImage} onPress={()=>this.removeImage('image1')}>
                                <Text style={{color:'white'}}>X</Text>
                            </TouchableOpacity>:null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoItem} onPress={()=>this.savePhoto('image2')}>
                    {
                            item.coffie.image2===null?
                                <Image source={icons.Plus} style={{width:40,height:40,tintColor:'#9b59b6'}} />:
                            <Image source={{ uri: item.coffie.image2.uri }} style={{ width: '100%', height: '100%' }}  />
                        }
                        {
                            item.coffie.image2!==null?
                            <TouchableOpacity style={styles.removeImage} onPress={()=>this.removeImage('image2')}>
                                <Text style={{color:'white'}}>X</Text>
                            </TouchableOpacity>:null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoItem} onPress={()=>this.savePhoto('image3')}>
                    {
                            item.coffie.image3===null?
                                <Image source={icons.Plus} style={{width:40,height:40,tintColor:'#9b59b6'}} />:
                            <Image source={{ uri: item.coffie.image3.uri }} style={{ width: '100%', height: '100%' }}  />
                        }
                        {
                            item.coffie.image3!==null?
                            <TouchableOpacity style={styles.removeImage} onPress={()=>this.removeImage('image3')}>
                                <Text style={{color:'white'}}>X</Text>
                            </TouchableOpacity>:null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoItem} onPress={()=>this.savePhoto('image4')}>
                    {
                            item.coffie.image4===null?
                                <Image source={icons.Plus} style={{width:40,height:40,tintColor:'#9b59b6'}} />:
                            <Image source={{ uri: item.coffie.image4.uri }} style={{ width: '100%', height: '100%' }}  />
                        }
                        {
                            item.coffie.image4!==null?
                            <TouchableOpacity style={styles.removeImage} onPress={()=>this.removeImage('image4')}>
                                <Text style={{color:'white'}}>X</Text>
                            </TouchableOpacity>:null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoItem} onPress={()=>this.savePhoto('image5')}>
                    {
                            item.coffie.image5===null?
                                <Image source={icons.Plus} style={{width:40,height:40,tintColor:'#9b59b6'}} />:
                            <Image source={{ uri: item.coffie.image5.uri }} style={{ width: '100%', height: '100%' }}  />
                        }
                        {
                            item.coffie.image5!==null?
                            <TouchableOpacity style={styles.removeImage} onPress={()=>this.removeImage('image5')}>
                                <Text style={{color:'white'}}>X</Text>
                            </TouchableOpacity>:null
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    item:state.Form
})

const mapDispatchToProps = {
    falAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Coffie)
