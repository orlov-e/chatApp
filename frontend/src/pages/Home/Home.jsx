import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { GlassCard } from '../../common/GlassCard';
import Header from './components/Header/Header';
import DialogArea from './components/DialogArea/DialogArea';
import NavBar from './components/NavBar/NavBar';

const Home = () => {
	const classes = useStyles();
	const { userInfo, foundUsers } = useSelector(({ user }) => user);
	const { id, firstName, lastName, avatar } = userInfo;
	const { messagesArray } = useSelector(({ messages }) => messages);
	const { selectedDialog } = useSelector(({ dialogs }) => dialogs);

	return (
		<Container className={classes.customContainer}>
        <Header />
        <Grid container className={classes.chatSection} spacing={1}>
            <Grid item xs={3}>
                <GlassCard height="100%" blur="20">
                    <NavBar id={id} firstName={firstName} lastName={lastName} avatar={avatar} foundUsers={foundUsers} />
                </GlassCard>
            </Grid>
            <Grid item xs={9}>
                <GlassCard blur="15">
                    <DialogArea thisAccountId={id} messagesArray={messagesArray} selectedDialog={selectedDialog} />
                </GlassCard>
            </Grid>
        </Grid>
    </Container>
	);
};

export default Home;

const useStyles = makeStyles({
    chatSection: {
        overflowY: 'auto',
    },
    customContainer: {
        width: '60%', 
        maxWidth: 'none', 
    },
});

