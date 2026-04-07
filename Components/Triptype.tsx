import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Fontisto } from '@expo/vector-icons'

const Triptype = () => {
 const [tripType, settripType] = useState('single')

  return (
<View className='bg-white rounded-xl p-4 mt-4' >
       {/* HEADER */}
      <View className="flex-row gap-2 items-center mb-2">
        <Fontisto name="arrow-swap" size={24} color="#F78231" />
        <Text className="text-lg font-semibold text-gray-600">
          Trip Type
        </Text>
      </View>
        <Text className='text-md font-medium mt-3 mb-2'>Select Trip Type</Text>
        <View className='flex-row gap-4'>
          <View className='flex-1'>
            <TouchableOpacity className={ `rounded-lg px-3 py-2 items-center
              ${tripType === "single" ? "bg-orange-100" : "bg-gray-200"}
              ${tripType === "single" ? "border border-orange-300" : ""}`}
              onPress={()=>{
                settripType("single")
              }}>
              <Fontisto name="arrow-right-l" size={24} color={tripType === "single" ? "#F78231" : "gray"} />
                <Text className='text-gray-700'>One Way</Text>
            </TouchableOpacity>
          </View>
          <View className='flex-1'>
            <TouchableOpacity className={ `rounded-lg px-3 py-2 items-center
              ${tripType === "return" ? "bg-orange-100" : "bg-gray-200"}
              ${tripType === "return" ? "border border-orange-300" : ""}`}
              onPress={()=>{
                settripType("return")
              }}>
                <Fontisto name="arrow-h" size={24} color={tripType === "return" ? "#F78231" : "gray"} />
                <Text className='text-gray-700'>Round Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
</View>
  )
}

export default Triptype