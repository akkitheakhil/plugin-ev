import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch } from 'react-redux';
import { Input } from "react-native-elements";
import {
    setDestination,
    setOrigin,
    setPlacesInfo,
  } from "../store/slices/PlugInSlice";
import HomeNavigation from "../components/HomeNavigation";
import * as Location from "expo-location";

const HomeScreen = () => {
    const dispatch = useDispatch();

    let homePlace = {
        description: "Current Location",
        geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
    };
    

    useEffect(() => {
        requestLocationAccess();
    }, []);
    
    
  const requestLocationAccess = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const { coords } = location;
    if (coords) {
      const { latitude, longitude } = coords;
      homePlace.geometry.location = { lat: latitude, lng: longitude };
    }
  };

    return (
        <SafeAreaView style={tw`bg-white h-full w-full`}>
        <View style={tw`px-6`}>
          <Text style={tw`text-gray-800 text-2xl font-bold`}>PLUG-IN</Text>
  
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0,
                marginTop: 10,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={(data, details = null) => {
              dispatch(setOrigin(details.geometry.location));
              dispatch(setDestination(null));
              dispatch(setPlacesInfo(null));
            }}
            enableHighAccuracyLocation={true}
            minLength={2}
            enablePoweredByContainer={false}
            placeholder="Select your location"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            fetchDetails={true}
            predefinedPlaces={[homePlace]}
            textInputProps={{
              InputComp: Input,
              inputContainerStyle: {
                borderBottomColor: "transparent",
              },
              leftIcon: { type: "font-awesome", name: "location-arrow" },
              errorStyle: { color: "red" },
            }}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: "en",
            }}
          />
  
          <HomeNavigation/>
        </View>
      </SafeAreaView>
    )
}

export default HomeScreen
