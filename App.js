// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React, {useEffect} from 'react';
// import {SafeAreaView, StatusBar} from 'react-native';
// import HomeScreen from './src/screens/HomeScreen';
// import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';

// import {withAuthenticator} from 'aws-amplify-react-native';
// import {getCarId} from './src/graphql/queries';
// import {createCar} from './src/graphql/mutations';

// const App: () => React$Node = () => {
//   useEffect(() => {
//     const updateUserCar = async () => {
//       // Get authenticated user
//       const authenticatedUser = await Auth.currentAuthenticatedUser({
//         bypassCache: true,
//       });
//       if (!authenticatedUser) {
//         return;
//       }

//       // Check if the user has already a car
//       const carData = await API.graphql(
//         graphqlOperation(getCarId, {id: authenticatedUser.attributes.sub}),
//       );

//       if (!!carData.data.getCar) {
//         console.log('User already has a car assigned');
//         return;
//       }

//       // If not, create a new car for the user
//       const newCar = {
//         id: authenticatedUser.attributes.sub,
//         type: 'UberX',
//         userId: authenticatedUser.attributes.sub,
//       };
//       await API.graphql(graphqlOperation(createCar, {input: newCar}));
//     };

//     updateUserCar();
//   }, []);

//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <HomeScreen />
//       </SafeAreaView>
//     </>
//   );
// };

// export default withAuthenticator(App);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {StatusBar, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MainContainer from './src/navigation/MainContainer';

navigator.geolocation = require('@react-native-community/geolocation');

const App = () => {
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Taxi App Location Permission',
          message:
            'Taxi App needs access to your location ' +
            'so you can take awesome rides.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <AuthStack /> */}
      <MainContainer />
      {/* <Router /> */}
    </>
  );
};

// export default withAuthenticator(App);
export default App;
