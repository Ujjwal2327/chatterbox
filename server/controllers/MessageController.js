import { type } from "os";
import getPrismaInstance from "../utils/PrismaClient.js";
import { renameSync } from "fs";

export const addMessage = async (req, res, next) => {
  const { message, senderId, receiverId } = req.body;
  try {
    const prisma = getPrismaInstance();
    const { message, from, to } = req.body;
    const isReceiverOnline = onlineUsers.get(to);
    if (message && from && to) {
      const newMessage = await prisma.message.create({
        data: {
          message,
          sender: { connect: { id: parseInt(from) } },
          receiver: { connect: { id: parseInt(to) } },
          messageStatus: isReceiverOnline ? "delivered" : "sent",
        },
        // select: { sender: true, receiver: true },
      });
      return res.status(201).send({ message: newMessage });
    }
    return res.status(400).send("Invalid message, sender or receiver data");
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  const { from, to } = req.params;
  try {
    const prisma = getPrismaInstance();
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: parseInt(from), receiverId: parseInt(to) },
          { senderId: parseInt(to), receiverId: parseInt(from) },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    const unreadMessagesIDs = [];
    messages.forEach((message, index) => {
      if (
        message.messageStatus !== "read" &&
        message.senderId === parseInt(to)
      ) {
        messages[index].messageStatus = "read";
        unreadMessagesIDs.push(message.id);
      }
    });

    await prisma.message.updateMany({
      where: { id: { in: unreadMessagesIDs } },
      data: { messageStatus: "read" },
    });

    return res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

export const addImageMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = `uploads/images/${date}-${req.file.originalname}`;
      renameSync(req.file.path, fileName);
      const prisma = getPrismaInstance();
      const { from, to } = req.query;

      if (from && to) {
        const message = await prisma.message.create({
          data: {
            message: fileName,
            type: "image",
            sender: { connect: { id: parseInt(from) } },
            receiver: { connect: { id: parseInt(to) } },
          },
        });
        res.status(201).json({ message });
      }
      return res.status(400).send("Invalid sender or receiver data");
    }
    return res.status(400).send("No image uploaded");
  } catch (error) {
    next(error);
  }
};

export const addAudioMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = `uploads/recordings/${date}-${req.file.originalname}`;
      renameSync(req.file.path, fileName);
      const prisma = getPrismaInstance();
      const { from, to } = req.query;

      if (from && to) {
        const message = await prisma.message.create({
          data: {
            message: fileName,
            type: "audio",
            sender: { connect: { id: parseInt(from) } },
            receiver: { connect: { id: parseInt(to) } },
          },
        });
        res.status(201).json({ message });
      }
      return res.status(400).send("Invalid sender or receiver data");
    }
    return res.status(400).send("No Audio uploaded");
  } catch (error) {
    next(error);
  }
};
