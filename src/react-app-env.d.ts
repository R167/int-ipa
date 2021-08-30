/// <reference types="react-scripts" />

interface Window {
  webkitAudioContext: typeof AudioContext;
  toggleDebug: () => void;
}

declare module "react-meta-tags" {
  declare class MetaTags extends React.Component<{}, any> {}

  export default MetaTags;
}
