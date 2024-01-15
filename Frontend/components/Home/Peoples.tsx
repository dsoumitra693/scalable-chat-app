import React from 'react'
import People from './People'
import usePeoples from '../../hooks/usePeoples'
import { List, useTheme } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'

const Peoples = () => {
    type peoplesDataType = {
        name: string;
        avatar: string;
        lastMsg: string;
        bgColor: string;
    }[]
    const peoplesData: peoplesDataType = usePeoples()

    const { colors } = useTheme()
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
            {peoplesData?.length > 0 ? (<List.Section >
                {peoplesData?.map((people, idx) => <People key={people.name + idx} {...people} />)}
            </List.Section>) : null}
        </ScrollView>
    )
}

export default Peoples