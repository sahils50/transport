import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import ActionButton from '@/components/actionbutton'
import ActionButton from "@/components/ActionButton";

import { router } from 'expo-router'

const Forgotpass = () => {
  return (
    <SafeAreaView className='flex-1 bg-white px-8'>
       <Text className='text-xl font-semibold text-gray-700 mt-10 mb-3'>Forgot Password</Text>
       <Text className='text-sm text-gray-700 mb-5'>Reset your password in 3 easy step</Text>
       <Text className="font-medium mb-2">Register Email Address</Text>
                 <TextInput
                 placeholder="Enter your register email"
                 keyboardType="email-address"
                 autoCapitalize="none"
                 className="border border-gray-300 rounded-lg px-4 py-3 mb-4"/>
                 <ActionButton label='Send Verification OTP'
                 onPress={()=>router.push("../(public)/Otp")}/>
    </SafeAreaView>
  )
}

export default Forgotpass