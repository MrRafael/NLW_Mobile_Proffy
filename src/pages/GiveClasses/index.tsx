import React from 'react';
import { View, ImageBackground, Text } from 'react-native';

import giveClassBgImg from '../../assets/images/give-classes-background.png'

import style from './style';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function GiveClasses() {
    const { goBack } = useNavigation();
    return (
        <View style={style.container}>
            <ImageBackground
                source={giveClassBgImg}
                style={style.content}
                resizeMode='contain'
            >
                <Text style={style.title}>Quer ser um Proffy?</Text>
                <Text style={style.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>
            <RectButton
                style={style.okButton}
                onPress={() => goBack()}
            >
                <Text style={style.textOk}>
                    Tudo Bem
                </Text>
            </RectButton>
        </View>
    )
}