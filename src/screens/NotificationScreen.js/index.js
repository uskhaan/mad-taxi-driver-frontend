import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Button,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import {_axiosGetAPI} from '../../components/Apis';
import HomeScreen from '../../screens/HomeScreen/index';
import {StatusBar} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Booking 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Booking 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Booking 3',
  },
];

const Item = ({title, onAccept, onReject}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>PickUp: {title}</Text>
    <Text style={styles.title}>DropOff: {title}</Text>
    <Button
      onPress={onAccept}
      title="Accept"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
    <Button
      onPress={onReject}
      title="Reject"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  </View>
);

export const NotificationScreen = (props) => {
  // await _axiosPostAPI('api/taxi/user/login', data)

  React.useEffect(() => {
    _axiosGetAPI('api/taxi/bookings/getAll')
      .then(async (response) => {
        console.log('RES>>>>>>>>>>>>>>>>>>>>>>', response);
        alert(JSON.stringify(response.data));
        // props.navigation.navigate('NotificationScreen', );
      })
      .catch((err) => {
        // setLoading(false);
        alert(JSON.stringify(err));
      });
  }, []);
  const onAccept = (item) => {
    console.log('ITEM ACCEPT CLICKED: ', item);
    alert('ACCEPTED');
    props.navigation.navigate('HomeScreen');
  };
  const onReject = (item) => {
    console.log('ITEM Reject CLICKED: ', item);
    alert('Rejected');
  };
  const renderItem = ({item}) => (
    <Item title={item.title} onAccept={onAccept} onReject={onReject} />
  );

  return (
    <View>
      <Text>Booking # 2 Assign</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
