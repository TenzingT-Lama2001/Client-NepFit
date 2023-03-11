export * from "./types";

export function getActive(path: string, pathname: string, asPath: string) {
  const checkPath =
    typeof path.startsWith === "function" && path.startsWith("#");

  return (
    (!checkPath && pathname.includes(path)) ||
    (!checkPath && asPath.includes(path))
  );
}
