import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import './App.css';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieList from './components/MovieList/MovieList';
import SearchComponent from './components/Search/SearchComponent';

const AppComponentContainer = styled.div`
	header {
		position: sticky;
		top: 0;
		background: #FFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		height: 35px;
		border: 1px solid #000;
		a {
			color: #000;
			text-decoration: none;
			.home{
				font-size: 16px;
				font-weight: 700;
				cursor: pointer;
			}
		}
	}
	.App {
		margin-top: 50px;
	}
`;
function App() {
	const [movieData, setMovieData] = useState([]);
	const [loading, setLoading] = useState(false);

	const getData = (searchText, type) => {
		setLoading(true);
		fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=6001b816&y=${searchText}&type=${type}`)
			.then(data => data.json())
			.then(data => {
				const { Search = [] } = data || {};
				const makeFavourite = Search && Search.length > 0 && Search.map((dVal) => {
					return { ...dVal, isFavourite: true }
				});
				setMovieData({ ...data, Search: makeFavourite || [] });
				setLoading(false);
			})
	}

	const handleFavourite = (id, value) => {
		const { Search = [] } = movieData || {};
		const makeFavourite = Search && Search.length > 0 && Search.map((dVal) => {
			if (dVal.imdbID === id) {
				return { ...dVal, isFavourite: value };
			}
			return dVal;
		});
		setMovieData({ ...movieData, Search: makeFavourite });
	}
	return (
		<AppComponentContainer>

			<Router>
				<header>
					<Link to="/">
						<div className='home'>Home</div>
					</Link>
					<Link to="/favourites">
						<div className='home'>Favourites</div>
					</Link>
				</header>
				<Switch>
					<Route path="/" exact children={
						<>
							<div className="App">
								<SearchComponent getData={getData} />
							</div>
							<MovieList movieData={movieData} loading={loading} handleFavourite={handleFavourite} />
						</>
					} />
					<Route path="/favourites" exact children={<MovieList favourite={true} movieData={movieData} loading={loading} handleFavourite={handleFavourite} />} />
					<Route path="/movie/:id" exact children={<MovieDetails movieData={movieData.Search} />} />
				</Switch>
			</Router>
		</AppComponentContainer>
	);
}

export default App;
