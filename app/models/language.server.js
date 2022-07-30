import { prisma } from "~/db.server";

export async function getLanguages() {
  return prisma.language.findMany();
}
