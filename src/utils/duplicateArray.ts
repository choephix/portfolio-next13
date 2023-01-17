export const duplicateArray = <T>(arr: T[], duplicateCount: number): T[] =>
  // @ts-ignore
  [].concat(...Array.from({ length: duplicateCount }, () => arr));
