import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import products from '../components/ProductPrueba';

const ProductDetails = () => {
  const route = useRoute();
  const { productId } = route.params;

  const product = products.find((product) => product.id === productId);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.cover_photo[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description[0].resum}</Text>
      {/* Mostrar otros detalles del producto */}
    </View>
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
});

export default ProductDetails;
