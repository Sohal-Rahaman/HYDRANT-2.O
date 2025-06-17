import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// This is the reusable row component
const ContactRow = ({ icon, label, value, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} disabled={!onPress}>
    <Ionicons name={icon} size={26} color="#001f3f" style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    {/* The forward arrow only shows if it's pressable */}
    {onPress && <Ionicons name="chevron-forward" size={22} color="#ccc" />}
  </TouchableOpacity>
);

export default function ContactUsScreen() {
  // This function handles opening the link
  const handlePress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Get in Touch</Text>
          <Text style={styles.cardSubtitle}>We are here to help you. Reach out to us through any of the following channels.</Text>
          
          <View style={styles.contactMethods}>
            {/* Each of these rows has an onPress handler with the correct URL scheme */}
            <ContactRow 
              icon="call-outline" 
              label="Call Support" 
              value="7908013185" 
              onPress={() => handlePress('tel:7908013185')}
            />
             <ContactRow 
              icon="call-outline" 
              label="Alternate Number" 
              value="9832036181" 
              onPress={() => handlePress('tel:9832036181')}
            />
             <ContactRow 
              icon="logo-whatsapp" 
              label="WhatsApp Support" 
              value="+91 99999 99999" 
              onPress={() => handlePress('https://wa.me/919999999999')}
            />
            <ContactRow 
              icon="mail-outline" 
              label="Email Support" 
              value="hydrantwater@gmail.com" 
              onPress={() => handlePress('mailto:hydrantwater@gmail.com')}
            />
            <ContactRow 
              icon="business-outline" 
              label="Office Address" 
              value="Dum Dum, Kolkata - 700074" 
            />
            <ContactRow 
              icon="time-outline" 
              label="Working Hours" 
              value="10:30 AM - 08:30 PM" 
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
    paddingTop: 10,
  },
  cardSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  contactMethods: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  icon: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#333',
  },
});