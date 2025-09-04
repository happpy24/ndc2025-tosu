export type WithOptional<T, U extends keyof T> = Pick<
  T,
  Exclude<keyof T, U>
> & {
  [K in U]?: T[K] | undefined;
};

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export function getAvatarUrl(userId?: number) {
  return `https://a.ppy.sh/${userId}`;
}
