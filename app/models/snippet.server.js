import { prisma } from "~/db.server";

export async function createSnippet(title, description, languageId, code, userId) {
  return prisma.snippet.create({
    include: {
      author: true
    },
    data: {
      title,
      description,
      code,
      language: {
        connect: {
          id: Number(languageId)
        }
      },
      author: {
        connect: {
          id: userId
        }
      }
    }
  })
}

export async function getSnippetsByUserId(id) {
  return prisma.snippet.findMany({
    where: {
      authorId: id
    },
    include: {
      language: true,
      author: true
    }
  })
}

export async function getLastPublished(){
  return prisma.snippet.findMany({
    orderBy: [
      { publishedAt: "desc" },
    ],
    include: {
      author: true, language: true
    }
  })
}

export async function getDataSnippetById(snippetID) {
  return prisma.snippet.findUnique({
    where: {
      id: Number(snippetID)
    },
    include: {
      author: true, language: true
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