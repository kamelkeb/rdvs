import { Text, SafeAreaView, StyleSheet } from 'react-native'
import { GenericButton } from '../components/GenericButton'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doSignout } from '../features/currentUser/currentUserSlice'

const UserHome = () => {
  const email = useSelector((state) => state.currentUser.userProfile.email)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(doSignout())
  }
    return (
      <SafeAreaView  style={styles.container}>
        <Text>Bonjour cher {email}</Text>
        <GenericButton onPress={logoutHandler} name="Sign Out"/>

      </SafeAreaView>
    )
};

export default UserHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
