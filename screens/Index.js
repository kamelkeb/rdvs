import { useSelector } from 'react-redux'
import React from 'react'
import UserHome from './UserHome'
import LogginScreen from './LogginScreen'

const Index = () => {

  const isLoggedin = useSelector((state) => state.currentUser.isLoggedin)

  return (isLoggedin ? (
        <UserHome/>
      ) : (
        <LogginScreen/>
      )
    )
}

export default Index