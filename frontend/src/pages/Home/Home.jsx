import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { GlassCard } from "../../common/GlassCard";
import Header from "./containers/Header/Header";
import DialogArea from "./containers/DialogArea/DialogArea";
import NavBar from "./containers/NavBar/NavBar";

const Home = () => {
  const classes = useStyles();
  const { userInfo } = useSelector(({ user }) => user);
  const { _id, firstName, lastName } = userInfo;

  return (
    <Container maxWidth="md">
      <Header />
      <Grid container className={classes.chatSection} spacing={1}>
        <Grid item xs={3}>
          <GlassCard height="100%" blur="20">
            <NavBar _id={_id} firstName={firstName} lastName={lastName}  />
          </GlassCard>
        </Grid>
        <Grid item xs={9}>
          <GlassCard blur="15">
              <DialogArea thisAccountId={_id} />
          </GlassCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

const useStyles = makeStyles({
  navBar: {
    height: "65vh",
    overflowY: "auto",
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    overflowY: "auto",
  },
  borderRight500: {
    borderRight: "1px solid #808080",
  },
});
