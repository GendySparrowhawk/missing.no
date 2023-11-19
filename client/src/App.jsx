import { useQuery, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useStore } from './store'


const AUTHENTICATE = gql`
  query {
    authenticate {
      _id
      email
      username
      wishlists {
        _id
        name
      }
    }
  }
`

function App() {
const {loading, error, data: userData } = useQuery(AUTHENTICATE)
const { setState } = useStore()

useEffect(() => {
  if(userData) {
    setState(oldState => ({
      ...oldState,
      user: userData.authenticate
    }))
  }
}, [userData])

  return (
    <>
    
    </>
  )
}

export default App
