// Central place for getting env based config
export const allowRemote = process.env.REACT_APP_ALLOW_REMOTE === "true";
export const browserRouter = process.env.REACT_APP_ROUTER === "browser";

export const VERSION = process.env.REACT_APP_VERSION;
export const REPO = process.env.REACT_APP_REPO;
