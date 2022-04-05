import { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Link as MatLink,
  Switch,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import CastIcon from "@material-ui/icons/Cast";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";

import { Link, matchPath, useLocation } from "react-router-dom";

import { useManifest } from "../Manifest";
import { grey } from "@material-ui/core/colors";
import { notchGutters } from "../utils/styles";
import { REPO_URL, VERSION, allowRemote } from "../config";

const DRAWER_WIDTH = 275;

const useStyles = makeStyles((theme: Theme) => ({
  itemGutters: {
    paddingLeft: `max(env(safe-area-inset-left, 0px), ${theme.spacing(2)}px)`,
  },
  gutters: notchGutters(theme),
}));

const Loading = ({ error }: { error?: boolean }) => (
  <>
    <ListItem>
      <ListItemText primary={error ? "Error loading classes." : "Loading classes..."} />
    </ListItem>
    <LinearProgress />
  </>
);

interface ListLinkProps {
  gutters: string;
  to: string;
  text: string;
  exact?: boolean;
  icon?: JSX.Element;
}

const ListLink = (props: ListLinkProps) => {
  const { pathname } = useLocation();
  const { to, text, icon, exact, gutters } = props;

  const selected = !!matchPath(pathname, { path: to, exact: exact });

  return (
    <ListItem button component={Link} to={to} selected={selected} classes={{ gutters: gutters }}>
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

  const { changeDarkMode } = props;

  const { result, loading, error } = useManifest();
  const playerEnabled = result?.ipaPlayer?.enabled;

  const openDrawer = useCallback(() => {
    setDrawer(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setDrawer(false);
  }, []);

  const toggleDarkMode = useCallback(
    (event) => {
      changeDarkMode(event.target.checked);
    },
    [changeDarkMode]
  );

  const list = (
    <div>
      <List>
        <ListLink to="/" text="Home" icon={<HomeIcon />} exact gutters={classes.itemGutters} />
      </List>
      <Divider />
      <List>
        <ListSubheader classes={{ gutters: classes.itemGutters }}>Classes</ListSubheader>
        {error && <Loading error />}
        {loading && <Loading />}
        {result &&
          result.classes.map(
            ({ name, folder, hidden }, i) =>
              !hidden && (
                <ListLink
                  key={`class-list-${i}`}
                  to={`/class/${folder}`}
                  text={name}
                  gutters={classes.itemGutters}
                />
              )
          )}
      </List>
      <Divider />
      <List>
        <ListSubheader classes={{ gutters: classes.itemGutters }}>Tools</ListSubheader>
        {allowRemote && (
          <ListLink
            to="/remote"
            text="Hosted Task"
            icon={<CastIcon />}
            exact
            gutters={classes.itemGutters}
          />
        )}
        <ListLink
          to="/keyboard"
          text="IPA Keyboard"
          icon={<KeyboardIcon />}
          exact
          gutters={classes.itemGutters}
        />
        {playerEnabled && (
          <ListLink
            to="/ipa-player"
            text="IPA Player"
            icon={<RecordVoiceOverIcon />}
            exact
            gutters={classes.itemGutters}
          />
        )}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={drawer} onClose={closeDrawer}>
        <Box
          display="flex"
          minWidth={DRAWER_WIDTH}
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          overflow="hidden"
          role="presentation"
        >
          {list}
          <Box mb={2}>
            <Typography component="div">
              <Grid component="label" container justify="center" alignItems="center" spacing={1}>
                <Grid item>Light</Grid>
                <Grid item>
                  <DarkSwitch color="default" checked={props.darkMode} onChange={toggleDarkMode} />
                </Grid>
                <Grid item>Dark</Grid>
              </Grid>
            </Typography>
            <Typography variant="body2" component="div" align="center" color="textSecondary">
              Int IPA –{" "}
              <MatLink href={REPO_URL} color="inherit">
                {VERSION}
              </MatLink>
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <AppBar position="static" color="secondary">
        <Toolbar classes={{ gutters: classes.gutters }}>
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
