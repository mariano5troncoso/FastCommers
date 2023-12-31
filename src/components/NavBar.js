import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUser, setPhoto } from '../../redux/actions/auth.js';
import { useNavigation, Link as Anchor } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiUrl, endpoints } from '../../utils/api.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NavBar = () => {
 
  const [user, setUser] = useState(null); // Nuevo estado para el usuario
  const [photo, setPhoto] = useState(null); // Nuevo estado para la foto
  const [display, setDisplay] = useState(false);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

 

  // Función para obtener el token almacenado en AsyncStorage
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return value;
      } else {
        console.log("Token no encontrado");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const signout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('photo');
      setToken(null);
      setUser(null);
      setPhoto(null);
      setDisplay(false);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTokenFromStorage = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };

    getTokenFromStorage();
  }, []);

  const isLoggedIn = () => {
    return token !== null;
  };


  useEffect(() => {
    const fetchUserAndPhoto = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedPhoto = await AsyncStorage.getItem('photo');
      setUser(storedUser);
      setPhoto(storedPhoto);
    };

    fetchUserAndPhoto();
  }, []);
 

  const handleHomePress = () => {
    navigation.navigate('Home');
    setDisplay(!display);
  }
  const handleRegisterPress = () => {
    navigation.navigate('Register')
    setDisplay(!display)
  }
  const handleSignInPress = () => {
    navigation.navigate('SignIn')
    setDisplay(!display)
  }
  const handleProductsPruebaPress = () => {
    navigation.navigate('ProductsPrueba'); // Asegúrate de que 'ProductsPrueba' coincida con el nombre de la pantalla en tu navegación
    setDisplay(!display);
  }

  return (
    <View style={styles.navBar}>
    <TouchableOpacity onPress={()=> setDisplay(!display)}>
      <Image source={require('../../assets/Menu.png')} />
    </TouchableOpacity>
    {display && (
      <LinearGradient colors={['rgb(92,110,141)', 'rgb(92,110,141)']} bottom={[1, 0]} top={[0, 0]} style={styles.containerNavBar}>
      <View style={styles.containerNavBar}>
        <View style={styles.navigation}>
          <TouchableOpacity onPress={handleHomePress}>
            <Text style={styles.textNavigation}>Home</Text>
          </TouchableOpacity>
          {!isLoggedIn() && (
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.textNavigation}>Register</Text>
          </TouchableOpacity>
          )}
          {!isLoggedIn() && (
          <TouchableOpacity onPress={handleSignInPress}>
            <Text style={styles.textNavigation}>Sign In</Text>
          </TouchableOpacity>
          )}
          {isLoggedIn() && (
                <TouchableOpacity onPress={handleProductsPruebaPress}>
                  <Text style={styles.textNavigation}>Products</Text>
                </TouchableOpacity>
              )}
          {isLoggedIn() && (
            <TouchableOpacity onPress={signout}>
              <Text style={styles.textNavigation}>Sign Out</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.contentNavBar}>
          {isLoggedIn() && ( <Image source={{uri: photo}} style={styles.userPhoto}/>)}
          <TouchableOpacity onPress={()=> setDisplay(!display)}>
            <Image source={require('../../assets/filled.png')} style={styles.closed} />
          </TouchableOpacity>
          
        </View>
        </View>
        </LinearGradient>
      
    )}
    
    <Image style={styles.Logonew} source={require('../../assets/Logo.png')} />
  </View>
  )
}

export default NavBar

const styles = StyleSheet.create({
    navBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        flexShrink: 0,
        zIndex: 999
      },
    Logonew: {
      width: 100,
      height: 100,
    },
    containerNavBar: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: 300,
        minHeight: 683,
        flex: 1,
        gap: 147,
        padding: 6,
        top: 0,
        left: 0,
        position: 'absolute',
        color: 'gray'
    },
    contentNavBar: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        gap: 8,
        top: 20,
        right: 20,
        position: 'absolute'
    },
    closed: {
        display: 'flex',
        marginLeft: '20%',
        width: 35,
        height: 35
    },
    userPhoto: {
      width: 60,
      height: 60,
      left: -160,
      top: 0,
      borderRadius: 50,
      position: 'absolute',
      backgroundColor: 'white'
    },
    navigation: {
        marginTop: 100,
        marginLeft: 10
    },
    textNavigation: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 20
    }
})