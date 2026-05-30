export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return Response.json({ response: "Please type a message." });
    }

    let reply = "I'm here boss. ";

    const lower = message.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      reply = "Hello Boss 👋 I'm Aether, your personal agent with memory. What can I do for you today?";
    } 
    else if (lower.includes("who are you") || lower.includes("your name")) {
      reply = "I am Aether — a cloud-based AI agent. I can remember our conversations and help you with research, business planning, analysis, and more.";
    } 
    else if (lower.includes("remember") || lower.includes("memory")) {
      reply = "I remember our previous chats. Tell me what you want me to focus on or research.";
    } 
    else {
      reply = `You said: "${message}"\n\nI'm ready. You can ask me to:\n• Research scrap metal market\n• Make business plan\n• Analyze competitors\n• Give ideas\n• Anything else`;
    }

    return Response.json({ response: reply });

  } catch (error) {
    console.error(error);
    return Response.json({ 
      response: "Sorry, I had an error. Please try again." 
    });
  }
}
