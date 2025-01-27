import os
import uvicorn
from fastapi import FastAPI, HTTPException
from langchain_mistralai import ChatMistralAI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")
if not api_key:
    raise RuntimeError("MISTRAL_API_KEY is not present. Please check your .env file.")

model = ChatMistralAI(model="mistral-large-latest")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class EmailRequest(BaseModel):
    receiptName: str
    purpose: str
    points: str


@app.post("/generate-email")
async def generate_email(data: EmailRequest):
    try:
        if not (data.purpose or data.receiptName or data.points):
            return {"message": "Fields are missing"}
        email_prompt = f"""
        Generate a professional email for the purpose: {data.purpose}.
        Address the email to: {data.receiptName}.
        Include the following key points: {data.points}.
        """
        print("Check")
        generated = model.invoke(email_prompt)

        return {"email": generated.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def check_working():
    return {"message": "WWorking Succesfully!"}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
