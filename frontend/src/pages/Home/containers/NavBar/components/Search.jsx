import React from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { fetchFindUsers } from "../../../../../redux/actions/user";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const timeoutRef = React.useRef(null);

  function submit(value) {
    dispatch(fetchFindUsers(value));
    console.log(value);
  }

  React.useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      return value !== "" ? submit(value) : null;
    }, 1500);
  }, [value]);

  return (
    <Grid item xs={12} style={{ padding: "10px" }}>
      <TextField
        id="outlined-basic-email"
        label="Search"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Grid>
  );
};

export default Search;
