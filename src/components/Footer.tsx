import { Container, Link, Typography, makeStyles } from "@material-ui/core";
import { hostedSite } from "../config";

// import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}));

// Only state "maintained" for the hosted variant
const disclaimer = hostedSite ? "Created and maintained by " : "Originally created by ";

const Footer = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="footer" classes={{ root: classes.root }}>
      <Typography align="center" variant="body2" color="textSecondary">
        {disclaimer}
        <Link href="https://github.com/R167/int-ipa" color="textPrimary">
          Winston Durand
        </Link>
        . Source code and examples released under the{" "}
        <Link href="https://github.com/R167/int-ipa/blob/master/LICENSE" color="textPrimary">
          MIT
        </Link>{" "}
        license. Website and documentation licensed under{" "}
        <Link href="https://creativecommons.org/licenses/by/4.0/" color="textPrimary">
          CC BY 4.0
        </Link>
        .
      </Typography>
    </Container>
  );
};

export default Footer;
