import React, { Component } from 'react'
import { View,Text,TouchableOpacity,Image } from 'react-native'
import { connect } from 'react-redux'
import {getCards} from '../../Apollo/Api/fal'
import icons from '../../icons'
import {falAction} from '../../redux/actions/fal'
import {IMAGE_URL} from '../../redux/actions/host'
import { FORM_ISKAMBIL, FORM_ISKAMBIL_REMOVE, } from '../../redux/actions/types'
import {styles} from './styles'

export class Iskambil extends Component {

    state={
        cards:[]
    }

    randomArrayShuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            try {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            } catch (error) {
                console.log('err', error)
            }
        }
        return array;
    }

    async componentDidMount(){
        const data = await getCards('iskambil')
        let copy = [...data.cards]
        const shuffleList = this.randomArrayShuffle(copy)
        this.setState({ cards: shuffleList })
    }

    render() {
        const {cards} = this.state
        const {item,falAction}=this.props
        console.log('cards',cards)
        return (
            <View style={{marginVertical:20,paddingHorizontal:10}}>
                <View style={{flexDirection:'row',marginBottom:20}}>
                    <Text style={{fontSize:20,fontWeight:'700'}}>7 Adet Kart Seç</Text>
                    <Text style={{flex:1,fontSize:15,fontWeight:'500', color:'#c1c1c1', textAlign:'right'}}>{item.iskambil.length +' / 7'}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
                    {
                        cards.map((x,i)=>{
                            const selected=item.iskambil.find(card=>card===x.id)
                            console.log('selected',selected)
                            return(
                                <TouchableOpacity style={selected?styles.tarotCardSelected:styles.tarotCard} onPress={()=>{
                                    if(!selected && item.iskambil.length===7)
                                        return
                                    falAction(selected?FORM_ISKAMBIL_REMOVE:FORM_ISKAMBIL,x.id)
                                }} key={i}>
                                    <Image source={icons.IskambilBack} style={{width:'100%',height:'100%',borderRadius:15}}/>
                                </TouchableOpacity>
                            )
                        })
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Iskambil)
