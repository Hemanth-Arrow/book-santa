import React from 'react'
import {Header,Icon,Badge} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import { View,Text } from 'react-native'
export default class MyHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value : '' ,
            userId : firebase.auth().currentUser.email
            
        }
    }
    getNumberOfUnreadNotifications(){ db.collection('all_notifications').where('notification_status','==',"unread") .onSnapshot((snapshot)=>{ var unreadNotifications = snapshot.docs.map((doc) => doc.data()) 
        this.setState({ value: unreadNotifications.length }) }) }
    componentDidMount(){
        this.getNumberOfUnreadNotifications()

    }
    BellIconWithBadge = ()=>{
        return(
            <View>
                <Icon
                name = 'bell'
                type = 'font-awesome'
                color = '#696969'
                size = {25}

                />
               <Badge
               value = {this.state.value}
               containerStyle ={{position : 'absolute',top:-4,right:-4}}
                />

               

                
            </View>
        )
    }
    render(){
        return(
            <Header 
            leftComponent =  {<Icon
            name = 'bars'
            type = 'font-awesome'
            color = '#696969'
            onPress = {()=>this.props.navigation.toggleDrawer()} />}
            centerComponent  = {{
                text : this.props.title,style : {color:'orange',fontSize:20,fontWeight:'bold'}
            }}
            rightComponent  = {<this.BellIconWithBadge{...this.props}/>}/> 
        )
    }
}

