import z from "zod";

export function getAvatarUrl(userId?: number) {
  return `https://a.ppy.sh/${userId}`;
}
