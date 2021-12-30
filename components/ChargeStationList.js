import React from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import {
    selectPlacesInfo,
    setDestination,
} from "../store/slices/PlugInSlice";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ChargeStationList = () => {
    const dispatch = useDispatch();
    const placesDetails = useSelector(selectPlacesInfo);
    const navigation = useNavigation();

    useFocusEffect(() => {
        dispatch(setDestination(null));
    });

    return (
        <SafeAreaView style={tw`mb-20`}>
            <Text style={tw`text-center text-lg my-4 text-gray-800 font-bold`}>
                List of all Charging stations near you
            </Text>
            {placesDetails?.length > 0 && (
                <FlatList
                    data={placesDetails}
                    keyExtractor={(place) => place.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={tw`p-4 flex flex-row justify-between  text-white m-2 bg-gray-200 rounded-lg`}
                            onPress={() => {
                                dispatch(setDestination(item));
                                navigation.push("ChargeStationInfo");
                            }}
                        >
                            <View style={tw`flex flex-col `}>
                                <Text style={tw`text-black text-lg font-bold`}>
                                    {item?.name}
                                </Text>
                                <Text style={tw`text-black w-60`}>{item.vicinity}</Text>
                            </View>
                            <View style={tw`flex flex-row justify-between mt-2`}>
                                <Text style={tw`text-black text-lg`}>{item?.rating} </Text>

                                <Icon
                                    style={tw``}
                                    type="antdesign"
                                    color="#FF9529"
                                    name="star"
                                ></Icon>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </SafeAreaView>
    )
}

export default ChargeStationList
