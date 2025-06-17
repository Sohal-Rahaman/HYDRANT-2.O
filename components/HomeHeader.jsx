import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// 1. Import the hook to get safe area dimensions
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeHeader() {
  // 2. Get the top inset value (the height of the status bar/notch)
  const insets = useSafeAreaInsets();

  return (
    // 3. Apply the top inset as padding to the main container
    <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
      <View style={styles.navBar}>
        <Image
          source={require('/Users/sohalrahaman/HYDRA02/sohal8/assets/images/hydrant-icon.png')}
          style={styles.logo}
        />
        <Text style={styles.brandName}>HYDRANT 2.O</Text>
        <TouchableOpacity style={styles.callButton} onPress={() => Alert.alert('Calling Support...')}>
          <Ionicons name="call" size={20} color="#001f3f" />
        </TouchableOpacity>
      </View>
      <View style={styles.locationContainer}>
        <Ionicons name="home" size={20} color="#555" />
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationTitle}>HOME</Text>
          <Text style={styles.locationAddress} numberOfLines={1}>
            H Block, Connaught Place, New Delhi...
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="#555" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: '#F7F8FA',
    // The paddingTop is now applied dynamically above
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  brandName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    color: '#001f3f',
  },
  callButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  locationTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: '#888',
  },
  locationAddress: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
  },
});