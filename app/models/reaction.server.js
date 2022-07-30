import { prisma } from "~/db.server";

export async function addReactionToSnippet(snippetId, reactionType) {
  console.log(prisma);
  console.log(reactionType);

  return prisma.reaction.create({
    data: {
      type: prisma.reactionType.LIKED,
      total: 1,
      snippetId,
    },
  });
}
