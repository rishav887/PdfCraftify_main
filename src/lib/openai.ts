import OpenAI from 'openai'

export const config = {
  runtime: 'edge',
};

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
