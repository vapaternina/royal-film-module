import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import Layout from "./components/Layout";
import MovieGrid from "./components/MovieGrid";
import ConfirmationDialog from "./components/ConfirmationDialog";
import CustomSnackbar from "./components/CustomSnackbar";

import {
  getMoviesRequest,
  createNewMovieRequest,
  deleteMovieRequest,
  updateMovieRequest,
} from "./api/movies";

import { OPTIONS, SEVERITIES } from "./utils/constants";

import AddMoviePanel from "./components/AddMoviePanel";

const moviesMock = [
  {
    id: 0,
    name: "Spiderman Homecoming",
    classification: 0,
    duration: 120,
    trailerUrl: "https://www.youtube.com/watch?v=grusgXCahH8",
    sinopsis: "Spiderman Homecoming",
    director: "Jon Watts",
    cast: "Tom Holland, Michael Keaton, Robert Downey Jr.",
    premierDate: new Date().getTime(),
    language: "ingles",
  },
  {
    id: 1,
    name: "Avengers: Infinity War",
    classification: 1,
    duration: 180,
    trailerUrl: "https://www.youtube.com/watch?v=823iAZOEKt8",
    sinopsis: "Avengers: Infinity War",
    director: "Anthony Russo, Joe Russo",
    cast: "Robert Downey Jr., Chris Hemsworth, Mark Ruffalo",
    premierDate: new Date().getTime(),
    language: "ingles",
  },
  {
    id: 2,
    name: "Avengers: Endgame",
    classification: 2,
    duration: 180,
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    sinopsis: "Avengers: Endgame",
    director: "Anthony Russo, Joe Russo",
    cast: "Robert Downey Jr., Chris Hemsworth, Mark Ruffalo",
    premierDate: new Date().getTime(),
    language: "ingles",
  },
  {
    id: 3,
    name: "Uncharted",
    classification: 3,
    duration: 120,
    trailerUrl: "https://www.youtube.com/watch?v=dW1BIlSZJIY",
    sinopsis: "Uncharted",
    director: "Neil Druckman",
    cast: "Tom Cruise, Emily Watson, Jeremy Renner",
    premierDate: new Date().getTime(),
    language: "ingles",
  },
];

const initialMovieInfo = {
  name: "",
  classification: OPTIONS.CLASSIFICATIONS[0].value,
  duration: 0,
  trailerUrl: "",
  sinopsis: "",
  director: "",
  cast: "",
  premierDate: new Date().setSeconds(0),
  language: OPTIONS.LANGUAGES[0].value,
};

function App() {
  /** Datos de peliculas */
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSeletedMovie] = useState(initialMovieInfo);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movieInfo, setMovieInfo] = useState(initialMovieInfo);
  const [error, setError] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "Mensaje",
    severity: SEVERITIES.INFO,
  });

  const handleCloseSnackbar = () => {
    setSnackbarInfo({ ...snackbarInfo, open: false });
  };

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleGetMoviesFromDB = () => {
    setLoading(true);
    getMoviesRequest()
      .then(response => {
        const movieData = response.data;
        const ids = Object.keys(movieData);
        const movies = Object.values(movieData);
        for (let i = 0; i < ids.length; i++) {
          movies[i].id = ids[i];
        }

        setMovies(movies);
        console.log("movies: ", movies);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(handleGetMoviesFromDB, []);

  useEffect(() => {
    console.log("movies: ", movies);
    console.log("selectedMovie: ", movieInfo);
  }, [movies, selectedMovie]);

  const handleAddMovie = () => {
    const newMovie = {
      name: movieInfo.name,
      classification: movieInfo.classification,
      duration: movieInfo.duration,
      language: movieInfo.language,
      trailerUrl: movieInfo.trailerUrl,
      sinopsis: movieInfo.sinopsis,
      director: movieInfo.director,
      cast: movieInfo.cast,
      premierDate: movieInfo.premierDate.getTime(),
    };
    setLoading(true);
    createNewMovieRequest(newMovie)
      .then(response => {
        console.log("response: ", response.name);
        resetData();
        setLoading(false);
        setSnackbarInfo({
          open: true,
          message: "Pelicula agregada correctamente",
          severity: SEVERITIES.SUCCESS,
        });
      })
      .catch(error => {
        console.log(error);
        alert("Error al crear pelicula.");

        setLoading(false);
        setSnackbarInfo({
          open: true,
          message: "Error al crear pelicula",
          severity: SEVERITIES.ERROR,
        });
      });

    //TODO: conseguir id de firebase
    //TODO: guardar en bd
    setMovies([...movies, { ...newMovie, id: movies.length + 1 }]);
  };

  const handleEditMovie = () => {
    console.log(movieInfo.premierDate);
    const newMovie = {
      name: movieInfo.name,
      classification: movieInfo.classification,
      duration: movieInfo.duration,
      language: movieInfo.language,
      trailerUrl: movieInfo.trailerUrl,
      sinopsis: movieInfo.sinopsis,
      director: movieInfo.director,
      cast: movieInfo.cast,
      premierDate: movieInfo.premierDate,
    };
    setLoading(true);
    updateMovieRequest(movieInfo.id, newMovie)
      .then(() => {
        setLoading(false);
        setSnackbarInfo({
          open: true,
          message: "Pelicula editada correctamente",
          severity: SEVERITIES.SUCCESS,
        });
        handleGetMoviesFromDB();
      })
      .catch(error => {
        console.log(error);
        alert("Error al editar pelicula.");
        setSnackbarInfo({
          open: true,
          message: "Error al editar pelicula",
          severity: SEVERITIES.ERROR,
        });
        setLoading(false);
      });
  };

  /**
   * TODO: tipo del id?
   * @param {*} id
   */
  const handleClickEdit = id => {
    const currentMovieInfo = movies.find(movie => movie.id === id);
    const currentMovie = {
      ...currentMovieInfo,
      premierDate: new Date(currentMovieInfo.premierDate),
    };
    setSeletedMovie(currentMovie);
    setMovieInfo(currentMovie);
    setEditMode(true);
  };

  const handleClickDelete = movieId => {
    setOpenDeleteDialog(true);
    const currentMovieInfo = movies.find(movie => movie.id === movieId);
    const currentMovie = {
      ...currentMovieInfo,
      premierDate: new Date(currentMovieInfo.premierDate),
    };
    setSeletedMovie(currentMovie);
    setMovieInfo(currentMovie);
  };

  const handleDeleteMovie = () => {
    setLoading(true);
    deleteMovieRequest(movieInfo.id)
      .then(() => {
        setOpenDeleteDialog(false);
        handleGetMoviesFromDB();
        setSnackbarInfo({
          open: true,
          message: "Pelicula eliminada correctamente",
          severity: SEVERITIES.SUCCESS,
        });
        resetData();
      })
      .catch(error => {
        console.log(error);
        setOpenDeleteDialog(false);
        alert("Error al eliminar película.");
        setLoading(false);
        setSnackbarInfo({
          open: true,
          message: "Error al eliminar película",
          severity: SEVERITIES.ERROR,
        });
      });
  };

  const handleNewMovie = () => {
    setEditMode(false);
    setMovieInfo(initialMovieInfo);
  };

  const handleMovieNameChange = event =>
    setMovieInfo({ ...movieInfo, name: event.target.value });

  const handleDateChange = customDate =>
    setMovieInfo({ ...movieInfo, premierDate: customDate });

  const handleMovieLanguageChange = event =>
    setMovieInfo({ ...movieInfo, language: event.target.value });
  const handleMovieClassificationChange = event =>
    setMovieInfo({ ...movieInfo, classification: event.target.value });

  const handleMovieDurationChange = event =>
    setMovieInfo({ ...movieInfo, duration: parseInt(event.target.value) });

  const handleMovieUrlChange = event =>
    setMovieInfo({ ...movieInfo, trailerUrl: event.target.value });

  const handleMovieSinopsisChange = event =>
    setMovieInfo({ ...movieInfo, sinopsis: event.target.value });

  const handleMovieDirectorChange = event =>
    setMovieInfo({ ...movieInfo, director: event.target.value });

  const handleMovieCastChange = event =>
    setMovieInfo({ ...movieInfo, cast: event.target.value });

  const resetData = () => setMovieInfo(initialMovieInfo);

  const addPanelProps = {
    handleMovieNameChange: handleMovieNameChange,
    handleDateChange: handleDateChange,
    handleMovieLanguageChange: handleMovieLanguageChange,
    handleMovieClassificationChange: handleMovieClassificationChange,
    handleMovieDurationChange: handleMovieDurationChange,
    handleMovieUrlChange: handleMovieUrlChange,
    handleMovieSinopsisChange: handleMovieSinopsisChange,
    handleMovieDirectorChange: handleMovieDirectorChange,
    handleMovieCastChange: handleMovieCastChange,
    handleAddMovie: handleAddMovie,
    handleEditMovie: handleEditMovie,
    resetData: resetData,
    error: error,
    setError: setError,
    movieInfo: movieInfo,
  };

  return (
    <Layout>
      {loading ? (
        <div
          style={{
            marginTop: "25%",
          }}>
          <LinearProgress />
        </div>
      ) : (
        <>
          <Button
            style={{ width: "50%" }}
            variant='contained'
            size='small'
            onClick={handleNewMovie}
            color='success'>
            Nueva
          </Button>
          <Button
            style={{ width: "50%" }}
            variant='contained'
            size='small'
            color='info'
            onClick={handleGetMoviesFromDB}>
            Actualizar
          </Button>
          <AddMoviePanel editMode={editMode} {...addPanelProps} />
          <MovieGrid
            movies={movies}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
          />
          <ConfirmationDialog
            open={openDeleteDialog}
            handleClose={handleCloseDeleteDialog}
            handleClickOpen={handleClickOpenDeleteDialog}
            deleteConfirmation={handleDeleteMovie}
          />
          <CustomSnackbar
            severity={snackbarInfo.severity}
            message={snackbarInfo.message}
            handleClose={handleCloseSnackbar}
            open={snackbarInfo.open}
          />
        </>
      )}
    </Layout>
  );
}

export default App;
