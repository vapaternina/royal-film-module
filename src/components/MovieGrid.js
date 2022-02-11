import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { OPTIONS } from "../utils/constants";

export default function MovieGrid({ movies, onClickEdit, onClickDelete }) {
  const columns = [
    { field: "name", headerName: "Nombre", width: 520 },
    {
      field: "classification",
      headerName: "Clasificación",
      width: 120,
      valueGetter: ({ value }) =>
        OPTIONS.CLASSIFICATIONS.find(opt => opt.value === value).label,
    },
    {
      field: "premierDate",
      headerName: "Estreno",
      type: "dateTime",
      width: 180,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Save'
            onClick={() => onClickEdit(id)}
            color='primary'
          />,
          <GridActionsCellItem
            icon={<CancelIcon color='error' />}
            label='Cancel'
            className='textPrimary'
            onClick={() => onClickDelete(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  const shownMoviesRows = movies.map(movie => ({
    id: movie.id,
    name: movie.name,
    classification: movie.classification,
    premierDate: movie.premierDate,
  }));

  return (
    <div style={{ height: 740, width: "100%", marginTop: "16px" }}>
      <DataGrid rows={shownMoviesRows} columns={columns} />
    </div>
  );
}
