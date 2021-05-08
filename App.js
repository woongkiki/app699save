import React, {useEffect} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import {fcmService} from './src/FCMService'
import {localNotificationService} from './src/LocalNotificationService'
import {WebView} from 'react-native-webview'
import WebViews from './src/Webviews'
import firebase from '@react-native-firebase/app';
import iid from '@react-native-firebase/iid';

export default function App() {



    async function Auth_App() {
        const id = await iid().get();
        console.log('Current Instance ID: ', id);
        const token = await firebase.iid().getToken();
        console.log('Token: ', token);
    }

    Auth_App()

    useEffect(() => {
        fcmService.registerAppWithFCM()
        fcmService.register(onRegister, onNotification, onOpenNotification)
        localNotificationService.configure(onOpenNotification)
        function onRegister(token) {
            console.log("[App] onRegister: ", token)



        }
        function onNotification(notify) {
            console.log("[App] onNotification: ", notify)
            const options = {
                soundName: 'default',
                playSound: true //,
                // largeIcon: ‘ic_launcher’, // add icon large for Android (Link: app/src/main/mipmap)
                // smallIcon: ‘ic_launcher’ // add icon small for Android (Link: app/src/main/mipmap)
            }
            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )
        }
        function onOpenNotification(notify) {
            console.log("[App] onOpenNotification: ", notify)
            //alert("Open Notification: " + notify.body)
        }

        return () => {
            console.log("[App] unRegister")
            fcmService.unRegister()
            localNotificationService.unregister()
        }
    }, [])

    return (
        <WebViews />
    )
}
