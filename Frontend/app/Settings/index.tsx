import React from 'react'
import SettingsLayout from './SettingsLayout'
import { Main } from '../../components/Settings'
import Header from '../../components/Header'

const Settings = () => {
    return (
        <SettingsLayout>
            <Header title='Setttings' />
            <Main />
        </SettingsLayout>
    )
}

export default Settings