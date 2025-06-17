import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// A reusable component for each social media link
const CommunityLink = ({ icon, name, url, color }) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Could not open ${name}`);
    }
  };

  return (
    <TouchableOpacity style={[styles.linkButton, { backgroundColor: color }]} onPress={handlePress}>
      <Ionicons name={icon} size={24} color="#ffffff" />
      <Text style={styles.linkButtonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerIcon}>
            <Ionicons name="people" size={50} color="#001f3f" />
        </View>
        
        <Text style={styles.title}>💧 Join the Hydrant Community</Text>
        <Text style={styles.subtitle}>Stay connected with us and never miss an update!</Text>
        
        <View style={styles.card}>
            <Text style={styles.paragraph}>
                The Hydrant Community is your space to get the latest news, app updates, service alerts, and engage directly with the team. Whether you have a question, feedback, or face any issues — we're here to help.
            </Text>

            <View style={styles.featureList}>
                <Text style={styles.featureItem}>✅ Get instant support</Text>
                <Text style={styles.featureItem}>✅ Receive important updates</Text>
                <Text style={styles.featureItem}>✅ Be the first to know about new features & offers</Text>
                <Text style={styles.featureItem}>✅ Connect with other Hydrant users</Text>
            </View>
        </View>

        <Text style={styles.joinTitle}>🔗 Join us on:</Text>
        
        <CommunityLink 
            icon="logo-whatsapp"
            name="WhatsApp Community"
            url="https://chat.whatsapp.com/Cgfr9QyhkVUAvdfn518kat"
            color="#25D366" // WhatsApp Green
        />
        <CommunityLink 
            icon="logo-instagram"
            name="Instagram"
            url="https://www.instagram.com/hydrant2.o?igsh=MTg3MmhsbG95azZybw=="
            color="#E4405F" // Instagram Pink
        />
        <CommunityLink 
            icon="logo-facebook"
            name="Facebook Page"
            url="https://www.facebook.com/share/16y9NaxRfu/"
            color="#1877F2" // Facebook Blue
        />

        <Text style={styles.footerText}>
            Let’s build a better, faster, and more reliable water delivery experience — together!
        </Text>
      </ScrollView>
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
    paddingBottom: 40,
  },
  headerIcon: {
      alignSelf: 'center',
      marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#001f3f',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },
  paragraph: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  featureList: {},
  featureItem: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
  },
  joinTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  linkButtonText: {
    color: '#ffffff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    marginLeft: 10,
  },
  footerText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});