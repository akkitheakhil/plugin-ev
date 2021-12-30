import React, { useEffect } from "react";
import { View, Text } from 'react-native'
import { selectOrigin, setPlacesInfo, } from "../store/slices/PlugInSlice";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapComponent from "../components/MapComponent";
import ChargeStationList from '../components/ChargeStationList';
import ChargeStationInfo from '../components/ChargeStationInfo';

const MapScreen = () => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const Stack = createNativeStackNavigator();
    let placesInfo: IPlaces[] = [];

    useEffect(() => {
        if (!origin) return;
        getTravelTime();
    }, [origin, GOOGLE_MAPS_KEY]);


    const getTravelTime = async () => {
        const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${origin.lat},${origin.lng}&radius=10000&keyword=ev%20charger&key=${GOOGLE_MAPS_KEY}`;
        const data = await fetch(URL).then((response) => response.json());
        if (data.status !== "OK") return alert(data.error_message);
        placesInfo = data.results || [];
        dispatch(setPlacesInfo(placesInfo));
    };

    return (
        <View style={tw`flex h-full`}>
            <View style={tw`h-1/2`}>
                <MapComponent />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="ChargeStationList"
                        component={ChargeStationList}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="ChargeStationInfo"
                        component={ChargeStationInfo}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen
