import React, { useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_MAPS_KEY } from "@env";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { createOpenLink } from "react-native-open-maps";
import { useNavigation } from "@react-navigation/native";
import {
    selectOrigin,
    selectDestination,
    setTravelTimeInformation,
    selectTravelTimeInformation
} from "../store/slices/PlugInSlice";

const ChargeStationInfo = () => {
    const destination = useSelector(selectDestination);
    const origin = useSelector(selectOrigin);
    const travelInfo = useSelector(selectTravelTimeInformation);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        if (!origin || !destination) return;
        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_KEY]);


    const getTravelTime = async () => {
        const org = `${origin.lat},${origin.lng}`;
        const dest = `${destination.geometry.location.lat},${destination.geometry.location.lng}`;
        const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${org}&destinations=${dest}&key=${GOOGLE_MAPS_KEY}`;
        const data = await fetch(URL).then((response) => response.json());
        if (data.status !== "OK") return alert(data.error_message);
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
    };

    const mapOpen = createOpenLink({
        start: `${origin.lat},${origin.lng}`,
        end: `${destination.geometry.location.lat},${destination.geometry.location.lng}`,
        travelType: "drive",
    });

    return (
        <SafeAreaView>
            <View style={tw`items-center flex-row justify-center my-3`}>
                <TouchableOpacity
                    style={{ left: 10, position: "absolute", zIndex: 100 }}
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        type="antdesign"
                        name="arrowleft"
                        color="black"
                        size={23}
                        style={tw`p-3`}
                    />
                </TouchableOpacity>
                <Text style={tw`text-center text-xl font-bold`}>LOCATION INFO</Text>
            </View>

            <View
                style={tw`p-4 flex flex-row justify-between  text-white m-2 bg-gray-200 rounded-lg`}
            >
                <View style={tw`flex flex-col `}>
                    <Text style={tw`text-black text-lg font-bold`}>
                        {destination?.name}
                    </Text>
                    <Text style={tw`text-black w-60`}>{destination.vicinity}</Text>

                    <Text style={tw`text-black text-lg`}>
                        DISTANCE: {travelInfo?.distance?.text}
                    </Text>
                    <Text style={tw`text-black text-lg`}>
                        TIME: {travelInfo?.duration?.text}
                    </Text>
                </View>
                <View style={tw`flex flex-row justify-between mt-2`}>
                    <Text style={tw`text-black text-lg`}>{destination?.rating} </Text>

                    <Icon
                        style={tw``}
                        type="antdesign"
                        color="#FF9529"
                        name="star"
                    ></Icon>
                </View>
            </View>

            <TouchableOpacity
                style={tw`p-4 flex flex-row justify-center text-white m-2 bg-gray-900 rounded-lg mt-10`}
                onPress={mapOpen}
            >
                <View style={tw`flex justify-center items-center`}>
                    <Text style={tw`text-white text-lg font-bold text-center`}>
                        Open in Maps
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ChargeStationInfo
