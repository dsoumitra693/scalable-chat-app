import React, { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'

interface SearchBarProps {
    placeholder: string
    searchCallback: (searchQuery: string) => any
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ placeholder, searchCallback }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const onChangeSearch = useCallback((query: string) => setSearchQuery(query), [])
    return (
        <Searchbar
            placeholder={placeholder}
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            onIconPress={searchCallback.bind(null, searchQuery)}
            onSubmitEditing={searchCallback.bind(null, searchQuery)}
        />
    )
})

const styles = StyleSheet.create({
    searchBar: {
        width: '95%',
        borderRadius: 20
    }
})

export default SearchBar