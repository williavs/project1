import os
import logging
from typing import Dict, List
from dotenv import load_dotenv
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from langchain_openai import ChatOpenAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from pydantic import BaseModel

load_dotenv()

logging.basicConfig(level=logging.DEBUG)

router = APIRouter()

# Initialize ChatOpenAI
llm = ChatOpenAI(model_name="gpt-4o")

# Create the conversation chain
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

chain = prompt | llm

# Initialize conversation memory
memory_store = {}

def get_memory(session_id: str):
    if session_id not in memory_store:
        memory_store[session_id] = ChatMessageHistory()
    return memory_store[session_id]

def load_memory(session_id: str):
    return get_memory(session_id).messages

def invoke_chain_with_memory(session_id: str, user_input: str):
    chain_with_memory = RunnablePassthrough.assign(
        history=lambda x: load_memory(session_id)
    ) | chain
    response = chain_with_memory.invoke({"input": user_input})
    get_memory(session_id).add_user_message(user_input)
    get_memory(session_id).add_ai_message(response.content)
    return response.content

class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.websocket("/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    session_id = str(id(websocket))  # Use a unique identifier for each websocket connection
    try:
        while True:
            data = await websocket.receive_json()
            user_message = data["message"]
            
            response = invoke_chain_with_memory(session_id, user_message)
            
            await websocket.send_json({"response": response})
    except WebSocketDisconnect:
        print("WebSocket disconnected")

@router.post("/chat")
async def chat_endpoint(chat_message: ChatMessage):
    session_id = "default"  # You might want to implement a proper session management system
    response = invoke_chain_with_memory(session_id, chat_message.message)
    return ChatResponse(response=response)

# Quick test function
async def test_chat():
    test_messages = [
        "Hi! I'm Bob.",
        "What's my name?",
        "Tell me a joke about programming.",
    ]
    
    session_id = "test_session"
    for message in test_messages:
        print(f"User: {message}")
        response = invoke_chain_with_memory(session_id, message)
        print(f"AI: {response}\n")

# Uncomment the following lines to run the test
# if __name__ == "__main__":
#     import asyncio
#     asyncio.run(test_chat())