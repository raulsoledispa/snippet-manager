import { prisma } from "~/db.server";

export async function createSnippet(title, description, languageID, code, userId) {
  return prisma.snippet.create({
    data: {
      title,
      description,
      languageID,
      code,
      user: {
        connect: {
          id: userId
        }
      }
    }
  })
}

export async function getSnippetsByUserId(userID) {
  return prisma.snippet.findMany({
    where: {
      userID
    }
  })
}

export async function getLastPublished(){
  return prisma.snippet.findMany({
    orderBy: [
      { createdAt: "desc" }
    ]
  })
}

export async function getDataSnippetById(snippetID) {
  return prisma.snippet.findUnique({
    where: {
      snippetID: Number(snippetID)
    }
  })
}


export async function addLikedToSnippet(snippetID, state) {

  const snippet = await getDataSnippetById(snippetID);
  const count = state === "liked" ? snippet.liked + 1 : snippet.liked -1;
  return prisma.snippets.update({
    where: {
      snippetID: Number(snippetID)
    },
    data:{
      liked: count
    }
  })
}