import { memo, useMemo, useRef } from "react";
import { Button, Tooltip } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

export const useAudioFile = (file?: string, baseUrl?: string): (() => void) | undefined => {
  const hasSeekingIssues = useRef(false);

  return useMemo(() => {
    hasSeekingIssues.current = false;
    // hey, it's easier just to use the function than figure it out...
    const audioFile = (() => {
      if (file) {
        const audioUrl = new URL(file, baseUrl).toString();
        const element = new Audio(audioUrl);
        return element;
      }
    })();

    if (!audioFile) return undefined;

    return () => {
      if (audioFile) {
        try {
          audioFile.currentTime = 0;
          // There is a bug in recent versions of webkit (Safari 15) which causes
          // the player to stall on seeking to the beginning of the audio file. If the file hasn't started
          // or is already in memory, then seeking should be false after ~0 time, in which case we can be
          // fairly confident everything is working correctly. OTHERWISE: we keep forcing this audio file
          // to load after failing the check
          if (hasSeekingIssues.current) {
            console.info("This player has seeking issues. Forcing load");
            audioFile.load();
          } else {
            setTimeout(() => {
              if (audioFile.seeking) {
                console.log("Player has seeking issues. Switching to LOAD approach");
                hasSeekingIssues.current = true;
                audioFile.load();
                audioFile.play();
              }
            }, 50);
          }
          // audioFile.load();
          audioFile.play().catch((e) => {
            console.error({ message: "unable to play url", src: audioFile.src, err: e });
          });
        } catch (e) {
          console.error({ message: "unable to play url", src: audioFile.src, err: e });
        }
      } else {
        console.info("no audio file");
      }
    };
  }, [file, baseUrl]);
};

interface Props {
  baseUrl: string;
  file?: string;
}

const PlayButton = (props: Props) => {
  const { file, baseUrl } = props;
  const playAudio = useAudioFile(file, baseUrl);

  // A more robust method would be checking if the audio file loads, but there's no easy way
  // to check this until after the play button is pressed.
  const disabled = !playAudio;

  return (
    <Tooltip title={disabled ? "No sound file to play" : ""}>
      <div>
        <Button
          title="Play sound"
          variant="contained"
          color="secondary"
          startIcon={<PlayCircleFilledIcon />}
          onClick={playAudio}
          disabled={disabled}
        >
          Play
        </Button>
      </div>
    </Tooltip>
  );
};

export default memo(PlayButton);
