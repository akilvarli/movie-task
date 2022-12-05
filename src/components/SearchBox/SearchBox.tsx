import React, { Dispatch, FC, SetStateAction } from 'react'
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { CancelRounded } from '@mui/icons-material';
import './SearchBox.scss';

type SearchProps = {
    length:any,
    searchTerm: string,
    setSearchTerm: Dispatch<SetStateAction<string>>
}

const SearchBox: FC<SearchProps> = (props) => {

    const { searchTerm, setSearchTerm } = props;

    return (
        <TextField
            placeholder="Bulmak istediğiniz filmin adını yazınız"
            type="text"
            fullWidth
            className={searchTerm === "" ? " " : "searchInputOnTerm"}
            sx={{
                width: 760,
                height: 72,
                marginTop: "30px",
                background: "transparent",
                "& ::placeholder": {
                    color: "black !important",
                    opacity: "1 !important",
                },
                "& .MuiInputBase-root": {
                    border: "unset",
                    background: "transparent",
                    outline: "none",
                    paddingLeft: "30px",
                    "&:focus": {
                        outline: "none"
                    },
                    "&::placeholder": {
                        opacity: 1
                    }
                },

            }}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            value={searchTerm}
            InputProps={{
                startAdornment: !searchTerm && (
                    <InputAdornment position="end">
                        <IconButton style={{
                            position: "absolute",
                            right: "10px"
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#5983fe" width={44} viewBox="0 0 24 24">
                                <g data-name="Layer 2">
                                <path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search" />
                                </g></svg>
                        </IconButton>
                    </InputAdornment>
                ),

                endAdornment: searchTerm && (<IconButton onClick={() => setSearchTerm("")}><CancelRounded /></IconButton>)

            }}
        />
    )
}

export default SearchBox