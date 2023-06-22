import type { RequestHandler } from './$types';
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { OPENAI_KEY } from '$env/static/private'

const config = new Configuration({
    apiKey: OPENAI_KEY
})

const openai = new OpenAIApi(config)

export const POST: RequestHandler = async ({ request }) => {

    const { messages } = await request.json();

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages
    })

    const stream = OpenAIStream(response, {
        // onStart: async() => {
        //     await savePromptToDatabase(prompt)
        // },
        // onToken: async (token: string) => {
        //     console.log(token)
        // },
        // onCompletion: async (completion: string) => {
        //     await saveCompletionToDatabase(completion)
        // }
    })

    return new StreamingTextResponse(stream)

};