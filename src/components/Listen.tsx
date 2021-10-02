import Keyboard from "./keyboard/Keyboard";

import { CircularProgress, Fade, Typography } from "@material-ui/core";
import { useAsync } from "react-async-hook";
import { IpaSoundsParsed, parseIpaSounds } from "../utils/parsers";
import { fullBaseUrl } from "../constants";

import ErrorMessage from "./ErrorMessage";
import { ResourceError } from "../utils/error";

const fetchSounds = async (ipaUrl: string) => {
  if (!ipaUrl) {
    // Absurd. klass will actually always be defined
    console.log("no url");
    return;
  }

  const req = await fetch(ipaUrl).catch((error) => {
    if (error instanceof TypeError) {
      throw new ResourceError(
        `Cannot fetch resource. Permissions may not be correctly configured.`,
        error.message
      );
    } else {
      throw error;
    }
  });

  if (req.status !== 200) {
    throw new ResourceError(`${req.statusText}: Resource cannot be retrieved`);
  }

  const body = await req.text();

  return parseIpaSounds(body);
};

interface StatusProps {
  children: React.ReactNode;
  error?: boolean;
}

const Status = ({ children, error }: StatusProps) => (
  <Typography variant="h3" component="p" gutterBottom align="center">
    {error && "Error: "}
    {children}
  </Typography>
);

interface Props {
  url: string;
}

const LoadListen = (props: Props) => {
  const { url } = props;
  const sounds = useAsync(fetchSounds, [url]);
  const baseUrl = new URL(url, fullBaseUrl()).toString();

  if (sounds.result) {
    return <Listen sounds={sounds.result} baseUrl={sounds.result.baseUrl || baseUrl} />;
  } else if (sounds.loading) {
    return (
      <Fade
        in
        style={{
          transitionDelay: "500ms",
        }}
        unmountOnExit
      >
        <Typography variant="h4" component="h1" align="center">
          <CircularProgress />
        </Typography>
      </Fade>
    );
  } else if (sounds.error) {
    return <ErrorMessage error={sounds.error} context={3} defaultHeader="Cannot load task file" />;
  } else {
    return <Status error children="Unreachable state???" />;
  }
};

const Listen = ({ sounds, baseUrl }: { sounds: IpaSoundsParsed; baseUrl: string }) => {
  const validKeys = (key: string): boolean => {
    return sounds.symbols.has(key);
  };

  return <Keyboard subset={validKeys} />;
};

export default LoadListen;
