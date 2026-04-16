import os
import google.generativeai as genai
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Configure Google Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
def chat_with_bot(request: ChatRequest):
    if not GEMINI_API_KEY:
        return ChatResponse(reply="System Error: Gemini API key is not configured. Please add GEMINI_API_KEY to the backend .env file.")

    try:
        model = genai.GenerativeModel('gemini-1.5-pro')
        prompt = f"""
        You are EventPulse AI, a smart assistant for a physical tech conference event.
        You should help attendees with FAQs about schedules, locations, and general event information.
        Be concise, helpful, and polite. Keep answers to less than 3 sentences if possible.
        User question: {request.message}
        """
        response = model.generate_content(prompt)
        return ChatResponse(reply=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
