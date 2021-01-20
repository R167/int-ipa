// A list of constants for the project

// PUBLIC_URL access
export const BASE_URL = `${process.env.PUBLIC_URL}/config`;

// URL of teh manifest file
export const MANIFEST_FILE = `${BASE_URL}/manifest.yaml`;

// Name of the task file
export const TASK_FILE = "tasks.yaml";

// Generate a full file URL given the folder and the pathname
export const fileUrl = (folder: string, path: string) => `${BASE_URL}/${folder}/${path}`;

export const fullBaseUrl = () => new URL(BASE_URL, window.location.href);
