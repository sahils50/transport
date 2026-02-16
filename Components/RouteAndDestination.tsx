import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Feather, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'

const RouteAndDestination = () => {
   const [focused, setFocused] = useState(false);
  return (
    <View className="bg-white rounded-xl p-4 mt-4 shadow-md">
      <View className='flex-row gap-2'>
      <FontAwesome5 name="route" size={24} color="#F78231" />
      <Text className="text-lg font-semibold text-gray-600 mb-2">Route and Destination</Text>
      </View>
      <Text className='text-md font-medium mt-3 mb-2'>From</Text>

      <View
      onFocus={()=> setFocused(true)}
      onBlur={()=> setFocused(false)}
      className={`flex-row items-center rounded-lg px-4 py-3 bg-gray-100 border ${
        focused ? "border-orange-500" : "border-gray-300"
      }`}
    >
      <Feather
        name="map-pin"
        size={18}
        color="#F78231"
        style={{ marginRight: 8 }}
      />

      <TextInput
        placeholder="Enter source location"
        placeholderTextColor="#9CA3AF"
        className="flex-1 text-gray-700"
      />
    </View>

    <Text className='text-md font-medium mt-3 mb-2'>Source</Text>

      <View
      onFocus={()=> setFocused(true)}
      onBlur={()=> setFocused(false)}
      className={`flex-row items-center rounded-lg px-4 py-3 bg-gray-100 border ${
        focused ? "border-orange-500" : "border-gray-300"
      }`}
    >
      <FontAwesome6
        name="location-crosshairs"
        size={18}
        color="#F78231"
         style={{ marginRight: 8 }}
      />

      <TextInput
        placeholder="Enter destination location"
        placeholderTextColor="#9CA3AF"
        className="flex-1 text-gray-700"
      />
    </View>
    

      </View>
    
  )
}

export default RouteAndDestination