import styled from 'styled-components'
import MovieComponent from './components/MovieComponents'
import MovieInfoComponent from './components/MovieInfoComponent'
import {react,useState} from 'react';
import axios from 'axios';

export const API_KEY = "e1b1dacd";

const Container = styled.div`
    display = flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    background-color: black;
    align-items: center;
    color: white;
    padding: 10px;
    font-size: 25px;
    font-weight: bold;
    justify-content: space-between;
    box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const MovieImage = styled.img`
    width: 48px;
    height: 48px;
    margin: 15px;
`;

const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    width: 50%;
    background-color: white;
    padding: 10px 10px;
    border-radius: 6px;
    align-items: center;
`;

const SearchIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const SearchInput = styled.input`
    color: black;
    font-size: 16px;
    font-weight: bold;
    margin-left: 15px;
    border: none;
    outline: none;
    width: 50%;
`;

const MovieListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 30px;
    gap: 24px;
    justify-content: space-evenly;
`;

function App() {

  const [searchQuery,updateSearchQuery] = useState('');
  const [timeoutId, updateTimeOutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString)=>{
     const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
     console.log(response)
     updateMovieList(response.data.Search);
  }

  const onTextChange = (event) => {
      clearTimeout(timeoutId);  
      updateSearchQuery(event.target.value);
      // throttling , deduping => DO NOT CALL API TOO FREQUETLY
      const timeout = setTimeout(()=>{ fetchData(event.target.value)},500);
     updateTimeOutId(timeout);
  };

  return (
    <Container>
    <Header>
      <AppName> 
        <MovieImage src="/movie_adobe_express.svg" alt="m" />
        Binjo
      </AppName>
      <SearchBar>
        <SearchIcon src="/search-interface-symbol.svg" alt="s"/>
        <SearchInput placeholder='Search Movie' value={searchQuery} onChange={onTextChange} />
      </SearchBar>
    </Header>
    {selectedMovie && <MovieInfoComponent 
          selectedMovie = {selectedMovie} 
          onMovieSelect = {onMovieSelect}
    />}
    <MovieListContainer>
       {movieList?.length? movieList.map((movie,index)=><MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>): "No Movie Search"}
    </MovieListContainer>
    </Container>
  );
}

export default App;

/***
 * 
 * {}
 * 
 * 
 * [{1},2,3,4,5,6]
 * arr.map((element ) => {\
 *  console.log(element)
 * })
 * 
 * 
 */