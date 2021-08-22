import React from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { setFindDialogs } from "../../../../../../redux/actions/dialogs";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  const handleInput = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      dispatch(setFindDialogs(null));
      return;
    }
    dispatch(setFindDialogs(e.target.value));
  };
  return (
    <Grid item xs={12} style={{ padding: "10px" }}>
      <TextField
        autoComplete="off"
        id="outlined-basic-email"
        label="Search"
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleInput}
      />
    </Grid>
  );
};

export default Search;
