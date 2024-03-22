import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const SecondaryContainer = () => {
  const movies= useSelector((store)=> store.movies);


  return (
    movies.nowPlayingMovies &&(
    <div className="bg-black">
      <div className="-mt-80 pl-12 relative z-20 bg-opacity-50 ">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated "} movies={movies.TopRatedMovies}/>
          <MovieList title={"Popular "} movies={movies.popularMovies}/>
          <MovieList title={"Upcoming Movies"} movies={movies.UpcomingMovies}/>
       </div>
    </div>)
  )
}

export default SecondaryContainer
