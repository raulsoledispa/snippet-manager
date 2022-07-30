import { prisma } from "~/db.server";

export async function addReactionToSnippet(snippetId, reactionId, total) {
  return prisma.reaction.update({
    where: {
      id: Number(reactionId),
    },
    data: {
      total: Number(total) + 1,
    },
  });
}
