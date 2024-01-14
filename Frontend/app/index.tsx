import React from 'react'
import Home from './Home'
import Auth from './Auth'
import { useAuth } from '../providers/AuthProvider';
import LoadingScreen from '../components/LoadingScreen';


const Main = () => {
  const { currentUser } = useAuth();
  if (currentUser === null) return <LoadingScreen />
  if (currentUser === undefined) return <Auth />
  return <Home/>
}

export default Main