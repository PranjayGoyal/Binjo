import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {API_KEY} from "../App";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    justify-content: center;
    border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
    height: 362px;
    object-fit: cover;
`;

const InfoCol = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px;
    flex-direction: column;
`;

const MovieName = styled.span`
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin: 15px 0; 
    white-space: nowrap;
    text-tranform: capitalize;
    text-overflow: ellipsis;
    overflow: hidden; 
`;

const MovieInfo = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: black;
    overflow: hidden;
    margin: 4px 0;
    text-overflow: ellipsis;
    text-tranform: capitalize;
    & span{
        opacity: 0.5;
    }
`;

const Close = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: black;
    background: lightgray;
    height: fit-content;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    opacity: 0.8;
    margin: 20px 0 0 350px
`;

const MovieInfoComponent = (props)=>{
    const {selectedMovie} = props;
    // const ada = props.selectedMovie;
    const [movieInfo,setMovieInfo] = useState();
    // sideeffect => response to a change
    useEffect(()=>{
        axios
        .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
        .then((response)=>setMovieInfo(response.data))
    },[selectedMovie]);
    return(
        <Container>
            <CoverImage src={movieInfo?.Poster}/>
            <InfoCol>
                <MovieName>{movieInfo?.Type}: {movieInfo?.Title}</MovieName>
                <MovieInfo>IMDB Rating: <span>{movieInfo?.imdbRating}</span></MovieInfo>
                <MovieInfo>Year: <span>{movieInfo?.Year}</span></MovieInfo>
                <MovieInfo>Language: <span>{movieInfo?.Language}</span></MovieInfo>
                <MovieInfo>Rated: <span>{movieInfo?.Rated}</span></MovieInfo>
                <MovieInfo>Released: <span>{movieInfo?.Released}</span></MovieInfo>
                <MovieInfo>Runtime: <span>{movieInfo?.Runtime}</span></MovieInfo>
                <MovieInfo>Gnere: <span>{movieInfo?.Genre}</span></MovieInfo>
                <MovieInfo>Director: <span>{movieInfo?.Director}</span></MovieInfo>
                <MovieInfo>Actors: <span>{movieInfo?.Actors}</span></MovieInfo>
                <MovieInfo>Plot: <span>{movieInfo?.Plot}</span></MovieInfo>
            </InfoCol>
            <Close onClick={()=>props.onMovieSelect()} >X</Close>  
            {/* null pass kr sakte ho */}
        </Container>
       
    );
}

export default MovieInfoComponent;