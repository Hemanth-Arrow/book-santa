
import React from "react" 
import { View,Text,StyleSheet } from "react-native" 
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from "firebase"
import { FlatList } from "react-native-gesture-handler"
import { ListItem,Icon } from "react-native-elements"
import SwipableFlatList from "../components/SwipableFlatList"
export default class NotficationScreen extends React.Component{
    constructor(props){
        super(props)
       this.state = {
           userId: firebase.auth().currentUser.email,
           allNotifications : []
        
       }
       this.notificationRef = null
       
    }
    getAllNotifications =()=>{
        this.requestRef = db.collection("all_notifications").where("notification_status" ,'==', 'unread')
        .where('targeted_user_id','==',this.state.userId)

        .onSnapshot((snapshot)=>{
          var allNotifications = []
          snapshot.docs.map((doc) =>{
            var notification = doc.data()
            notification["doc_id"] = doc.id
            allNotifications.push(notification)
          });
          this.setState({
            allNotifications : allNotifications
            
          });
          
        })
      }
      componentDidMount(){
          this.getAllNotifications()

      }
      componentWillUnmount(){
          this.notificationRef()
      }
      keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, index} ) =>(
     <ListItem
       key={index}
       title={item.book_name}
       subtitle={item.message}

       leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       
       bottomDivider
     />
   )
render(){
return(
    <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Notifications"/>
         <View style={{flex:1}}>
           {
             this.state.allNotifications.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all Notifications</Text>
               </View>
             )
             :(
               <SwipableFlatList
               allNotifications = {this.state.allNotifications}/>

             
             )
           }
         </View>
       </View>
)






}




}
const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })