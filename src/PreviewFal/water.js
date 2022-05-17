import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import icons from '../icons'
import { styles } from './styles'
import * as ImagePicker from 'expo-image-picker';
import { IMAGE_URL } from '../redux/actions/host';

export default class Water extends Component {

    render() {
        const { item } = this.props
        return (
            <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Fotoğraflar</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        item.pp ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={{ textAlign: 'center', marginBottom: 20 }}>Kendi Fotoğrafın</Text>
                                <TouchableOpacity style={[styles.photoItem, { marginRight: 0 }]} onPress={() => { }}>
                                    <Image source={{ uri: IMAGE_URL + item.pp }} style={{ width: '100%', height: '100%' }} />
                                </TouchableOpacity>
                            </View> : null
                    }
                    {
                        item.partPp ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={{ textAlign: 'center', marginBottom: 20 }}>Partnerin Fotoğrafı</Text>
                                <TouchableOpacity style={[styles.photoItem, { marginRight: 0 }]} onPress={() => { }}>
                                    <Image source={{ uri: item.part_pp }} style={{ width: '100%', height: '100%' }} />
                                </TouchableOpacity>
                            </View> : null
                    }
                </View>
            </View>
        )
    }
}

