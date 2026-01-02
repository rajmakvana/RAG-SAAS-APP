import { getFinalResponse } from "../services/getFinalResponse.js";
import prisma from "../config/dataBase.js";
import { v4 as uuidv4 } from "uuid";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

// handle user chat
export const userChat = async (req, res) => {
  const { question, threadId } = req.body;
  const userId = req.user.id;

  if (!question || question.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "question is required" });
  }

  try {
    let thread;
    let chatHistory = [];

    // check if thread is exists or not
    if (threadId) {
      thread = await prisma.thread.findUnique({
        where: { id: threadId },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      chatHistory = thread.messages.map((msg) => {
        if (msg.role === "USER") {
          return new HumanMessage(msg.content);
        }
        if (msg.role === "ASSISTANT") {
          return new AIMessage(msg.content);
        }
      });
    }

    if (!thread) {
      // create new thread
      thread = await prisma.thread.create({
        data: {
          id: uuidv4(),
          title: question.slice(0, 50),
          userId,
        },
      });
    }

    const userMessage = await prisma.message.create({
      data: {
        threadId: thread.id,
        content: question,
        role: "USER",
      },
    });

    // get response from groq => similarity search + websearch + final response
    const assistantResponse = await getFinalResponse(question, chatHistory);

    // save chat History
    chatHistory.push(new HumanMessage(question));
    chatHistory.push(new AIMessage(assistantResponse.content));

    const assistantMessage = await prisma.message.create({
      data: {
        threadId: thread.id,
        content: assistantResponse.content,
        role: "ASSISTANT",
      },
    });

    res.status(200).json({
      success: true,
      message: "Chat API is working",
      result: [userMessage, assistantMessage],
    });
  } catch (error) {
    console.error("chat error:", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

// get all threads of a user
export const getUserThreads = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "user id is required" });
    }

    const threads = await prisma.thread.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.status(200).json({ success: true, threads });
  } catch (error) {
    console.error("chat error:", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

// get messages of a thread
export const getThreadMessages = async (req, res) => {
  const userId = req.user.id;

  try {
    const { threadId } = req.params;

    if (!threadId) {
      return res
        .status(400)
        .json({ success: false, message: "thread id is required" });
    }

    const thread = await prisma.thread.findUnique({
      where: { id: threadId, userId },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!thread) {
      return res
        .status(404)
        .json({ success: false, message: "thread not found" });
    }

    res.status(200).json({ success: true, messages: thread.messages });
  } catch (error) {
    console.error("chat error:", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

// delete a thread
export const deleteThread = async (req, res) => {
  try {
    const userId = req.user.id;
    const {threadId} = req.params;

    const thread = await prisma.thread.findFirst({
      where: {
        id: threadId,
        userId,
      },
    });

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    await prisma.thread.delete({
      where: { id: threadId },
    });

    res.json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete thread" });
  }
};
