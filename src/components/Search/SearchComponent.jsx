import React, { useState } from 'react';
import styled from 'styled-components';

const SearchComponentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    .search-input-container {
        .search-text {
            width: 500px;
            height: 30px;
            outline: none;
            padding-left: 11px;
            font-size: 17px;
            font-weight: 600;
        }
        .select-type {
            height: 36px;
            border-left: none;
            outline: none;
            width: 154px;
            position: relative;    
            top: -1px;
        }
    }
    .search-button {
        margin-left: 60px;
        width: 150px;
        cursor: pointer;
        background: transparent;
        outline: none;
        border: 2px solid #CCC;
        border-radius: 6px;
    }
    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
		.search-input-container {
            display: flex;
            flex-direction: row;
            width: 90%;
            .search-text {
                width: 70%;
            }
            .select-type {
                width: 30%;
                top: 0px;
            }
        }
        .search-button {
            height: 29px;
            margin-top: 12px;
            margin-left: -12px;        
        }
	}
    }
    @media screen and (max-width: 700px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
		.search-input-container {
            display: flex;
            flex-direction: row;
            width: 90%;
            .search-text {
                width: 70%;
            }
            .select-type {
                width: 30%;
                top: 0px;
            }
        }
        .search-button {
            height: 29px;
            margin-top: 12px;
            margin-left: -12px;        
        }
	}
`;
const SearchComponent = ({ getData }) => {
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('');

    return (
        <SearchComponentContainer>
            <div className='search-input-container'>
                <input className='search-text' type='text' value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
                <select value={searchType} className='select-type' onChange={(e) => { setSearchType(e.target.value) }}>
                    <option value=''>All</option>
                    <option value='movie'>Movies</option>
                    <option value='series'>Series</option>
                    <option value='episode'>Episodes</option>
                </select>
            </div>
            <button className='search-button' onClick={() => { getData(searchText, searchType) }}>Search</button>
        </SearchComponentContainer>
    )
}

export default SearchComponent;