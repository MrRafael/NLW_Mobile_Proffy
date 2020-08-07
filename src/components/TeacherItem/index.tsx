import React, { useState } from 'react';

import { View, Image, Text, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import heartIcon from '../../assets/images/icons/heart-outline.png'
import api from '../../services/api';
import style from './style';

export interface TeacheItemProps {
    teacher: {
        id: number,
        avatar: string,
        bio: string,
        cost: number,
        name: string,
        subject: string,
        whatsapp: string,
    },
    favorited: boolean
}
const TeacherItem: React.FC<TeacheItemProps> = (props) => {
    const [isFavorited, setIsFavorited] = useState(props.favorited);

    function handleContact() {
        Linking.openURL(`whatsapp://send?phone=${props.teacher.whatsapp}`)
        api.post('connection', {
            user_id: props.teacher.id
        })
    }

    async function handleToggleFavorite() {
        let fvArray: Array<TeacheItemProps> = []

        if (isFavorited) {
            const index = fvArray.findIndex((x: TeacheItemProps) => {
                return x.teacher.id === props.teacher.id;
            })

            fvArray.splice(index, 1)
            setIsFavorited(false)
        } else {
            const favorites = await AsyncStorage.getItem('favorite');


            if (favorites) {
                fvArray = JSON.parse(favorites);
            }

            fvArray.push(props)

            setIsFavorited(true)
        }
        await AsyncStorage.setItem('favorite', JSON.stringify(fvArray));
    }
    return (
        <View style={style.container}>
            <View style={style.profile}>
                <Image
                    style={style.avatar}
                    source={{ uri: props.teacher.avatar }}
                />

                <View style={style.profileInfo}>
                    <Text style={style.name}>
                        {props.teacher.name}
                    </Text>
                    <Text style={style.subject}>
                        {props.teacher.subject}
                    </Text>
                </View>
            </View>
            <Text style={style.bio}>
                {props.teacher.bio}
            </Text>

            <View style={style.footer}>
                <Text style={style.cost}>
                    Preço/Hora {'  '}
                </Text>
                <Text style={style.priceValue}>{props.teacher.cost}</Text>

                <View style={style.buttonsContainer}>
                    <RectButton style={
                        [
                            style.favoriteBtt,
                            isFavorited ? style.favorited : {}
                        ]}
                        onPress={handleToggleFavorite}
                    >
                        {isFavorited ?
                            <Image source={unFavoriteIcon} />
                            : <Image source={heartIcon} />}

                    </RectButton>
                    <RectButton
                        style={style.contactBtt}
                        onPress={handleContact}
                    >
                        <Image source={whatsappIcon} />
                        <Text style={style.contactBttText}>
                            Entrar em contato.
                        </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}
export default TeacherItem;
