import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyPicker } from './MyPicker';
import { MyChart } from './MyChart';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([ // https://reactnavigation.org/docs/troubleshooting/
  'Non-serializable values were found in the navigation state',
]);

function HomeScreen({ navigation, route }) {
  const [selectedName, setSelectedName] = React.useState('');
  const [selectedFlyFrom, setSelectedFlyFrom] = React.useState('');
  const [selectedFlyTo, setSelectedFlyTo] = React.useState('');
  const [dbData, setDbData] = React.useState('');

  useEffect(() => {
    fetch('http://192.168.1.5:8000/getAppNames/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then((response) => response.json())
    .then((json) => {
      if(json){
        setDbData(json);
      } else {
        setDbData({names: [""], flyFrom: [""], flyTo: [""]});
        alert("Bad data from backend server!");
    }
    })
    .catch((error) => {
      setDbData({names: [""], flyFrom: [""], flyTo: [""]});   // Code to check that we connected to server and, if not, create an empty array.
      alert("Can't connect to backend server!");
      console.error(error);
    });
  }, []);  // The empty array means this code only runs when the compnent is mounted

  const passSelectedData = (selectedData, dataType) => {
    if(dataType == 'name'){
      setSelectedName(selectedData);
    }
    if(dataType == 'flyFrom'){
      setSelectedFlyFrom(selectedData);
    }
    if(dataType == 'flyTo'){
      setSelectedFlyTo(selectedData);
    }
  };

  return (
    <View style={{ flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                   backgroundColor: '#1e90ff',
                   paddingBottom: 50
                 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e90ff' }}>
        <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
               style={{width: 400, height: 400}} />
        <Text style={{ margin: 10 }}>This is my project bla bla bla</Text>
        <Text style={styles.displayText}>{selectedName}</Text>
        <Text style={styles.displayText}>{selectedFlyFrom}</Text>
        <Text style={styles.displayText}>{selectedFlyTo}</Text>
      </View>
      <View style={{ padding: 5, backgroundColor: '#c0c0c0', marginBottom: 0, marginTop: 10, borderColor: '#6060ff', borderWidth: 2, borderRadius: 10, }} >
        <Text onPress={() => navigation.navigate('LoadData', { show: true, homeCallBack: passSelectedData, theDbData: dbData, selName: selectedName, selFlyFrom: selectedFlyFrom, selFlyTo: selectedFlyTo })}>
          Load stuff from the database
        </Text>
      </View>
      <View style={{ padding: 5, backgroundColor: '#c0c0c0', marginBottom: 40, marginTop: 10, borderColor: '#6060ff', borderWidth: 2, borderRadius: 10, }} >
        <Text onPress={() => navigation.navigate('ChartTheData', { show: true, homeCallBack: passSelectedData, theDbData: dbData, selName: selectedName, selFlyFrom: selectedFlyFrom, selFlyTo: selectedFlyTo })}>
          Chart The Data
        </Text>
      </View>
    </View>
  );
}

function ChartTheData({ navigation, route }) {
  if(route.params.show == false){
    return null;
  }

  let lineData = {interpolation: 'T', data: [0, 5, 10, 15, 10, 5, 0, -5]};
  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#1e90ff',
                   paddingBottom: 50
                 }}>
      <View style={{ backgroundColor: '#ffffff', borderColor: '#000000', borderWidth: 2, padding: 2 }} >
        <MyChart dataToChart = {lineData} > </MyChart>
      </View>
      <View style={{ padding: 5, marginTop: 10, backgroundColor: '#c0c0c0', borderColor: '#6060ff', borderWidth: 2, borderRadius: 10, }} >
        <Text onPress={() => navigation.goBack()}>
          Done (back to Home screen)
        </Text>
      </View>
    </View>
  );
}

function LoadDataScreen({ navigation, route }) {
  if(route.params.show == false){
    return null;
  }
  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#1e90ff',
                   paddingBottom: 50
                 }}>
      <MyPicker callBackFunction = {route.params.homeCallBack} dataToLoad = {route.params.theDbData} selNam = {route.params.selName} selFlyFro = {route.params.selFlyFrom} selFlyT = {route.params.selFlyTo} >
      </MyPicker>
      <View style={{ padding: 5, marginTop: 50, backgroundColor: '#c0c0c0', borderColor: '#6060ff', borderWidth: 2, borderRadius: 10, }} >
        <Text onPress={() => navigation.goBack()}>
          Done (back to Home screen)
        </Text>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'My Cool App',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="LoadData"
          component={LoadDataScreen}
          options={{
            title: 'Load server data',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#000080',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="ChartTheData"
          component={ChartTheData}
          options={{
            title: 'Chart',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#000080',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  displayText: {
    backgroundColor: '#2196F3',
    borderColor: '#408040',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    width: 125,
    marginTop: 5,
    textAlign: 'left',
    marginLeft: 10,
    elevation: 2
  },
});
