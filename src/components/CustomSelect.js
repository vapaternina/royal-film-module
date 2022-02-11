import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CustomSelect = ({ id, label, value, options, onChange }) => {
  return (
    <FormControl fullWidth style={{ marginBottom: "8px", marginTop: "8px" }}>
      <InputLabel id={`simple-select-label-${id}`}>{label}</InputLabel>
      <Select
        size='small'
        labelId={`simple-select-label-id-${id}`}
        id={`simple-select-id-${id}`}
        value={value}
        label={label}
        onChange={onChange}>
        {options.map((option, index) => (
          <MenuItem key={`class-opt-${index}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
