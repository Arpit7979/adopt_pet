import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const InputField = ({label,value,placeholder,containerStyle,handleChangeText,keyboardType}) => {


  return (
    <View className='mt-4'>
      <Text className='font-outfitM'>{label}</Text>
      <View className={`w-full h-[50px] bg-white rounded-lg mt-1 p-2  border border-transparent focus:border-primary ${containerStyle} `}>
      <TextInput 
      value={value} 
      className='text-lg font-outfit' 
      onChangeText={handleChangeText}
      placeholder={placeholder}
      placeholderTextColor={"#7b7b8b"}
      keyboardType={keyboardType}
      />
      </View>
    </View>
  )
}

export default InputField