import { useEffect } from "react";
import { OPTIONS } from "../utils/constants";
import { TextField, Button, Typography } from "@mui/material";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";

const AddMoviePanel = props => {
  const {
    handleDateChange,
    handleMovieCastChange,
    handleMovieClassificationChange,
    handleMovieDirectorChange,
    handleMovieLanguageChange,
    handleMovieNameChange,
    handleMovieSinopsisChange,
    handleMovieUrlChange,
    handleMovieDurationChange,
    handleAddMovie,
    handleEditMovie,
    setError,
    resetData,
    error,
    movieInfo,
    editMode,
  } = props;

  /**
   * Valida campos del formulario
   * @param {String} field
   * @returns {Boolean}
   */
  const validateField = field => {
    const nameError = movieInfo.name.length === 0;

    const durationError =
      Number.isNaN(movieInfo.duration) ||
      typeof movieInfo.duration !== "number" ||
      movieInfo.duration < 1;

    const urlError =
      movieInfo.trailerUrl.length === 0 ||
      !movieInfo.trailerUrl.match(
        /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/
      );

    const sinopsisError = movieInfo.sinopsis.length === 0;
    const directorError = movieInfo.director.length === 0;
    const castError = movieInfo.cast.length === 0;
    const dateError = new Date(movieInfo.premierDate) < new Date();
    if (field) {
      if (field === "name") {
        return nameError;
      } else if (field === "url") {
        return urlError;
      } else if (field === "sinopsis") {
        return sinopsisError;
      } else if (field === "director") {
        return directorError;
      } else if (field === "cast") {
        return castError;
      } else if (field === "duration") {
        return durationError;
      } else if (field === "date") {
        return dateError;
      }
    } else {
      console.log(
        nameError,
        urlError,
        sinopsisError,
        directorError,
        castError,
        durationError,
        dateError
      );
      setError(
        nameError ||
          durationError ||
          urlError ||
          sinopsisError ||
          directorError ||
          castError ||
          dateError
      );
    }
    return true;
  };

  useEffect(() => {
    validateField();
    console.log("movieInfo", movieInfo);
    console.log("editMode", editMode);
  }, [movieInfo, editMode]);

  return (
    <div style={{ width: "30%", margin: "8px", float: "left" }}>
      <Typography variant='h5' style={{ margin: "8px", textAlign: "center" }}>
        {editMode ? "Editar película" : "Agregar película"}
      </Typography>
      <TextField
        size='small'
        autoFocus
        margin='dense'
        id='name'
        label='Nombre de película'
        type='text'
        fullWidth
        variant='outlined'
        onChange={handleMovieNameChange}
        value={movieInfo.name}
        error={validateField("name")}
      />
      <CustomSelect
        id={"language"}
        label={"Idioma"}
        onChange={handleMovieLanguageChange}
        options={OPTIONS.LANGUAGES}
        value={movieInfo.language}
      />
      <CustomSelect
        id={"classification"}
        label={"Clasificación"}
        onChange={handleMovieClassificationChange}
        options={OPTIONS.CLASSIFICATIONS}
        value={movieInfo.classification}
      />
      <TextField
        size='small'
        margin='dense'
        id='name'
        label='Duración (min)'
        type='number'
        fullWidth
        variant='outlined'
        onChange={handleMovieDurationChange}
        value={movieInfo.duration}
        error={validateField("duration")}
        helperText={
          validateField("duration")
            ? "La duración debe ser un número mayor que 0."
            : ""
        }
      />
      <CustomDatePicker
        date={movieInfo.premierDate}
        onChange={handleDateChange}
      />
      <TextField
        size='small'
        margin='dense'
        id='name'
        label='Url trailer'
        type='url'
        fullWidth
        variant='outlined'
        onChange={handleMovieUrlChange}
        value={movieInfo.trailerUrl}
        error={validateField("url")}
        helperText={
          validateField("url")
            ? "No deje este campo vacío y utilice una dirección válida."
            : ""
        }
      />
      <TextField
        size='small'
        margin='dense'
        id='sinopsis'
        label='Sinopsis'
        type='text'
        fullWidth
        variant='outlined'
        minRows={5}
        multiline
        onChange={handleMovieSinopsisChange}
        value={movieInfo.sinopsis}
        error={validateField("sinopsis")}
        helperText={validateField("sinopsis") ? "No deje este campo vacío" : ""}
      />
      <TextField
        size='small'
        margin='dense'
        id='director'
        label='Director'
        type='text'
        fullWidth
        variant='outlined'
        onChange={handleMovieDirectorChange}
        value={movieInfo.director}
        error={validateField("director")}
        helperText={validateField("director") ? "No deje este campo vacío" : ""}
      />
      <TextField
        size='small'
        margin='dense'
        id='cast'
        label='Reparto'
        type='text'
        fullWidth
        variant='outlined'
        onChange={handleMovieCastChange}
        value={movieInfo.cast}
        error={validateField("cast")}
        helperText={validateField("cast") ? "No deje este campo vacío" : ""}
      />
      <div>
        <Button
          onClick={resetData}
          color='error'
          variant='outlined'
          style={{ marginRight: "8px" }}>
          Reset
        </Button>
        <Button
          variant='outlined'
          onClick={editMode ? handleEditMovie : handleAddMovie}
          disabled={error}
          color='success'>
          {editMode ? "Editar" : "Agregar"}
        </Button>
      </div>
    </div>
  );
};

export default AddMoviePanel;
