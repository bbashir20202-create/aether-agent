export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json({ response: "Please type a message." }, { status: 400 });
    }

    let reply = "I'm here boss. ";

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      reply = "Hello Boss 👋 I'm Aether. I have memory. What would you like to do today?";
    } 
    else if (lowerMessage.includes("who are you") || lowerMessage.includes("your name")) {
      reply = "I am Aether — your personal cloud agent with memory. I can help you with research, business planning, analysis, and more.";
    } 
    else if (lowerMessage.includes("remember")) {
      reply = "I remember our previous conversations. Tell me what you want me to focus on.";
    } 
    else {
      reply = `You said: "${message}".\n\nI'm ready. Tell me what you want me to do — research scrap metal market, make business plan, analyze something, or anything else.`;
    }

    return Response.json({ response: reply });

  } catch (error) {
    console.error(error);
    return Response.json({ 
      response: "Sorry, something went wrong. Please try again." 
    }, { status: 500 });
  }
}
