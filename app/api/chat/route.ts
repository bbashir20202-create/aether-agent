import { NextRequest, NextResponse } from 'next/server';

let memory: { role: string; content: string }[] = [];

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ response: "Please type a message." });
    }

    memory.push({ role: "user", content: message });

    let reply = "I'm here boss. ";

    const lower = message.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      reply = "Hello Boss 👋 I'm Aether. I remember our conversations. What would you like to do today?";
    } else if (lower.includes("who are you") || lower.includes("name")) {
      reply = "I am Aether, your personal AI agent with memory. I can help you with research, business ideas, planning, and more.";
    } else if (lower.includes("remember")) {
      reply = `I remember you said: "${memory[memory.length - 2]?.content || 'nothing yet'}". How can I assist you?`;
    } else {
      reply += `You said "${message}". Try asking me to research the scrap metal market, make a business plan, or analyze something.`;
    }

    memory.push({ role: "assistant", content: reply });

    if (memory.length > 20) memory = memory.slice(-20);

    return NextResponse.json({ response: reply });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ response: "Sorry, something went wrong. Please try again." });
  }
}
