import React from 'react'
import SettingsLayout from './SettingsLayout'
import { Header, Main } from '../../components/Settings'

const Settings = () => {
    return (
        <SettingsLayout>
            <Header title='Setttings'/>
            <Main />
        </SettingsLayout>
    )
}

export default Settings