from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from hustle_simulator import KibandaskiEngine, Hustle

app = FastAPI(title="The Ultimate Hustle Map API")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TurnRequest(BaseModel):
    hustle_id: str
    current_capital: int

@app.get("/")
def read_root():
    return {"message": "Karibu to the Kibandaski Engine"}

@app.get("/health")
def health_check():
    return {"status": "poa sana"}

@app.get("/hustles/{county_id}", response_model=list[Hustle])
def get_hustles(county_id: str):
    return KibandaskiEngine.get_hustles(county_id)

@app.post("/simulate")
def simulate_turn(request: TurnRequest):
    return KibandaskiEngine.run_turn(request.hustle_id, request.current_capital)

# Story Mode Placeholder
@app.post("/share_riba")
def share_riba(story: dict):
    return {"message": "Riba recorded! (Simulation only for now)"}
