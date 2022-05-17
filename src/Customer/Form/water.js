import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import icons from '../../icons'
import { falAction } from '../../redux/actions/fal'
import { styles } from './styles'
import { FORM_WATER, FORM_WATER_REMOVE } from '../../redux/actions/types'
import * as ImagePicker from 'expo-image-picker';

export class Water extends Component {


    pickImage = async (type) => {
        const { falAction } = this.props
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Fotoğraf Seçmek İçin Uygulamanın Fotoğraflara Erişimini Etkinleştirmeniz Gerekmektedir!');
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: false,
                    aspect: [4, 3],
                    quality: 1,
                    base64: true,
                });
                if (!result.cancelled) {
                    let localUri = result.uri;
                    let filename = localUri.split('/').pop();
                    result.name = filename
                    const data = {
                        type,
                        image: result
                    }
                    console.log('w',data)
                    falAction(FORM_WATER, data)
                }
            }
        }


    };

    removeImage = (type) => {
        const { falAction } = this.props
        const data = {
            type,
            image: null
        }
        falAction(FORM_WATER, data)
    }

    render() {
        const { navigation, item, falAction } = this.props
        console.log('coffie', item)
        return (
            <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Fotoğraf Ekle</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ textAlign: 'center',marginBottom:20 }}>Kendi Fotoğrafın</Text>
                        <TouchableOpacity style={[styles.photoItem,{marginRight:0}]} onPress={() => this.pickImage('pp')}>
                            {
                                item.water.pp === null ?
                                    <Image source={icons.Plus} style={{ width: 40, height: 40, tintColor: '#9b59b6' }} /> :
                                    <Image source={{ uri: item.water.pp.uri }} style={{ width: '100%', height: '100%' }} />
                            }
                            {
                                item.water.pp !== null ?
                                    <TouchableOpacity style={styles.removeImage} onPress={() => this.removeImage('pp')}>
                                        <Text style={{ color: 'white' }}>X</Text>
                                    </TouchableOpacity> : null
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ textAlign: 'center',marginBottom:20 }}>Partnerin Fotoğrafı</Text>
                        <TouchableOpacity style={[styles.photoItem,{marginRight:0}]} onPress={() => this.pickImage('part_pp')}>
                            {
                                item.water.part_pp === null ?
                                    <Image source={icons.Plus} style={{ width: 40, height: 40, tintColor: '#9b59b6' }} /> :
                                    <Image source={{ uri: item.water.part_pp.uri }} style={{ width: '100%', height: '100%' }} />
                            }
                            {
                                item.water.part_pp !== null ?
                                    <TouchableOpacity style={styles.removeImage} onPress={() => this.removeImage('part_pp')}>
                                        <Text style={{ color: 'white' }}>X</Text>
                                    </TouchableOpacity> : null
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.Form
})

const mapDispatchToProps = {
    falAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Water)
