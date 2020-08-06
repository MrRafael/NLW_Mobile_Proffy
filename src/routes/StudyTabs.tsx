import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';
import { Ionicons } from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator();

export default function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elvevation: 0,
                    shadowOpacity: 0,
                    height: 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d'
            }}
        >
            <Screen
                name="TeacherList"
                options={{
                    tabBarLabel: "Proffys",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <Ionicons
                            name='ios-easel'
                            color={focused ? '#8257e5' : color}
                            size={size}
                        />
                    }
                }}
                component={TeacherList}
            />
            <Screen
                name="Favorites"
                options={{
                    tabBarLabel: "Favoritos",
                    tabBarIcon: ({ color, size, focused }) => {
                        return <Ionicons
                            name='ios-heart'
                            color={focused ? '#8257e5' : color}
                            size={size}
                        />
                    }
                }}
                component={Favorites} />
        </Navigator>
    );
}