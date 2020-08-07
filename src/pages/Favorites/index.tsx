import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import style from './style';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacheItemProps } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('favorite').then(r => {
            if (r) {
                setFavorites(JSON.parse(r).map((x: TeacheItemProps) => x.teacher))
            }
        })
    }, [])

    return (
        <View style={style.container}>
            <PageHeader title="Meus Proffys favoritos" />
            <ScrollView
                style={style.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((x, i) => <TeacherItem key={i} teacher={x} favorited />)}
            </ScrollView>
        </View>
    );
}