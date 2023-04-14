import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/reducer';

const ListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingViewStyle]}>
        <ActivityIndicator size="large" color="#fcfcfc" />
        <Text style={styles.loadingText}>
          Loading
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.loadingViewStyle]}>
        <Text style={styles.text2}>Error: {error.message}</Text>
      </View>
    );
  }

  const Subheading = ({ initialHead, Description }) => {
    return (
      <View style={styles.subHeadingView}>
        <Text style={styles.subHeadingTitle} >{initialHead}</Text>
        <Text style={styles.colonstyle} >:</Text>
        <Text style={styles.subHeading} >{Description}</Text>
      </View>
    )
  }

  const CardView = ({ item }) => {
    let color = item.status == "Alive" ? "green" : item.status == "Dead" ? "red" : "grey"
    return (
      <TouchableOpacity style={styles.card} onPress={() => {
        navigation.navigate({
          name: 'Detail',
          params: { detail: item },
          merge: true,
        })
      }}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{
              uri: item.image
            }}

          />
        </View>
        <View style={styles.detailView}>
          <View style={styles.view1}>
            <Text style={[styles.title, { flex: 6 }]} >{item.name}</Text>
            <View style={[styles.statusView, { backgroundColor: color }]} />
          </View>
          <Subheading initialHead={'Species'} Description={item.species} />
          <Subheading initialHead={'Location'} Description={item?.location?.name} />
        </View>

      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={data?.results}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        style={{
          marginTop: 20
        }}
        ListHeaderComponent={() => {
          return (
            <View style={style.textView}>
              <Text style={styles.text2}>
                List of all character's
              </Text>
            </View>
          )
        }}
        renderItem={
          ({ item }) => {
            return <CardView item={item} />
          }
        }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272b33',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  loadingViewStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#fcfcfc',
    fontSize: 18,
    marginVertical: 10,
    alignSelf: 'center'
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3c3e44',
    padding: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 5,
  },
  imageView: {
    flex: 1,
  },
  textView: { alignItems: 'center', backgroundColor: '#3c3e44', flex: 1, height: 40 },
  text2: {
    color: '#fcfcfc',
    fontSize: 20,
    flex: 1,
    fontWeight: 'bold',
    marginVertical: 5
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 2,
  },
  detailView: {
    flex: 2.2,
    flexDirection: 'column',
  },
  title: {
    color: '#fcfcfc',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5
  },
  subHeadingTitle: {
    color: '#fcfcfc',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  subHeading: {
    color: '#fcfcfc',
    fontSize: 14,
    flex: 3,
  },
  subHeadingView: {
    flex: 1, flexDirection: 'row'
  },
  colonstyle: {
    flex: 0.2,
    color: '#fcfcfc'
  },
  view1: { flex: 1, alignItems: 'center', flexDirection: 'row' },
  statusView: { width: 15, height: 15, borderRadius: 15 / 2, right: 2 }
})

export default ListScreen;