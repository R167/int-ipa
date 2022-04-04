import { useCallback, useMemo } from "react";
import { MiscList } from "../../utils/ipa";
import { IpaSoundsParsed } from "../../utils/parsers";
import GridDisplay from "../keyboard/GridDisplay";
import { BaseKeyboard, Item } from "../keyboard/Keyboard";
import NonPulmonics from "../keyboard/NonPulmonics";
import { useAudioPlayer } from "./player";

const Listen = ({ sounds, baseUrl }: { sounds: IpaSoundsParsed; baseUrl: string }) => {
  const { play } = useAudioPlayer(sounds, baseUrl);

  const validKeys = useCallback(
    (key: string): boolean => {
      return sounds.symbols.has(key);
    },
    [sounds]
  );

  const sections = useMemo(() => {
    const sections = [
      <Item size="half" header="Consonants (Non-pulmonics)">
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
        <Item size="half" header={name}>
          <GridDisplay content={list} />
        </Item>
      );
    });

    return sections;
  }, [sounds.sections]);

  return (
    <>
      <BaseKeyboard subset={validKeys} onClick={play}>
        {sections}
      </BaseKeyboard>
    </>
  );
};

export default Listen;
