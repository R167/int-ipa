import { useCallback, useRef } from "react";
import { IpaSoundsParsed } from "../../utils/parsers";
import Keyboard, { BaseKeyboard } from "../keyboard/Keyboard";
import { useAudioPlayer } from "./player";

const Listen = ({ sounds, baseUrl }: { sounds: IpaSoundsParsed; baseUrl: string }) => {
  const { play } = useAudioPlayer(sounds, baseUrl);

  const validKeys = useCallback(
    (key: string): boolean => {
      return sounds.symbols.has(key);
    },
    [sounds]
  );
  return (
    <>
      <BaseKeyboard subset={validKeys} onClick={play} />
    </>
  );
};

export default Listen;
