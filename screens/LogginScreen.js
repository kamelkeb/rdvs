import { Text, SafeAreaView } from 'react-native'
import { LogginForm } from '../components/LogginForm'
import React from 'react'

const LogginScreen = () => {

    return (
      <SafeAreaView>
        <Text>Vous n'êtes pas loggé!</Text>
        <LogginForm/>
      </SafeAreaView>
    )
};

export default LogginScreen