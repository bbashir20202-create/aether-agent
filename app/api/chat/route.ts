import { NextRequest, NextResponse } from 'next/server';

let memory: Array<{ role: string; content: string }> = [];

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ response: "Please type a message." }, { status: 400 });
    }

    memory.push({ role: "user", content: message });

    let reply = "I'm here, boss. ";

    if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
      reply = "Hello Boss 👋 I'm Aether. I remember everything you tell me. What would you like to do today?";
    } else if (message.toLowerCase().includes("who are you") || message.toLowerCase().includes("your name")) {
      reply = "I am Aether — your personal cloud agent with memory. I can help you with business ideas, research, planning, analysis, and more.";
    } else if (message.toLowerCase().includes("remember")) {
      reply = `I remember you said: "${memory[memory.length - 2]?.content || 'nothing yet'}". How can I help you with that?`;
    } else {
      reply += `You said "${message}". I'm still learning to be more powerful. Try asking me to research something, analyze your business idea, or make a plan.`;
    }

    memory.push({ role: "assistant", content: reply });

    // Keep memory reasonable
    if (memory.length > 20) memory = memory.slice(-20);

    return NextResponse.json({ response: reply });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ 
      response: "Sorry, I had trouble processing that. Can you try again?" 
    }, { status: 500 });
  }
}
