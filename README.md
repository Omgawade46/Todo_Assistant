#  Todo Summary Assistant

A simple full-stack app to manage a todo list and summarize tasks using OpenRouter AI, then send the summary to Slack.

## Features

- Add, delete, and update todos
- Generate summaries with OpenRouter 
- Send summary to Slack via webhook
- Simple React frontend and Express backend


## Setup Instructions

### 1. Clone the repo

### 2. Install dependencies
# Backend
cd Backend
npm install

# Frontend
cd Frontend
cd to-do
npm install

### 3. Run the app
# Backend
cd Backend
npm start

# Frontend
cd Frontend
cd to-do
npm start


# Architecture & Design Decisions
## Tech Stack
Frontend: React + Axios for simple stateful UI and HTTP requests

Backend: Node.js + Express for REST API handling

LLM: OpenRouter to access modern LLMs like GPT

Messaging: Slack Webhooks to deliver summaries to a chosen Slack channel

## Design Decisions

Clear separation of frontend and backend

Stateless API design for scalability

Minimal styling using Tailwind-ready classnames

