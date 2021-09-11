import { memo } from "react";
import { Button, Tooltip } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

interface Props {
  baseUrl: string;
  file?: string;
}

const PlayButton = (props: Props) => {
  const { file, baseUrl } = props;
  // Element is regenerated every time the url changes, so this is ~fine
  let hasSeekingIssues = false;

  // hey, it's easier just to use the function than figure it out...
  const audioFile = (() => {
    if (file) {
      const audioUrl = new URL(file, baseUrl).toString();
      const element = new Audio(audioUrl);
      return element;
    }
  })();

  const playAudio = () => {
    if (audioFile) {
      try {
        audioFile.currentTime = 0;
        // There is a bug in recent versions of webkit (Safari 15) which causes
        // the player to stall on seeking to the beginning of the audio file. If the file hasn't started
        // or is already in memory, then seeking should be false after ~0 time, in which case we can be
        // fairly confident everything is working correctly. OTHERWISE: we keep forcing this audio file
        // to load after failing the check
        if (hasSeekingIssues) {
          console.info("This player has seeking issues. Forcing load");
          audioFile.load();
        } else {
          setTimeout(() => {
            if (audioFile.seeking) {
              console.log("Player has seeking issues. Switching to LOAD approach");
              hasSeekingIssues = true;
              audioFile.load();
              audioFile.play();
            }
          }, 15);
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

  // A more robust method would be checking if the audio file loads, but there's no easy way
  // to check this until after the play button is pressed.
  const disable = !audioFile;

  return (
    <Tooltip title={disable ? "No sound file to play" : ""}>
      <div>
        <Button
          title="Play sound"
          variant="contained"
          color="secondary"
          startIcon={<PlayCircleFilledIcon />}
          onClick={playAudio}
          disabled={disable}
        >
          Play
        </Button>
      </div>
    </Tooltip>
  );
};

export default memo(PlayButton);
