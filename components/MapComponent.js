import React from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import {
    selectOrigin,
    selectPlacesInfo,
    selectDestination,
} from "../store/slices/PlugInSlice";

import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useNavigation } from "@react-navigation/native";

const MapComponent = () => {

    const origin = useSelector(selectOrigin);
    const placesDetails = useSelector(selectPlacesInfo);
    const destination = useSelector(selectDestination);
    const navigation = useNavigation();
    let mapView = null;

    return (
        <View style={tw`flex-1 relative`}>
            <TouchableOpacity
                style={[
                    tw`bg-white p-3 rounded-full shadow-lg`,
                    { top: 50, left: 20, position: "absolute", zIndex: 100 },
                ]}
                onPress={() => navigation.goBack()}
            >
                <Icon
                    type="antdesign"
                    name="home"
                    color="black"
                    size={16}
                />
            </TouchableOpacity>
            <MapView
                mapType="mutedStandard"
                style={tw`flex-1 h-full`}
                initialRegion={{
                    latitude: origin.lat,
                    longitude: origin.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.005,
                }}
                zoomControlEnabled={true}
                ref={c => mapView = c}

            >
                {!destination ? (
                    placesDetails?.map((place) => {
                        mapView?.fitToCoordinates("ChargingStations", { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } });
                        return (
                            <Marker
                                key={place.place_id}
                                description={place.vicinity}
                                title={place.name}
                                identifier="ChargingStations"
                                pinColor="#34935C"
                                coordinate={{
                                    latitude: place.geometry.location.lat,
                                    longitude: place.geometry.location.lng,
                                }}
                            />
                        )
                    })
                ) : (
                    <View>
                        <Marker
                            description={destination.vicinity}
                            title={destination.name}
                            identifier="ChargingStations"
                            pinColor="#34935C"
                            coordinate={{
                                latitude: destination.geometry.location.lat,
                                longitude: destination.geometry.location.lng,
                            }}
                        />

                        <Marker
                            description="Selected Location"
                            title="STARTING POINT"
                            identifier="YourLocation"
                            pinColor="#34935C"
                            coordinate={{
                                latitude: origin.lat,
                                longitude: origin.lng,
                            }}

                        />

                        <MapViewDirections
                            origin={{
                                latitude: origin.lat,
                                longitude: origin.lng,
                            }}
                            destination={{
                                latitude: destination.geometry.location.lat,
                                longitude: destination.geometry.location.lng,
                            }}
                            mode="DRIVING"
                            strokeWidth={4}
                            strokeColor="#34935C"
                            apikey={GOOGLE_MAPS_KEY}
                            onReady={result => {
                                mapView.fitToCoordinates(result.coordinates, { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } });
                            }}
                        />
                    </View>
                )}
            </MapView>
        </View>
    )
}

export default MapComponent
