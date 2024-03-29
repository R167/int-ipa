import { Dialog, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";
import { useCallback, useMemo, useState } from "react";
import { MiscList } from "../../utils/ipa";
import { IpaSoundsParsed, SoundParsed } from "../../utils/parsers";
import { colToWidth } from "../keyboard/common";
import GridDisplay from "../keyboard/GridDisplay";
import { BaseKeyboard, Item } from "../keyboard/Keyboard";
import NonPulmonics from "../keyboard/NonPulmonics";
import Markdown from "../Markdown";
import { useAudioPlayer } from "./player";

interface Props {
  sounds: IpaSoundsParsed;
  baseUrl: string;
  video?: boolean;
}

const Listen = ({ sounds, baseUrl, video }: Props) => {
  const { play } = useAudioPlayer(sounds, baseUrl);
  const [sound, setSound] = useState<SoundParsed | undefined>();

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

    sounds?.sections?.forEach(({ name, symbols, columns }) => {
      const list: MiscList = symbols.map(({ ipa, description }) => ({
        ipa,
        sym: ipa,
        description,
      }));

      const width = colToWidth(columns);

      sections.push(
        <Item size="half" header={name} key={name}>
          <GridDisplay content={list} breakpoints={{ xs: width }} />
        </Item>
      );
    });

    return sections;
  }, [sounds.sections]);

  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item md={8}>
          <Typography gutterBottom>
            Click around to hear the sounds of the International Phonetic Alphabet. Press a symbol
            to hear it spoken.
          </Typography>
        </Grid>
      </Grid>
      {video && <VideoDialog sound={sound} baseUrl={baseUrl} close={() => setSound(undefined)} />}
      <BaseKeyboard subset={validKeys} onClick={playSound}>
        {sections}
      </BaseKeyboard>

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
