from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator, EmailStr
from typing import Annotated, List, Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


def to_objectid(v):
    if v is None:
        return None
    return str(v)


PyObjectId = Annotated[str, BeforeValidator(to_objectid)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self):
        data = self.model_dump(by_alias=True, exclude_none=True)
        return data

    @classmethod
    def from_mongo(cls, doc):
        return cls(**doc)


WELCOME_CODE = "GLOW10"


class Subscriber(BaseDocument):
    email: str
    source: str = "footer"
    welcome_code: str = WELCOME_CODE
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SubscriberCreate(BaseModel):
    email: str
    source: str = "footer"


class ContactMessage(BaseDocument):
    name: str
    email: str
    subject: str = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str


EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


@api_router.get("/")
async def root():
    return {"message": "Noor & Vaani API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/newsletter", response_model=Subscriber, response_model_by_alias=False)
async def subscribe(payload: SubscriberCreate):
    email = payload.email.strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=422, detail="Please enter a valid email address.")
    existing = await db.subscribers.find_one({"email": email})
    if existing:
        return Subscriber.from_mongo(existing)
    obj = Subscriber(email=email, source=payload.source)
    result = await db.subscribers.insert_one(obj.to_mongo())
    obj.id = str(result.inserted_id)
    return obj


@api_router.post("/contact", response_model=ContactMessage, response_model_by_alias=False)
async def contact(payload: ContactCreate):
    name = payload.name.strip()
    email = payload.email.strip().lower()
    message = payload.message.strip()
    if not name or not EMAIL_RE.match(email) or not message:
        raise HTTPException(status_code=422, detail="Please fill in a valid name, email and message.")
    obj = ContactMessage(name=name, email=email, subject=payload.subject.strip(), message=message)
    result = await db.contact_messages.insert_one(obj.to_mongo())
    obj.id = str(result.inserted_id)
    return obj


@api_router.get("/subscribers/count")
async def subscribers_count():
    n = await db.subscribers.count_documents({})
    return {"count": n}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
