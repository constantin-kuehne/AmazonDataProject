import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  alpha,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import { SearchOptions } from "../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    options: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      padding: 0,
      margin: 0,
      marginLeft: 0,
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
  })
);

export default function SearchSelect({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<SearchOptions>>;
}) {
  const classes = useStyles();

  const handleChange = (event: SelectChangeEvent) => {
    setSearch(event.target.value as SearchOptions);
  };

  return (
    <div className={classes.options}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" color="primary">
            Option
          </InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={search}
            label="Search Option"
            onChange={handleChange}
            color="primary"
          >
            <MenuItem value={"ASIN"}>ASIN</MenuItem>
            <MenuItem value={"Product"}>Product</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
