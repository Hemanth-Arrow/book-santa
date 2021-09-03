import React from 'react' 
import {View,Text,TextInput,StyleSheet} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'
import { TouchableOpacity } from 'react-native'

export default class SettingsScreen extends React.Component{
constructor(){
    super()
this.state = {
    emailId : '',
    firstName : '',
    lastName : '',
    address : '',
    contact : '',
    docId : ''
}
}
getUserDetails = ()=>{
    var user = firebase.auth().currentUser
    var email = user.email 
    db.collection("users").where('email_id','==',email).get()
    .then(snapShot=>{
        snapShot.forEach(doc=>{
            var data = doc.data()
            this.setState({
                emailId : data.email_id,
                firstName : data.first_name,
                lastName : data.last_name,
                address: data.address,
                contact : data.contact,
                docId : doc.id
            })
        })
    })
}
componentDidMount(){
    this.getUserDetails()
}
 updateUserDetails(){
     db.collection("users").doc(this.state.docId).update({
         first_name : this.state.firstName,
         last_name : this.state.lastName,
         address : this.state.address,
         contact : this.state.contact
     })
 }
render(){
    return(
        <View style = {styles.container}>
            <MyHeader
            title = "Settings"
            navigation = {this.props.navigation}
            />
          <View style = {styles.formContainer}>
         <TextInput
         placeholder = {"firstname"}
         maxLength = {8}
         onChangeText = {(Text)=>{
             this.setState({
                 firstName : Text
             })
         }}
         value = {this.state.firstName}/>
          
          <TextInput
         placeholder = {"lastname"}
         maxLength = {8}
         onChangeText = {(Text)=>{
             this.setState({
                 lastName : Text
             })
         }}
         value = {this.state.lastName}/>
         
         <TextInput
         placeholder = {"contact"}
         maxLength = {10}
         keyboardType = {'numeric'}
         onChangeText = {(Text)=>{
             this.setState({
                 contact : Text
             })
         }}
         value = {this.state.contact}/>

<TextInput
         placeholder = {"Address"}
         mulitiline = {true}
         onChangeText = {(Text)=>{
             this.setState({
                 address: Text
             })
         }}
         value = {this.state.address}/>

         <TouchableOpacity style = {styles.button}
         onPress = {()=>{
             this.updateUserDetails()
         }}>
          <Text style = {styles.buttonText}>
              Save
          </Text>
         </TouchableOpacity>
          </View>
            
        </View>
    )
}




}
const styles = StyleSheet.create({ container : { flex:1, justifyContent: 'center' }, 
formContainer:{ flex:1, width:'100%', alignItems: 'center' }, 
formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, 
button:{ width:"75%", height:50, justifyContent:'center',marginTop:10, alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000",
shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })