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
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

import { Link, useLocation } from "react-router-dom";

import { useManifest } from "../Manifest";
import LinearProgress from "@material-ui/core/LinearProgress";
import { JSDocCallbackTag } from "typescript";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listTitle: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    list: {
      width: 275,
    },
  })
);

const Loading = () => (
  <>
    <ListItem>
      <ListItemText primary="Loading classes..." />
    </ListItem>
    <LinearProgress />
  </>
);

interface ListLinkProps {
  to: string;
  text: string;
  icon?: JSX.Element;
}

const ListLink = (props: ListLinkProps) => {
  const { pathname } = useLocation();
  const { to, text, icon } = props;

  return (
    <ListItem button component={Link} to={to} selected={pathname === to}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={text} />
    </ListItem>
  );
};

const Header = () => {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();

  const { result, loading, error } = useManifest();

  const openDrawer = useCallback(() => {
    setDrawer(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setDrawer(false);
  }, []);

  const location = useLocation();
  useEffect(() => {
    closeDrawer();
  }, [location]);

  const list = (
    <div role="presentation">
      {/* <Typography className={classes.listTitle} variant="h6">
        Int IPA
      </Typography>
      <Divider /> */}
      <List className={classes.list}>
        <ListLink to="/" text="Home" icon={<HomeIcon />} />
      </List>
      <Divider />
      <List>
        <ListSubheader>Classes</ListSubheader>
        {loading && <Loading />}
        {result &&
          result.classes.map(
            ({ name, folder, hidden }, i) =>
              !hidden && <ListLink key={`class-list-${i}`} to={`/class/${folder}`} text={name} />
          )}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={drawer} onClose={closeDrawer}>
        {list}
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
