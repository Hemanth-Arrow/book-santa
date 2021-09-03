import React from 'react' 
import { Settings } from 'react-native'
import {createDrawerNavigator} from 'react-navigation-drawer'
import SettingsScreen from '../screens/SettingsScreen'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSidebarMenu from './CustomSidebarMenu' 
import NotficationScreen from '../screens/NotificationScreen'
import MyDonations from '../screens/MyDonations'

export const AppDrawerNavigator = createDrawerNavigator({
    Home : {screen:AppTabNavigator},
    Settings : {screen : SettingsScreen},
    MyDonations : {screen : MyDonations},
   Notifications : {screen : NotficationScreen}

}, 
{contentComponent:CustomSidebarMenu},
{intialRouteName : 'Home'}
) 