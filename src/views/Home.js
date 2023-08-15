import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FondoHome from '../../assets/fondo.jpg';
import NavBar from '../components/NavBar.js';

const Home = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return value;
      } else {
        console.log('token:' + error);
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      setToken(storedToken);
      setUser(storedUser);
    };

    fetchTokenAndUser();
  }, []);

  const isLoggedIn = () => {
    return token && user;
  };

  return (
    <ImageBackground source={FondoHome} style={styles.backgroundImage}>
      <NavBar />
      <View style={styles.container}>
        <Text style={styles.TextWhite}>FastCommerce</Text>
        <Text style={styles.TextSub}>
          Join the online commerce revolution with FastCommerce. Get started today and experience the future of eCommerce!
        </Text>
        {!isLoggedIn() ? (
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <LinearGradient colors={['#525558', '#394651']} start={[0, 0]} end={[0, 1]} style={styles.buttonGradient}>
              <Text style={styles.textButtonHome}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => props.navigation.navigate('ProductsPrueba')}>
            <LinearGradient colors={['gray', 'gray']} start={[0, 0]} end={[0, 1]} style={styles.buttonGradient}>
              <Text style={styles.textButtonHome}>Search products</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      <StatusBar style="auto" backgroundColor="red" hidden={true} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextWhite: {
    color: 'white',
    fontSize: 51,
    letterSpacing: 2.4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  TextSub: {
    color: 'white',
    fontSize: 16,
    padding: 20,
    fontWeight: 'bold',
  },
  buttonGradient: {
    width: 363,
    paddingVertical: 15,
    paddingHorizontal: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    margin: 15,
    alignSelf: 'center',
  },
  textButtonHome: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: 'white',
  },
});

export default Home;
