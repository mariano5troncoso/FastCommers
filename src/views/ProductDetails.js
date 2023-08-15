import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert ,ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';

const ProductDetails = () => {
  const route = useRoute();
  const { productId } = route.params;

  const products = useSelector((state) => state.products.products);
  const product = products.find((product) => product._id === productId);

  const handlePress = () => {
    Alert.alert('Add to cart');
    // Aquí puedes agregar la lógica que quieras ejecutar al presionar el botón
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <NavBar/>
      <Image source={{ uri: product.cover_photo[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description[0]?.resum}</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../assets/cart.png')} // Cambia la ruta a tu imagen PNG
            style={{ width: 100, height: 100 }}
            tittle={"Carrito"}
          />
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDescription: {
    fontSize: 16,
    marginTop: 10,
    color: 'gray',
  },
  errorMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductDetails;
