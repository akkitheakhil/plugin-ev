import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectOrigin } from "../store/slices/PlugInSlice";
const chargerImg = require("../assets/images/charger.png");

const HomeNavigation = () => {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <TouchableOpacity
          style={tw`mt-4 w-40`}
          onPress={() => {
            navigation.push("MapScreen");
          }}
          disabled={!origin}
        >
          <View
            style={tw`${
              !origin && "opacity-20"
            }  p-4 w-40 flex flex-col justify-center items-center bg-gray-200 text-white h-56 rounded-xl `}
          >
            <Image
              style={[
                {
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                },
                tw`self-center`,
              ]}
              source={chargerImg}
            ></Image>
            <Text style={tw`mt-2 text-lg font-bold text-center`}>Find Station</Text>
            <Icon
              style={tw`mt-2 w-10 h-10 rounded-full bg-black p-2 self-start`}
              type="antdesign"
              color="white"
              name="arrowright"
            ></Icon>
          </View>
        </TouchableOpacity>
      );
}

export default HomeNavigation
