import React,{useState , useEffect} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
const textSize = 20

export default function DetailScreen({ navigation, route }) {

  let Data = route.params?.detail;
  const [EpisodeList,setEpisodeList] = useState([]);
  const [Loading,setLoading] = useState(true);


  const getEpisodeData = () =>{
    const promises = Data.episode.map(url => {
      return axios.get(url).then(response => response?.data?.name);
    });
    
    Promise.all(promises)
      .then(data => {
        setEpisodeList(data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
      });
  }
  useEffect(()=>{
    getEpisodeData()
  },[])



  const Detail = ({ head, subHead }) => {
    return (
      <View style={{
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 5
      }}>
        <Text style={{
          color: '#fcfcfc',
          fontSize: textSize,
          fontWeight: 'bold',
          flex: 3
        }}>
          {head}
        </Text>
        <Text style={{
          color: '#fcfcfc',
          fontSize: textSize,
          fontWeight: 'bold',
          flex: 0.5
        }}>
          :
        </Text>
        <Text style={{
          color: '#fcfcfc',
          fontSize: textSize,
          flex: 7
        }}>
          {subHead}
        </Text>

      </View>
    )
  }

  const DetailOfEpisodes = ({ head, subHead }) => {
    return (
      <View style={{
      
        marginVertical: 20,
      }}>
        <View style={{alignItems:'center',  backgroundColor:'#3c3e44',}}>
          <Text style={{
          color: '#fcfcfc',
          fontSize: textSize,
          flex: 1,
          fontWeight:'bold',
          marginVertical:5
        }}>
            {head}
          </Text>
        </View>
       {Loading ? 
             <ActivityIndicator size="large" color="#fcfcfc" />
       : <View style={{flexDirection:'column'}}>
         {
          EpisodeList.map((item,index)=>{
            return(
              <View key={index} style={{flexDirection:'row'}}>
              <Text  style={
                {
                  color: '#fcfcfc',
                  fontSize: textSize,
                  flex: 1,
                  marginVertical:5
                }
              }>
               {index + 1}
              </Text>
              <Text  style={
                {
                  color: '#fcfcfc',
                  fontSize: textSize,
                  flex: 9,
                  marginVertical:5
                }
              }>
               {item}
              </Text>
              </View>
              
            )
          })
         }
        </View>}
      
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Image
            style={styles.imageView}
            source={{
              uri: Data.image
            }}
          />
        </View>
        <View style={styles.view3} />
        <View style={styles.view4}>
          <Detail subHead={Data.name} head={"Name"} />
          <Detail subHead={Data.species} head={"Species"} />
          <Detail subHead={Data.location.name} head={"Location"} />
          <Detail subHead={Data.origin.name} head={"Origin"} />
          <Detail subHead={Data.status} head={"Status"} />
          <Detail subHead={Data?.episode?.length} head={"Episode"} />
          <DetailOfEpisodes subHead={Data?.episode} head={"List of episodes"} />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272b33',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  view1:{
    flex: 1,
    flexDirection: 'column',
    padding: 20
  },
  view2:{
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView:{
    width: 300,
    height: 300,
    borderRadius: 150
  },
  view3:{
    height: 1,
    width: '100%',
    backgroundColor: '#fcfcfc',
    marginVertical: 10
  },
  view4:{
    flex: 7,
    flexDirection: 'column'
  }
})