import { Box, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import ListenWrapper from "../Listen/ListenWrapper";
import NotFound from "../NotFound";
import TypeIPA from "./TypeIPA";
import LoadOnce from "./LoadOnce";
import { useManifest } from "../../Manifest";

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
  const { result: manifest } = useManifest();

  const tab = page ? TABS.findIndex(({ path }) => path === page) : 0;
  if (tab < 0) return <NotFound />;
  const { path } = TABS[tab];

  return (
    <div>
      <Typography variant="h4" component="h2" align="center">
        Interactive IPA Chart
      </Typography>
      {manifest?.ipaPlayer?.enabled && <NavTabs tab={tab} />}

      <LoadOnce visible={path === Pages.Type}>
        <TypeIPA />
      </LoadOnce>
      <LoadOnce visible={path === Pages.Audio || path === Pages.Video}>
        <ListenWrapper video={path === Pages.Video} />
      </LoadOnce>
    </div>
  );
};

const NavTabs = ({ tab }: { tab: number }) => {
  const history = useHistory();

  const changeTab = (_event: React.ChangeEvent<{}>, newValue: number) => {
    history.push(`/keyboard/${TABS[newValue].path}`);
  };

  return (
    <Grid container justify="center" component={Box} mb={1}>
      <Grid item>
        <Paper square>
          <Tabs indicatorColor="primary" textColor="primary" onChange={changeTab} value={tab}>
            {TABS.map(({ name, path }) => (
              <Tab label={name} key={path} />
            ))}
          </Tabs>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChartRouter;
