import getPrismaInstance from "../utils/PrismaClient.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        profilePicture: true,
        about: true,
      },
    });

    const usersGroups = {};
    users.forEach((user) => {
      const initialLetter = user.name[0].toUpperCase();
      if (!usersGroups[initialLetter]) usersGroups[initialLetter] = [];
      usersGroups[initialLetter].push(user);
    });

    return res.status(200).send({ usersGroups });
  } catch (error) {
    next(error);
  }
};

export const changeCurrentChatUser = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { userId, currentChatUserId } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { currentChatUserId },
    });

    return res.status(200);
  } catch (error) {
    next(error);
  }
};
