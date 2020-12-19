import { Link as MatLink, LinkProps } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

type Props = LinkProps<typeof RouterLink>;

const Link = (props: Props) => <MatLink component={RouterLink} {...props} />;

export default Link;
