import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export async function getUserById(id) {
  return prisma.users.findUnique({ where: { userID: id } });
}

export async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}


export async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      name: "",
      lastName: ""
    },
  });
}

export async function deleteUserByEmail(email) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(email, password) {
  const userWithPassword = await prisma.users.findUnique({
    where: { email }
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
