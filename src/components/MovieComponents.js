import style from 'styled-components'

const MovieContainer = style.div`
    display: flex;
    flex-direction: column;
    padding 10px;
    width: 280px;
    box-shadow: 0 3px 10px 0 #aaa;
    cursor: pointer;
`;

const CoverImage = style.img`
    height: 362px;
    object-fit: cover;
`;

const MovieName = style.div`
    font-size: 18px;
    font-weight: 600;
    color: black;
    margin: 15px 0; 
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; 
`;

const InfoCol = style.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

const MovieInfo = style.div`
    font-size: 16px;
    font-weight: 500;
    color: black;
    text-tranform: capitalize;
`;

const MovieComponent = (props)=>{
    const {Title, Year, imdbID , Type, Poster} = props.movie;
    return(
        <MovieContainer onClick={()=>props.onMovieSelect(imdbID)}>
            <CoverImage src={Poster}/>
           <MovieName>{Title}</MovieName> 
           <InfoCol>
            <MovieInfo>Year: {Year}</MovieInfo>
            <MovieInfo>Type: {Type}</MovieInfo>
           </InfoCol>
        </MovieContainer>);
}

export default MovieComponent;