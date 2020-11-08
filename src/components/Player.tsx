import React from "react";

type Props = {
  folder: string;
  sound: string;
};

const Player = (props: Props) => {
  const { folder, sound } = props;

  const path = `/${folder}/${sound}`;

  const audioTag = (
    <audio controls>
      <source src={path} />
    </audio>
  );

  return audioTag;
};

export default Player;
