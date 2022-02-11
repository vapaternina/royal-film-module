import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

export default function CustomDatePicker({ date, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={props => (
          <TextField
            margin='dense'
            fullWidth
            size='small'
            {...props}
            error={new Date(date) < new Date()}
            helperText={
              new Date(date) < new Date()
                ? "La fecha y hora deben ser posteriores a las actuales."
                : ""
            }
          />
        )}
        label='DateTimePicker'
        value={date}
        onChange={newValue => onChange(newValue)}
      />
    </LocalizationProvider>
  );
}
