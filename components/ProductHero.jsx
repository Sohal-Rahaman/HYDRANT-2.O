import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
// --- CORRECTED: Import from AppContext instead of CartContext ---
import { useApp } from '../context/AppContext'; 

const productImageUrl = require('/Users/sohalrahaman/HYDRA02/sohal8/assets/images/main.jpeg');

const product = { 
  id: 'prod1', 
  name: '20 Litre Water Jar', 
  price: '₹37',
  image: productImageUrl
};

const productFeatures = [
  'RO + UV Purified Water',
  'Daily Sanitized & Sealed Jars',
  'Contactless & On-time Delivery',
];

export default function ProductHero() {
  // --- CORRECTED: Use the new useApp hook ---
  const { addToCart } = useApp(); 

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Success', `${product.name} has been added to your cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product); 
    router.push('/checkout');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Our Hero Product</Text>
      <View style={styles.card}>
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.featuresContainer}>
          {productFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <FontAwesome5 name="check-circle" size={16} color="#2E8B57" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.addToCartButton]} onPress={handleAddToCart}>
            <Text style={[styles.buttonText, styles.addToCartButtonText]}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buyNowButton]} onPress={handleBuyNow}>
            <Text style={[styles.buttonText, styles.buyNowButtonText]}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productImage: {
    width: '80%',
    height: 200,
    marginBottom: 15,
  },
  productName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    color: '#001f3f',
  },
  featuresContainer: {
    marginVertical: 20,
    alignSelf: 'flex-start',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: 'rgba(135, 206, 235, 0.2)',
    marginRight: 10,
  },
  buyNowButton: {
    backgroundColor: '#001f3f',
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  addToCartButtonText: {
    color: '#001f3f',
  },
  buyNowButtonText: {
    color: '#ffffff',
  },
});