import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Feather } from '@expo/vector-icons';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacheItemProps } from '../../components/TeacherItem';
import { BorderlessButton } from 'react-native-gesture-handler';
import style from './style';
import api from '../../services/api';

export default function TeacherList() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const [week_day, setweek_day] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState([]);

    function handleSubmit() {

        api.get('class', {
            params: {
                subject,
                week_day,
                time
            }
        }).then(resp => {
            AsyncStorage.getItem('favorite').then(r => {
                if (r) {
                    setFavorites(JSON.parse(r).map((x: TeacheItemProps) => x.teacher.id))
                }
            })
            setTeachers(resp.data)
        });
    }


    useEffect(() => {
        if (subject !== '' && week_day !== '' && time !== '') {
            handleSubmit();
        }
    }, [subject, week_day, time])
    return (
        <View style={style.container}>
            <PageHeader
                title="Proffys disponiveis"
                headerRight={
                    (
                        <BorderlessButton onPress={() => setIsFilterVisible(!isFilterVisible)}>
                            <Feather name="filter" size={20} color={isFilterVisible ? '#04d361' : '#fff'} />
                        </BorderlessButton>
                    )
                }
            >
                {isFilterVisible &&
                    (
                        <View style={style.searchForm}>
                            <Text style={style.label}>Materia</Text>
                            <TextInput
                                style={style.input}
                                value={subject}
                                onChangeText={text => { setSubject(text) }}
                            />
                            <View style={style.inputGroup}>
                                <View style={style.inputBlock}>
                                    <Text style={style.label}>Dia da Semana</Text>
                                    <TextInput
                                        style={style.input}
                                        value={week_day}
                                        onChangeText={text => setweek_day(text)}
                                    />
                                </View>
                                <View style={style.inputBlock}>
                                    <Text style={style.label}>Horario</Text>
                                    <TextInput
                                        style={style.input}
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
            </PageHeader>
            <ScrollView
                style={style.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((item: any, index) => {
                    return (
                        < TeacherItem
                            key={index}
                            teacher={item}
                            favorited={favorites.filter(x => x === item.id).length > 0}
                        />);
                })}
            </ScrollView>
        </View>
    );
}