import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MiscList } from "../../utils/ipa";
import { IpaSoundsParsed, SoundParsed } from "../../utils/parsers";
import GridDisplay from "../keyboard/GridDisplay";
import { BaseKeyboard, Item } from "../keyboard/Keyboard";
import NonPulmonics from "../keyboard/NonPulmonics";
import Markdown from "../Markdown";
import TypeIPA from "../TypeIPA";
import { useAudioPlayer } from "./player";

enum KbTab {
  Type = 0,
  Audio = 1,
  Video = 2,
}

const Listen = ({ sounds, baseUrl }: { sounds: IpaSoundsParsed; baseUrl: string }) => {
  const { play, stop } = useAudioPlayer(sounds, baseUrl);
  const [sound, setSound] = useState<SoundParsed | undefined>();

  const [value, setValue] = useState(KbTab.Audio);
  const video = value === KbTab.Video;

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => stop(), [value, stop]);

  const validKeys = useCallback(
    (key: string): boolean => {
      return sounds.symbols.has(key);
    },
    [sounds]
  );

  const playSound = useCallback(
    (char: string) => {
      if (video) {
        setSound(sounds.symbols.get(char));
      } else {
        play(char);
      }
    },
    [play, sounds.symbols, video]
  );

  const sections = useMemo(() => {
    const sections = [
      <Item size="half" header="Consonants (Non-pulmonics)" key="non-pulmonic">
        <NonPulmonics />
      </Item>,
    ];

    sounds?.sections?.forEach(({ name, symbols }) => {
      const list: MiscList = symbols.map(({ ipa, description }) => ({
        ipa,
        sym: ipa,
        description,
      }));

      sections.push(
        <Item size="half" header={name} key={name}>
          <GridDisplay content={list} />
        </Item>
      );
    });

    return sections;
  }, [sounds.sections]);

  return (
    <div>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Interactive IPA Chart
      </Typography>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Paper square>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              value={value}
              centered
            >
              <Tab label="Type" />
              <Tab label="Audio" />
              <Tab label="Audio + Video" />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center">
        <Grid item md={8}>
          <Typography gutterBottom>
            This page lets you play and listen to the sounds of the Internation Phonetic Alphabet.
            Click a symbol below to hear it spoken. Additionally, you can enable video mode to see
            the sounds spoken.
          </Typography>
        </Grid>
      </Grid>
      {video && <VideoDialog sound={sound} baseUrl={baseUrl} close={() => setSound(undefined)} />}
      {value === KbTab.Type ? (
        <TypeIPA />
      ) : (
        <BaseKeyboard subset={validKeys} onClick={playSound}>
          {sections}
        </BaseKeyboard>
      )}

      {sounds.footer && (
        <Grid container spacing={2} justify="center">
          <Grid item md={8} xs={12}>
            <Markdown children={sounds.footer} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

interface VideoProps {
  sound: SoundParsed | undefined;
  baseUrl: string;
  close: () => void;
}
const VideoDialog = ({ sound, baseUrl, close }: VideoProps) => {
  return (
    <Dialog
      open={!!sound}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">IPA: [{sound?.ipa}]</DialogTitle>
      <DialogContent>
        {sound && (
          <video
            controls
            autoPlay
            style={{ width: "100%" }}
            src={new URL(sound.video || sound?.audio, baseUrl).toString()}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Listen;
