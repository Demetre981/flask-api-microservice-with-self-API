from sqlalchemy import Column, String, Date, Text, Time, Integer, create_engine, ForeignKey
from flask_login import UserMixin
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine("sqlite:///app.db?check_same_thread=False")
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


class User(UserMixin, Base):
    __tablename__ = "users"

    id = Column("id", Integer, primary_key=True)
    nickname = Column("nickname", String)
    password = Column("password", String)
    email = Column("email", String)

    def __init__(self, nickname, password, email):
        super().__init__()
        self.nickname = nickname
        self.password = password
        self.email = email

# user = User("user", "uasruaf@gamil.com", "pwd")

class Item(Base, UserMixin):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    name = Column(String(100), nullable=False)
    specialty = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    price = Column(Integer, nullable=False)
    experience = Column(Integer, nullable=False)
    score = Column(Integer, nullable=False)
    phone = Column(Integer, nullable=False)
    description = Column(Text(240), nullable=False)

    def __init__(self, title, price, experience, score, phone, name=name, specialty=specialty, email=email, description=description):
        super().__init__()
        self.title = title
        self.price = price
        self.experience = experience
        self.score = score
        self.phone = phone
        self.name = name
        self.specialty = specialty
        self.email = email
        self.description = description

Base.metadata.create_all(engine)
print("Done!")

