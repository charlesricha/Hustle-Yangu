from backend.hustle_simulator import KibandaskiEngine

def test_engine():
    print("Testing Kibandaski Engine...")
    
    # Test 1: Get Hustles
    hustles = KibandaskiEngine.get_hustles("nairobi")
    print(f"Nairobi Hustles found: {len(hustles)}")
    assert len(hustles) > 0, "No hustles found for Nairobi"
    
    mtumba = hustles[0]
    print(f"Testing hustle: {mtumba.name} (ID: {mtumba.id})")
    
    # Test 2: Run Simulation Loop
    initial_capital = 10000
    current_capital = initial_capital
    
    kanjo_hits = 0
    stima_failures = 0
    iterations = 100
    
    print(f"\nRunning {iterations} turns...")
    for _ in range(iterations):
        result = KibandaskiEngine.run_turn(mtumba.id, current_capital)
        current_capital = result.capital_remaining
        if result.event == "kanjo_raid":
            kanjo_hits += 1
        elif result.event == "stima_kupotea":
            stima_failures += 1
            
    print(f"\nSimulation Report:")
    print(f"Initial Capital: {initial_capital}")
    print(f"Final Capital: {current_capital}")
    print(f"Kanjo Raids: {kanjo_hits} (Expected ~10)")
    print(f"Stima Failures: {stima_failures} (Expected ~20)")
    
    assert kanjo_hits > 0 or stima_failures > 0, "Warning: Random events seem too rare (might be luck, but checking logic)"
    print("\nTest passed successfully!")

if __name__ == "__main__":
    test_engine()
