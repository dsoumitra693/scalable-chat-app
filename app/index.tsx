import React from 'react'
import Home from './Home'
import Auth from './Auth'
import { useAuth } from '../providers/AuthProvider';


const Main = () => {
  const {currentUser} = useAuth();
  if (currentUser) return <Home />
  return <Auth />
}

export default Main