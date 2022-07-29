import { prisma } from "~/db.server";

export async function createSnippet(title, description, languageID, snippet) {
  return prisma.snippets.create({
    data: {
      title,
      description,
      languageID,
      codeSnippet: snippet,
      userID: 1,
      liked: 0
      /*user: {
        connect: {
          userID: 1
        }
      }*/
    }
  })
}

export async function getSnippetsByUserId(userID) {
  return prisma.snippets.findMany({
    where: {
      userID
    }
  })
}

export async function getLastPublished(){
  return prisma.snippets.findMany({
    orderBy: [
      { createdAt: "desc" }
    ]
  })
}

export async function getDataSnippetById(snippetID) {
  return prisma.snippets.findUnique({
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