import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { styles } from './styles'
import icons from '../../icons'
import { Camera } from 'expo-camera';

export class CameraPage extends Component {

    state = {
        selectImage: null,
        hasPermission: false,
        showCamera: false
    }

    async componentDidMount() {
        this.getPermission()
    }

    async getPermission() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted')
            this.setState({ hasPermission: true })
    }

    async takePic() {
        const options = { quality: 0.1, base64: true, };
        const data = await this.camera.takePictureAsync(options);
        this.setState({ selectImage: data, showCamera: false }, () => console.log('takePic', data))
    }

    save = () => {
        /*
        const {selectImage}=this.state
        const {route,}=this.props

        let copy=selectImage
        copy['name']='test.jpg'

        var data=new FormData()
        data.append('type','adressImage')
        data.append('image',copy)
        data.append('adressID',route.params.data.id)

        if(route.params.saveFunc!==undefined)
        route.params.saveFunc(data)
        */
    }

    render() {
        const { navigation, route } = this.props
        const { hasPermission, showCamera, selectImage } = this.state

        const { save } = route.params
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
                    <Image source={icons.Back} style={{width:32,height:32,tintColor:'white'}} />
                </TouchableOpacity>
                <View style={styles.takeView}>
                    <TouchableOpacity style={styles.takeButton} onPress={() => {
                        if (selectImage === null) {
                            this.takePic()
                        } else {
                            if(save!==undefined)
                                save(selectImage)
                            navigation.goBack()
                        }
                    }}>
                        <Text style={{color:'white'}}>{selectImage===null ? 'Çek' : 'Kaydet'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, width: '100%' }}>
                        {   
                            !hasPermission?
                                <Text style={{ fontStyle: 'italic' }}>Kameraya İzin Vermeniz Gerekmektedir!</Text>:
                            selectImage!==null?
                                <Image source={{ uri: selectImage.uri }} style={{ width: '100%', height: '100%' }} />:
                                <Camera type={Camera.Constants.Type.back} style={{ flex: 1, width: '100%' }} ref={node => (this.camera = node)} />
                        }
                    </View>
                    
                </View>

                

            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage)
