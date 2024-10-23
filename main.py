# 백엔드
from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
import requests

app = FastAPI()

#진자템플릿
app.mount("/assets", StaticFiles(directory="assets"), name="assets")
#app.mount("/assets/css", StaticFiles(directory="assets/css"), name="assets")
#app.mount("/assets/js", StaticFiles(directory="assets/js"), name="js")
#app.mount("/assets/images", StaticFiles(directory="assets/images"), name="images")
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse('index.html', {"request": request})


@app.get("/quiz")
async def quiz(request: Request):
    return templates.TemplateResponse('quiz.html', {"request": request})

@app.get("/contact")
async def contact(request: Request):
    return templates.TemplateResponse('Contact.html', {"request": request})
