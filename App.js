import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, Button, View } from 'react-native';


const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Login"
      onPress={() =>
        navigation.navigate('Profile', { name: 'John Doe' })
      }
    />
  );
};
const ProfileScreen = ({ navigation, route }) => {
  const response = {
    pulse: '80/120',
    oxygenRate: '90',
    temperature: '40 C'
  };

  return (
    <View>
      <Text>This is {route.params.name}'s profile</Text>
      <Text>Pulse: {response.pulse}</Text>
      <Text>Oxygen Rate: {response.oxygenRate} </Text>
      <Text>Temperature: {response.temperature}</Text>
    </View>);
}

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Pulse Monitor' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
