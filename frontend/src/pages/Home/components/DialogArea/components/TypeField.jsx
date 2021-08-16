import React from "react";
import { Grid, TextField, Fab } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useFormik } from "formik";
import { fetchSendMessage } from "../../../../../redux/actions/messages";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const validationSchema = yup.object({
  textField: yup
    .string()
    .test("empty message", "Empty message", (message) => message.length !== 0),
});

const TypeField = ({ dialogId }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      textField: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        fetchSendMessage({ text: values.textField, dialogId: dialogId })
      );
      resetForm({});
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField
            autoComplete="off"
            name="textField"
            autoFocus
            id="textField"
            value={formik.values.textField}
            onChange={formik.handleChange}
            label="Type Something"
            fullWidth
          />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add" type="submit">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </form>
  );
};

export default TypeField;
