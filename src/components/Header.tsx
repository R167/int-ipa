import React, { useCallback, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItemIcon,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ListSubheader,
  Switch,
  withStyles,
  Box,
  Grid,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

import { Link, useLocation, matchPath } from "react-router-dom";

import { useManifest } from "../Manifest";
import LinearProgress from "@material-ui/core/LinearProgress";
import { blueGrey, grey } from "@material-ui/core/colors";

const DRAWER_WIDTH = 275;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listTitle: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);

const Loading = ({ error }: { error?: boolean }) => (
  <>
    <ListItem>
      <ListItemText primary={error ? "Error loading classes." : "Loading classes..."} />
    </ListItem>
    <LinearProgress />
  </>
);

interface ListLinkProps {
  to: string;
  text: string;
  exact?: boolean;
  icon?: JSX.Element;
}

const ListLink = (props: ListLinkProps) => {
  const { pathname } = useLocation();
  const { to, text, icon, exact } = props;

  const selected = !!matchPath(pathname, { path: to, exact: exact });

  return (
    <ListItem button component={Link} to={to} selected={selected}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={text} />
    </ListItem>
  );
};

const DarkSwitch = withStyles({
  switchBase: {
    color: grey[100],
    "&$checked": {
      color: "black",
    },
    "&$checked + $track": {
      backgroundColor: grey[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

interface Props {
  darkMode: boolean;
  changeDarkMode: (mode: boolean) => void;
}

const Header = (props: Props) => {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();

  const { result, loading, error } = useManifest();

  const openDrawer = useCallback(() => {
    setDrawer(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setDrawer(false);
  }, []);

  const toggleDarkMode = useCallback(
    (event) => {
      props.changeDarkMode(event.target.checked);
    },
    [props.changeDarkMode]
  );

  const location = useLocation();
  useEffect(() => {
    closeDrawer();
  }, [location]);

  const list = (
    <Box role="presentation" width="100%">
      {/* <Typography className={classes.listTitle} variant="h6">
        Int IPA
      </Typography>
      <Divider /> */}
      <List>
        <ListLink to="/" text="Home" icon={<HomeIcon />} exact />
      </List>
      <Divider />
      <List>
        <ListSubheader>Classes</ListSubheader>
        {error && <Loading error />}
        {loading && <Loading />}
        {result &&
          result.classes.map(
            ({ name, folder, hidden }, i) =>
              !hidden && <ListLink key={`class-list-${i}`} to={`/class/${folder}`} text={name} />
          )}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={drawer} onClose={closeDrawer}>
        <Box
          display="flex"
          flexWrap="wrap"
          width={DRAWER_WIDTH}
          alignContent="space-between"
          alignItems="flex-start"
          height="100%"
          overflow="hidden"
        >
          {list}
          <Box width="100%" mb={2}>
            <Typography component="div">
              <Grid component="label" container justify="center" alignItems="center" spacing={1}>
                <Grid item>Light</Grid>
                <Grid item>
                  <DarkSwitch color="default" checked={props.darkMode} onChange={toggleDarkMode} />
                </Grid>
                <Grid item>Dark</Grid>
              </Grid>
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={openDrawer} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Int IPA</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
