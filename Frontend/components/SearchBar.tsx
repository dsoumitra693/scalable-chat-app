import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper'

interface SearchBarProps {
    placeholder: string
    searchCallback: (searchQuery: string) => any
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, searchCallback }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const onChangeSearch = (query: string) => setSearchQuery(query)
    return (
        <Searchbar
            placeholder={placeholder}
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ width: '95%', borderRadius: 20 }}
            onIconPress={() => searchCallback(searchQuery)}
            onSubmitEditing={() => searchCallback(searchQuery)}
        />
    )
}

export default SearchBar