import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import DebouncedTextField, { DebouncedTextfieldProps } from './DebouncedTextfield'

const SearchBar = (props: DebouncedTextfieldProps) => {
    return (
        <DebouncedTextField {...props} debounceMs={1000} InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            )
        }} />
    )
}

export default SearchBar