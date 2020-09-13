import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .movie-title {
        font-size: 20px;
        color: #999;
        font-weight: 400;
        padding: 10px 0 0;
        width: 100%;
        transition: all .1s linear;
        display: flex;
        justify-content: center;
        padding: 0px
    }
    .poster {
        width: 200px;
        height: 280px;
    }
    .details-container {
        display: flex;
        flex-direction: column;
        .details-row {
            display: flex;
            flex-direction: row;
            align-items: baseline;
            justify-content: center;
            .row-header, .row-value {
                font-size: 17px;
                font-weight: 700;
                font-family: monospace;
            }
        }
        button {
            padding: 6px 15px;
            color: #FFF;
            border-radius: 10px;
            outline: none;
            border: none;
            cursor: pointer;
            font-size: 13px;
            font-weight: bold;
            &.not-favourite {
                background: green;
            }
            &.favourite {
                background: red; 
            }
        }
        .view-more-details {
            font-size: 13px;
            text-align: center;
            font-weight: 700;
            cursor: pointer;
            color: #8282cb;
        }
    }
`;
const Card = ({ data, handleFavourite, ...props }) => {
    const { Poster, Title, Type, Year, imdbID, isFavourite = true } = data || {}
    return (
        <CardContainer key={imdbID}>
            <h1 className='movie-title'>{Title}</h1>
            <img src={Poster} alt={Title} className='poster' />
            <div className='details-container'>
                <div className='details-row'>
                    <div className='row-header'>Type :</div><div className='row-value'>{Type}</div>
                </div>
                <div className='details-row'>
                    <div className='row-header'>Release Date :</div><div className='row-value'>{Year}</div>
                </div>
                <button onClick={() => { handleFavourite(imdbID, !isFavourite) }} className={isFavourite ? 'favourite' : 'not-favourite'}>{isFavourite ? 'Remove Favourite' : 'Set As Favourite'}</button>
                <span onClick={() => { props.history.push(`/movie/${imdbID}`) }} className='view-more-details'>View Movie Details</span>
            </div>
        </CardContainer>
    )
}

export default withRouter(Card);