import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import dayjs from 'dayjs';


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
  const [response, setResponse] = useState([{
    "patient_id": 0,
    "timestamp": "2022-06-01T08:14:24.454000",
    "type": "temperature",
    "value": 0,
  }]);

  useEffect(() => {
    async function loadScreen() {
      const jsonResponse = await fetch('http://13.126.59.198/sensor-data/', {
        method: 'GET',
      }).then(response => response.json());
      setResponse(jsonResponse);
    }
    loadScreen()
  }, [])

  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <Text>This is {route.params.name}'s profile</Text>
      {/* <Text>Pulse: {response.pulse}</Text>
      <Text>Oxygen Rate: {response.oxygenRate} </Text>
      <Text>Temperature: {response.temperature}</Text> */}
      {/* <Text>{JSON.stringify(response)}</Text> */}
      <View>
        <LineChart
          data={{
            labels: response.map((t) => dayjs(t.timestamp).format('HH:mm:ss')),
            datasets: [
              {
                data: response.map((t) => t.value),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
              }
            ],
            legend: ['Patient Temperature'] // optional
          }}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#FFF",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#FFF",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `#000`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
        ></LineChart>
      </View>
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
