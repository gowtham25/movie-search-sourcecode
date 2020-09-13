import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const MovieListContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    padding-bottom: 10px;
    @media screen and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;

const NoResultContainer = styled.div`
    p {
        text-align: center;
        font-size: 17px;
        font-weight: 700;
        font-family: sans-serif;
    }
`;
const MovieList = ({ movieData, loading, handleFavourite, favourite }) => {
    const { Response = true, Search = [], totalResults } = movieData || {}
    return (
        <>
            <MovieListContainer>
                {!favourite && !loading && Response && Search && Search.length > 0 && Search.map((sVal) => {
                    const { imdbID = '' } = sVal || {};
                    return <Card data={sVal} key={imdbID} handleFavourite={handleFavourite} />
                })}
                {favourite && !loading && Response && Search && Search.length > 0 && Search.filter((fVal) => fVal.isFavourite).map((sVal) => {
                    const { imdbID = '' } = sVal || {};
                    return <Card data={sVal} key={imdbID} handleFavourite={handleFavourite} />
                })}
            </MovieListContainer>
            <NoResultContainer>
                {(!loading && (!Response || !Search.length)) && <p>No Results Found...</p>}
                {loading && <p>Loading Please Wait...</p>}
            </NoResultContainer>
        </>
    )
}

export default MovieList;