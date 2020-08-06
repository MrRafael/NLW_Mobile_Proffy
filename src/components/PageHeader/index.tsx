import React from 'react';

import style from './style';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'
import { useNavigation } from '@react-navigation/native';

interface PageHeaderProps {
    title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    const { navigate } = useNavigation();

    return (
        <View style={style.container}>
            <View style={style.topBar}>
                <BorderlessButton
                    onPress={() => navigate('Landing')}
                >
                    <Image resizeMode='contain' source={backIcon} />
                </BorderlessButton>

                <Image resizeMode='contain' source={logoImg} />
            </View>

            <Text style={style.title}>
                {title}
            </Text>
        </View>
    );
}

export default PageHeader;