import {Card,Header,Icon} from 'react-native-elements'
import React from 'react' 
import firebase from 'firebase'
import db from '../config'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native' 
import { TouchableHighlight } from 'react-native-gesture-handler'
export default class RecieverDetailsScreen extends React.Component{
    constructor(props){
      super(props)
      this.state ={
          userId : firebase.auth().currentUser.email,
          recieverId : this.props.navigation.getParam('details')["user_id"],
          reqeustId : this.props.navigation.getParam('details')["request_id"],
          bookName : this.props.navigation.getParam('details')["book_name"],
          reason_for_requesting : this.props.navigation.getParam('details')["reason_to_request"],
          recieverName : '',
          recieverContact : '',
          recieverAddress : '',
          recieverRequestDocId : '',
          userName : '',


      }
    }
    getRecieverDetails(){
        db.collection('users').where('email_id','==',this.state.recieverId).get()
        .then(snapShot=>{
            snapShot.forEach(doc=>{
                console.log(doc)

                this.setState({
                    recieverName : doc.data().first_name,
                    recieverContact : doc.data().contact,
                    recieverAddress : doc.data().address
                })
            })
        }) 
        db.collection('requested_books').where('request_id','==',this.state.reqeustId).get()
        .then(snapShot=>{
            snapShot.forEach(doc=>{
                this.setState({
                    recieverRequestDocId : doc.id
                })
            })
        })
    }
    getUserDetails=(userId)=>{
        db.collection("users").where('email_id','==',userId)
        .get()
        .then(snapShot=>{
            snapShot.forEach(doc=>{
                this.setState({
                    userName:doc.data().first_name + " " + doc.data().last_name 
                })
            })
        })
    }
    addNotifications=()=>{
        
        var message = this.state.userName + "Has Shown Interest In Donating The Book"
        db.collection("all_notifications").add({
            targeted_user_id : this.state.recieverId,
            donor_id : this.state.userId,
            request_id : this.state.reqeustId,
            book_name : this.state.bookName,
            date : firebase.firestore.FieldValue.serverTimestamp(),
            notification_status : "unread",
            message : message
        })
    } 
    componentDidMount(){
        this.getRecieverDetails()
        this.getUserDetails(this.state.userId)
    }
    updateBookStatus=()=>{
        db.collection('all_donations').add({
            book_name : this.state.bookName,
            request_id : this.state.reqeustId,
            requested_by : this.state.recieverName,
            donor_id : this.state.userId,
            request_status : "Donor Interested" 
        })
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex : 0.1}}>
                <Header
                leftComponent = {<Icon
                name = 'arrow-left'
                type = 'feather'
                color = '#696969'
                onPress =  {()=>this.props.navigtaion.goBack()} />}
                centerComponent = {{text : "donateBooks",style : {color : '#90A5A9',fontSIze : 20,fontWeight : "bold"}}}
                backgroundColor = '#EAF8FE'
                />
                </View>
                <View style = {{flex : 0.3}}>
                <Card title = {"book information"}
                titleStyle = {{fontSize: 20}}>
                <Card>
                <Text style = {{fontWeight:"bold"}}>
                 Name-{this.state.bookName}
                </Text>
                </Card>
                <Card>
                <Text style = {{fontWeight:"bold"}}>
                 Reason-{this.state.reason_for_requesting}
                </Text>
                </Card>
                </Card>
                </View>
                <View style = {{flex : 0.3}}>
                <Card title = {"reciever information"}
                titleStyle = {{fontSize: 20}}>
                <Card>
                <Text style = {{fontWeight:"bold"}}>
                 Name-{this.state.recieverName}
                </Text>
                </Card>
                <Card>
                <Text style = {{fontWeight:"bold"}}>
                 Contact-{this.state.recieverContact}
                </Text>
                </Card>
                <Card>
                <Text style = {{fontWeight:"bold"}}>
                 Address-{this.state.recieverAddress}
                </Text>
                </Card>
                </Card>
                
                </View>
                <View style = {styles.buttonContainer}>
                    {this.state.recieverId!==this.state.userId?(
                        <TouchableOpacity style = {styles.button}
                        onPress = {()=>{
                            this.updateBookStatus()
                            this.addNotifications()
                            this.props.navigation.navigate("MyDonations")
                        }}>
                        <Text>
                            I want to Donate
                        </Text>
                        </TouchableOpacity>
                    ):null}
                
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({ container: { flex:1, }, buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' }, button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 } })