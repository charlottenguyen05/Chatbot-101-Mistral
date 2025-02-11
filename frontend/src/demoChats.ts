const demoChats = [
    { role: "user", content: "Hello, how are you?" },
    { role: "assistant", content: "I'm doing great! How can I assist you today?" },
    { role: "user", content: "Can you help me with JavaScript?" },
    { role: "assistant", content: "Of course! What specifically do you need help with in JavaScript?" },
    { role: "user", content: "I need to understand how async/await works." },
    { role: "assistant", content: "Async/await is a way to handle asynchronous operations in JavaScript more cleanly than using promises. Would you like an example?" },
    { role: "user", content: "Yes, please!" },
    { role: "assistant", content: "Sure! Here's an example:\n```javascript\nasync function fetchData() {\n  try {\n    let response = await fetch('https://api.example.com/data');\n    let data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error fetching data:', error);\n  }\n}\nfetchData();\n```" },
    { role: "user", content: "That makes sense. Thanks!" },
    { role: "assistant", content: "You're welcome! Let me know if you need further clarification." }
    ];
  
export default demoChats;
  