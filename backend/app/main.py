from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import ai_routes

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Willy Chat API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)