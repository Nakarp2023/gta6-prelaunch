import os, hmac, hashlib, json, time
from urllib.parse import parse_qsl
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GTA VI PRE-LAUNCH API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")

def verify(data: str):
    if not TOKEN or not data:
        return False
    values = dict(parse_qsl(data, keep_blank_values=True))
    received = values.pop("hash", None)
    auth_date = int(values.get("auth_date", "0"))
    if not received or abs(time.time() - auth_date) > 86400:
        return False
    secret = hmac.new(b"WebAppData", TOKEN.encode(), hashlib.sha256).digest()
    check = hmac.new(secret, "\n".join(f"{k}={v}" for k, v in sorted(values.items())).encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(check, received)

@app.get("/health")
def health():
    return {"ok": True, "service": "gta6-prelaunch-api"}

@app.get("/me")
def me(authorization: str | None = Header(default=None)):
    raw = authorization.removeprefix("tma ") if authorization else ""
    if not verify(raw):
        raise HTTPException(401, "Invalid Telegram initData")
    user = json.loads(dict(parse_qsl(raw))["user"])
    return {"user": user}
