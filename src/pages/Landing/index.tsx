import React from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import style from './style';

export default function Landing() {
    const navigation = useNavigation();

    function handleNavigationToGiveClass() {
        navigation.navigate('GiveClasses')
    }

    function handleNavigationToStudyPages() {
        navigation.navigate('Study')
    }

    return (
        <View style={style.container}>
            <Image source={landingImg} style={style.banner} />
            <Text style={style.title}>
                Seja bem-vindo, {'\n'}
                <Text style={style.titleBold}> O que deseja fazer?</Text>
            </Text>
            <View style={style.buttonsContainer}>
                <RectButton
                    style={[style.button, style.buttonPrimary]}
                    onPress={handleNavigationToStudyPages}
                >
                    <Image source={studyIcon} />
                    <Text style={style.textButton}>Estudar</Text>
                </RectButton>
                <RectButton
                    style={[style.button, style.buttonSecondary]}
                    onPress={handleNavigationToGiveClass}
                >
                    <Image source={giveClassesIcon} />
                    <Text style={style.textButton}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={style.connections}>
                Total de 222 Conexões Realizas.{'  '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}