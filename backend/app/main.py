from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CalculationRequest(BaseModel):
    operation: str
    x: float
    y: float

@app.post("/calculate")
async def calculate(request: CalculationRequest):
    if request.operation == "add":
        result = request.x + request.y
    elif request.operation == "subtract":
        result = request.x - request.y
    elif request.operation == "multiply":
        result = request.x * request.y
    elif request.operation == "divide":
        if request.y == 0:
            return {"error": "Cannot divide by zero"}
        result = request.x / request.y
    else:
        return {"error": "Invalid operation"}
    
    return {"result": result}

@app.get("/")
async def root():
    return {"message": "Welcome to the Simple Calculator API"}