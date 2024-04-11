import React, { useEffect, useState } from 'react'
import People from './People'
import { List, Text, useTheme } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { usePeoples } from '../../providers/PeopleProvider'
import { IPeople } from '../../Types'
import { View } from 'react-native'

const Peoples = () => {
    const { getPeoples} = usePeoples()
    const [peoplesData, setpeoplesData] = useState<IPeople[]>()
    useEffect(() => {
        (async ()=>{
            const _peoplesData: IPeople[] = await getPeoples()
            setpeoplesData(_peoplesData)
        })()
    },[])
    
    const { colors } = useTheme()
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background, top:30,}}>
            {peoplesData?.length > 0 ? (<List.Section >
                {peoplesData?.map((people, idx) => <People key={people.name + idx} {...people} />)}
            </List.Section>) : 
            (<View style={{alignItems:'center'}}>
                <Text>No Messages Yet!</Text>
            </View>)}
        </ScrollView>
    )
}

export default Peoples