import random
from typing import Dict, List, Optional
from pydantic import BaseModel

# Data Structures
class Hustle(BaseModel):
    id: str
    name: str
    min_capital: int
    risk_rate: float # 0.0 to 1.0 probability of specific hustle failure (downtime)? 
                     # Or used for Kanjo severity? 
                     # Let's use it as a multiplier for Kanjo probability? 
                     # Or base risk.
    profit_margin: int # Base profit per turn

class SimulationResult(BaseModel):
    profit: int
    event: Optional[str] = None
    message: str
    capital_remaining: int

# The Data
HUSTLE_DATA: Dict[str, List[Hustle]] = {
    "nairobi": [
        Hustle(id="mtumba", name="Kununua Mtumba", min_capital=5000, risk_rate=0.15, profit_margin=800),
        Hustle(id="samosa", name="Kuuza Samosa", min_capital=2000, risk_rate=0.05, profit_margin=300),
        Hustle(id="matatu", name="Matatu Driver", min_capital=50000, risk_rate=0.40, profit_margin=5000),
    ],
    "mombasa": [
        Hustle(id="mnazi", name="Kuuza Mnazi", min_capital=1500, risk_rate=0.10, profit_margin=400),
        Hustle(id="tuk-tuk", name="Tuk-Tuk Rider", min_capital=30000, risk_rate=0.20, profit_margin=2500),
    ],
    "kisumu": [
        Hustle(id="samaki", name="Kuuza Samaki", min_capital=3000, risk_rate=0.10, profit_margin=600),
    ],
    "nakuru": [
        Hustle(id="flamingo", name="Tour Guide", min_capital=0, risk_rate=0.05, profit_margin=1000),
    ]
}

class KibandaskiEngine:
    @staticmethod
    def run_turn(hustle_id: str, current_capital: int) -> SimulationResult:
        # Find hustle
        hustle = None
        for county in HUSTLE_DATA.values():
            for h in county:
                if h.id == hustle_id:
                    hustle = h
                    break
            if hustle: break
        
        if not hustle:
            return SimulationResult(profit=0, message="Hustle not found!", capital_remaining=current_capital)

        # Base Profit
        turn_profit = hustle.profit_margin

        # Random Events
        event = None
        message = f"You ran {hustle.name} successfully."

        # 20% Chance: Stima Kupotea (Blackout) -> No production
        if random.random() < 0.20:
            turn_profit = 0
            event = "stima_kupotea"
            message = "Stima imepotea! No business today. (Blackout)"
        
        # 10% Chance: Kanjo Raid -> Lose 50% of PROFIT (or capital? User said 'turn's profit' but losing capital is more realistic for raid?
        # User request: "losing 50% of the turn's profit". Okay, I'll follow that literally, but usually raids cost capital.
        # Wait, user said "losing 50% of the turn's profit".
        # If stima happens, profit is 0, so 50% of 0 is 0. Events should be mutually exclusive or sequential?
        # Let's make them independent.
        
        elif random.random() < 0.10:
            # Kanjo Raid
            penalty = int(turn_profit * 0.5)
            turn_profit -= penalty
            event = "kanjo_raid"
            message = f"Kanjo have raided! You bribed them with {penalty} KES. (50% profit loss)"

        new_capital = current_capital + turn_profit

        return SimulationResult(
            profit=turn_profit,
            event=event,
            message=message,
            capital_remaining=new_capital
        )

    @staticmethod
    def get_hustles(county_id: str) -> List[Hustle]:
        return HUSTLE_DATA.get(county_id.lower(), [])
