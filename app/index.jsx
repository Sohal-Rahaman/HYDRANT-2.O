import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function StartPage() {
  const { loading, session } = useApp();

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/home" />;
}