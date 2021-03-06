import React from 'react';
import db from '../config.js';
import firebase from 'firebase';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  KeyboardAvoidingView,
  FlatList,
 
} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { SnapshotViewIOS } from 'react-native';
export default class BookDonateScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            requestedBooksList : [],

        }
        this.requestRef = null
    }
    getRequestedBooksList = ()=>{
        this.requestRef = db.collection("requested_books")
        .onSnapshot(Snapshot=>{
            var requestedBooksList = Snapshot.docs.map(document=>document.data())
            this.setState({
                requestedBooksList : requestedBooksList
            })
        })
    }
    componentDidMount(){
        this.getRequestedBooksList()
    }
    componentWillUnmount(){
        this.requestRef() 
    }
    keyExtractor = (item,index)=>index.toString()
    renderItem = ({item,i})=>{
        return(
            <ListItem 
            key = {i}
            title = {item.book_name}
            subtitle = {item.reason_to_request}
            titleStyle = {{color : "black",fontWeight : "bold"}}
            rightElement = {
                <TouchableOpacity style = {styles.button} 
                onPress = {()=>{
                    this.props.navigation.navigate('RecieverDetails',{"details" : item})
                }}>
                 <Text style = {{color : 'white'}}>
                     View
                 </Text>
                </TouchableOpacity>
            }
            bottomDivider />


           
        )
    }
    render(){
        return(
            <View style = {{flex : 1}}>
              <MyHeader
              title = "donateBooks"
              navigation = {this.props.navigation}
              />
                <View style = {{flex:1}}>
                {
                    this.state.requestedBooksList === 0 
                    ?(<View style = {styles.subContainer}>
                        <Text style = {{fontSize : 20}}>
                            List Of All Your Requested Books
                        </Text>
                    </View>)
                    : (
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.requestedBooksList}
                        renderItem = {this.renderItem}/>
                    )
                }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({ subContainer:{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' }, button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 } } })