export * from "./types";

export function getActive(path: string, pathname: string, asPath: string) {
  const checkPath = path.startsWith("#");

  return (
    (!checkPath && pathname.includes(path)) ||
    (!checkPath && asPath.includes(path))
  );
}
