import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

const MovieDetailsContainer = styled.div`
    background: #222323;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .movie-detail-container {
        display: flex;
        flex-direction: row;
        .movie-detail-image {
            width: 300px;
            height: 428px;
        }
        .details-container {
            display: flex;
            flex-direction: column;
            align-items: baseline;
            .people-details {
                display: flex;
                flex-direction: column;
                align-items: baseline;
                left: 7px;
                margin-left: 9px;
                margin-top: 14px;            
            }
            h1 {
                font-weight: 300;
                text-transform: capitalize;
                color: #FFF;
                font-size: 2rem;
                font-family: Roboto,sans-serif;
                margin-bottom: 0;
                left: 8px;
                position: relative;
            }
            .time-details {
                font-weight: 400;
                color: #9e9e9e;
                font-size: 1rem;
                padding: 0 8px;
                line-height: 1.5rem;
            }
            .details-row, .about {
                display: flex;
                flex-direction: row;
                align-items: baseline;
                justify-content: center;
                .row-header, .row-value {
                    font-size: 17px;
                    font-weight: 700;
                    font-family: Roboto,sans-serif;
                }
                .row-header {
                    margin-right: 3px;
                    color: #9e9e9e;
                }
                .row-value {
                    color: #d8272c;
                }
            }
            .about {
                display: flex;
                flex-direction: column;
                margin-left: 9px;
                margin-top: 7px;
                .plot-details {
                    line-height: 1.5rem;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #FFF;
                }
            }
        }
    }
    @media screen and (max-width: 1024px) {
        padding: 13px;
        height: 94vh;
        .movie-detail-container { 
            display: flex;
            flex-direction: column;
            .movie-detail-image {
                width: 200px;
                height: 280px;
            }
        }
    }
    @media screen and (max-width: 700px) {
        padding: 13px;
        height: 94vh;
        .movie-detail-container { 
            display: flex;
            flex-direction: column;
            .movie-detail-image {
                width: 200px;
                height: 280px;
            }
        }
	}
`;
const MovieDetails = ({ movieData }) => {
    const { id = '' } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=6001b816`)
            .then(data => data.json())
            .then(data => {
                setMovieDetails(data);
                setLoading(false);
            })
    }, []);
    const { Poster = '', Title = '', Actors, Year, Runtime, Genre, Director, Plot, Language = '', imdbRating } = movieDetails || {};
    return (
        <MovieDetailsContainer>
            {loading ? <p>Loading Please wait...</p> :
                <div className='movie-detail-container'>
                    <img src={Poster} alt={Title} className='movie-detail-image' />
                    <div className='details-container'>
                        {Title && <h1>{`${Title} - ${Language}`}</h1>}
                        {Runtime && <div className='time-details'>
                            <div>{`${Runtime}.${Year}`}</div>
                        </div>}
                        <div className='people-details'>
                            {Director && <div className='details-row'>
                                <div className='row-header'>Director: </div><div className='row-value'>{Director}</div>
                            </div>}
                            {Genre && <div className='details-row'>
                                <div className='row-header'>Genre: </div><div className='row-value'>{Genre}</div>
                            </div>}
                            {Actors && <div className='details-row'>
                                <div className='row-header'>Actors: </div><div className='row-value'>{Actors}</div>
                            </div>}
                        </div>
                        {Plot && <div className='about'>
                            <div className='row-header'>About</div>
                            <div className='plot-details'>{Plot}</div>
                        </div>}
                        <div className='people-details'>
                            {imdbRating && <div className='details-row'>
                                <div className='row-header'>Rating: </div><div className='row-value'>{imdbRating}</div>
                            </div>}
                        </div>
                    </div>
                </div>}
        </MovieDetailsContainer>
    )
}

export default MovieDetails;

{/* <div className='details-row'>
                        <div className='row-header'>Title: </div><div className='row-value'>{Title}</div>
                    </div>
                    <div className='details-row'>
                        <div className='row-header'>Actors: </div><div className='row-value'>{Actors}</div>
                    </div>
                    <div className='details-row'>
                        <div className='row-header'>Year: xs</div><div className='row-value'>{Year}</div>
                    </div> */}