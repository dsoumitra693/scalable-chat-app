import React from 'react'
import People from './People'
import usePeople from '../../hooks/usePeople'
import { List } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'

const Peoples = () => {
    const peopleData = usePeople()
    return (
        <ScrollView style={{ flex: 1,backgroundColor:'transparent' }}>
            <List.Section >
                {peopleData.map((people,idx) =><People key={people.name+idx} {...people}/>)}
            </List.Section>
        </ScrollView>
    )
}

export default Peoples