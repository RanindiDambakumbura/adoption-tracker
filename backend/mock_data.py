import random
from datetime import datetime, timedelta

employees = [
    {"name": "Nadeesha", "team": "Sales"},
    {"name": "Ruwan", "team": "Sales"},
    {"name": "Ishara", "team": "Marketing"},
    {"name": "Kavindu", "team": "Marketing"},
    {"name": "Dilki", "team": "Ops"},
    {"name": "Sahan", "team": "Ops"},
    {"name": "Thilini", "team": "Support"},
    {"name": "Chamod", "team": "Support"},
]

def generate_usage_data():
    data = []
    today = datetime.now()

    for emp in employees:
        # each person gets a random "adoption tendency" so some look high, some low
        base_usage = random.randint(0, 5)
        weekly_uses = []

        for week in range(3):  # last 3 weeks
            week_date = today - timedelta(weeks=(2 - week))
            uses = max(0, base_usage + random.randint(-2, 3))
            weekly_uses.append({
                "week": week_date.strftime("%Y-%m-%d"),
                "uses": uses
            })

        data.append({
            "name": emp["name"],
            "team": emp["team"],
            "weekly_uses": weekly_uses
        })

    return data