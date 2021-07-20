import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../redux/actions/user";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { Container } from "@material-ui/core";
import { GlassCard } from "../../common/GlassCard";
import Users from "./components/NavBar/Users";
import Profile from "./components/NavBar/Profile";
import Search from "./components/NavBar/Search";
import Header from "./components/Header/Header";
import DialogArea from "./components/DialogArea/DialogArea";
import TypeField from "./components/TypeField/TypeField";
import { fetchDialogsData } from "../../redux/actions/dialogs";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchDialogsData());
  }, []);
  const { userInfo } = useSelector(({ user }) => user);
  const { dialogsArray } = useSelector(({ dialogs }) => dialogs);
  const { _id, firstName, lastName } = userInfo;
  return (
    <Container maxWidth="md">
      <Header />
      <Grid container className={classes.chatSection} spacing={1}>
        <Grid item xs={3}>
          <GlassCard height="100%" blur="20">
            <Profile _id={_id} firstName={firstName} lastName={lastName} />
            <Divider />
            <Search />
            <Grid className={classes.navBar}>
              <Users dialogsArray = {dialogsArray} />
            </Grid>
          </GlassCard>
        </Grid>
        <Grid item xs={9}>
          <GlassCard blur="15">
            <Grid className={classes.dialogArea}>
              <DialogArea />
            </Grid>
            <Divider />
            <TypeField />
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
  dialogArea: {
    height: "75vh",
    overflowY: "auto",
  },
});
