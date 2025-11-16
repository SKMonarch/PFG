from app.database.session import SessionLocal
from app.crud.user_crud import get_user_by_username, create_user
from app.core.hashing import hash_password

TEST_USERS = [
    {"username": "test1", "email": "test1@example.com", "password": "1234", "balance": 10000.0},
    {"username": "test2", "email": "test2@example.com", "password": "1234", "balance": 10000.0},
    {"username": "test3", "email": "test3@example.com", "password": "1234", "balance": 10000.0},
    {"username": "test4", "email": "test4@example.com", "password": "1234", "balance": 10000.0},
]

def seed():
    db = SessionLocal()
    try:
        from app.models.users import User
        for u in TEST_USERS:
            exists = db.query(User).filter_by(username=u["username"]).first()
            if not exists:
                hashed = hash_password(u["password"])
                user = User(username=u["username"], email=u["email"], hashed_password=hashed, balance=u["balance"])
                db.add(user)
                print(f"Creando usuario {u['username']}")
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
    print("Seed completado.")
