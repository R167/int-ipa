import { Box, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import ListenWrapper from "../Listen/ListenWrapper";
import NotFound from "../NotFound";
import TypeIPA from "../TypeIPA";
import LoadOnce from "./LoadOnce";

enum Pages {
  Type = "type",
  Audio = "audio",
  Video = "video",
}

const TABS = [
  { name: "Type", path: Pages.Type },
  { name: "Audio", path: Pages.Audio },
  { name: "Audio + Video", path: Pages.Video },
] as const;

const ChartRouter = () => {
  const { page } = useParams<{ page: string | undefined }>();
  const history = useHistory();

  const changeTab = useCallback(
    (_event: React.ChangeEvent<{}>, newValue: number) => {
      history.push(`/keyboard/${TABS[newValue].path}`);
    },
    [history]
  );

  // useEffect(() => {
  //   setTimeout(() => history.push("/keyboard/type"), 1000);
  // }, []);
  // const tabs = useMemo(() => TABS.map(({ name, path }) => <Tab label={name} key={path} />), []);

  const tab = page ? TABS.findIndex(({ path }) => path === page) : 0;
  if (tab < 0) return <NotFound />;
  const { path } = TABS[tab];

  return (
    <div>
      <Typography variant="h4" component="h2" align="center">
        Interactive IPA Chart
      </Typography>
      <Grid container justify="center" component={Box} mb={1}>
        <Grid item>
          <Paper square>
            <Tabs indicatorColor="primary" textColor="primary" onChange={changeTab} value={tab}>
              <Tab label="Type" />
              <Tab label="Audio" />
              <Tab label="Audio + Video" />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>

      <LoadOnce visible={path === Pages.Type}>
        <TypeIPA key="ipa" />
      </LoadOnce>
      {/* {path === Pages.Type && <TypeIPA key="ipa" />} */}
      {(path === Pages.Audio || path === Pages.Video) && (
        <ListenWrapper video={path === Pages.Video} />
      )}
      {/* <LoadOnce visible={path === Pages.Audio || path === Pages.Video}>
        <ListenWrapper video={path === Pages.Video} />
      </LoadOnce> */}
    </div>
  );
};

export default ChartRouter;
