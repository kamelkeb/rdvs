import { useDispatch, useSelector} from 'react-redux'
import { doSignin } from '../features/currentUser/currentUserSlice'
import { Text, View } from 'react-native'
import { Input } from './Input'
import { GenericButton } from './GenericButton'
import React,{useState} from 'react'

export const LogginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const errorMessageSignIn = useSelector((state) => state.currentUser.errorSignIn)
  const dispatch = useDispatch()

  const loginHandler = () => {
    dispatch(doSignin(credentials))
  }

  return (
    <View>
      <Text>Email</Text>
      <Input
        value={credentials.email}
        changeHandler={(newValue) =>
          setCredentials((credentials) => {
            return { ...credentials, email: newValue }
          })
        }
      />
      <Text>Password</Text>
      <Input
        value={credentials.password}
        changeHandler={(newValue) =>
          setCredentials((credentials) => {
            return { ...credentials, password: newValue }
          })
        }
        secureTextEntry
      />
      <Text style={{ color: 'red' }}>{errorMessageSignIn}</Text>
      <GenericButton onPress={loginHandler} name="Sign in"/>
    </View>
  )
}