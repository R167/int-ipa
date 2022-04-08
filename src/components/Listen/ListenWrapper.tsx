import { CircularProgress, Fade, Typography } from "@material-ui/core";
import { useAsync } from "react-async-hook";
import { parseIpaSounds } from "../../utils/parsers";
import { fullBaseUrl } from "../../constants";

import ErrorMessage from "../ErrorMessage";
import { ResourceError } from "../../utils/error";
import { useManifest } from "../../Manifest";

import Listen from "./Listen";

const fetchSounds = async (ipaUrl: string | undefined) => {
  if (!ipaUrl) {
    // Absurd. klass will actually always be defined
    console.debug("No url for fetching sounds");
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
  video?: boolean;
}
const ListenWrapper = ({ video }: Props) => {
  const manifest = useManifest();
  const sounds = useAsync(fetchSounds, [manifest.result?.ipaPlayer?.url]);

  if (manifest.result && manifest.result.ipaPlayer?.enabled && sounds.result) {
    // Sound files will default to being relative to the soundFile if no full URL is specified
    const defaultBaseUrl = new URL(
      sounds.result.baseUrl || manifest.result.ipaPlayer.url,
      fullBaseUrl()
    ).toString();

    return <Listen baseUrl={defaultBaseUrl} sounds={sounds.result} video={video} />;
  } else if (manifest.error) {
    return <ErrorMessage error={manifest.error} context={3} defaultHeader="Cannot manifest" />;
  } else if (sounds.error) {
    return <ErrorMessage error={sounds.error} context={3} defaultHeader="Cannot sounds manifest" />;
  } else if (manifest.loading || sounds.loading) {
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
  } else {
    return <Status error children="Audible IPA Chart is not available" />;
  }
};

export default ListenWrapper;
