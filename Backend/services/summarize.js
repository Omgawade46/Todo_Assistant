const axios = require('axios');
const { todos } = require('../routes/todos');

module.exports = async (req, res) => {
  try {
    const pendingTodos = todos
      .filter(todo => !todo.completed)
      .map(todo => `- ${todo.task}`)
      .join('\n');

    if (!pendingTodos) {
      return res.status(400).json({ error: 'No pending todos to summarize' });
    }

    const prompt = `Summarize the following to-do list:\n${pendingTodos}`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Todo Summary Assistant',
        },
      }
    );

    const summary = response.data.choices[0].message.content;

    const payload = { text: summary };
    await axios.post(process.env.SLACK_WEBHOOK_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Sent summary to Slack:', summary);
    res.status(200).json({ message: 'Summary sent to Slack successfully', summary });
  } catch (error) {
    console.error('Summarize error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to summarize and send to Slack' });
  }
};
