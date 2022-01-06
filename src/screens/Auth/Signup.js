import {JS} from '@aws-amplify/core';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import {_axiosPostAPI} from '../../components/Apis';
import {firebase} from '@react-native-firebase/messaging';

const Signup = (props) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    Fcm();
  }, []);

  const Fcm = async () => {
    console.log(
      'INSIDEJHJSAHSUWYWETW^WWWWWWWWWWWWWWWWW^^^^^^^^^^^^^^^^^^^^^^^^^^',
    );
    const enabled = await firebase.messaging().hasPermission();
    console.log('ENABBBLEDDDD: ', enabled);
    if (enabled) {
    } else {
      try {
        console.log('NOOOOOOOOOOOOOOOOOOOOO: ', enabled);
        await firebase.messaging().requestPermission();
      } catch (error) {}
    }
    const fcmToken = await firebase.messaging().getToken();
    console.log('GETTTTTTTTTTTTTTTTTTT: ', fcmToken);
    if (fcmToken) {
      console.log('dfdfdfdf', fcmToken);
      // sendFcm(fcmToken)
      setFcmToken(fcmToken);
    } else {
      console.warn('no token');
    }
  };

  const LoginUser = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (Name === '') {
      alert('Please Enter Name');
    } else if (reg.test(Email) === false) {
      alert('Please Enter Valid Email');
    } else if (Password === '') {
      alert('Please Enter Password');
    } else {
      setLoading(true);
      let data = {};
      data['name'] = Name;
      data['email'] = Email;
      data['password'] = Password;
      data['fcmToken'] = fcmToken;
      data['role'] = 'driver';
      console.log('data', data);
      await _axiosPostAPI('api/taxi/user/signup', data)
        .then(async (response) => {
          setLoading(false);
          // alert(JSON.stringify(response))
          props.navigation.navigate('NotificationScreen');

          // props.navigation.navigate('Router');
        })
        .catch((err) => {
          setLoading(false);
          alert(JSON.stringify(err));
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={'Name'}
        value={Name}
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        style={[styles.textInput, {marginTop: '5%'}]}
        placeholder={'Email'}
        value={Email}
        keyboardType={'email-address'}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={[styles.textInput, {marginTop: '5%'}]}
        placeholder={'Password'}
        value={Password}
        onChangeText={(Password) => setPassword(Password)}
        secureTextEntry
      />

      <Pressable
        onPress={() => LoginUser()}
        style={{
          backgroundColor: 'orange',
          marginTop: '15%',
          width: '40%',
          alignItems: 'center',
          paddingVertical: '4%',
          borderRadius: 15,
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: 18}}>Sign up</Text>
      </Pressable>
      <Pressable
        onPress={() => props.navigation.navigate('Login')}
        style={{
          marginTop: '15%',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#000', fontSize: 16}}>
          Already have an account ? Sign in
        </Text>
      </Pressable>

      <Loader loading={loading} />
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '50%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'orange',
    width: '90%',
    borderRadius: 10,
    paddingLeft: 15,
  },
});
