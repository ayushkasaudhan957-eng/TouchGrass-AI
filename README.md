# 🌿 TouchGrass AI

### AI that gets you **OFF the screen.**

TouchGrass AI is an open-AI-powered outdoor adventure platform that turns a short interaction with AI into a real-world activity.

Instead of building another AI application that encourages people to spend more time chatting with a screen, TouchGrass AI uses AI to create personalized outdoor missions, help users explore their surroundings, analyze nature discoveries, and track their outdoor progress.

> **The best AI interaction is the one that gets you to stop using AI.**

---

## 🏆 Built for: Touch Grass

TouchGrass AI was created around the idea that technology should sometimes help us **disconnect from technology**.

The project combines:

* 🤖 Open-weight AI
* 🌳 Outdoor activities
* 📸 AI-powered nature discovery
* 🎯 Personalized missions
* 🏆 Gamification
* 📖 Local outdoor journaling
* 🔒 Privacy-focused browser storage

The goal is simple:

**Use AI for a few seconds → go outside → explore the real world.**

---

# 🎯 The Problem

AI assistants are becoming increasingly good at keeping people inside screens.

We can ask AI to:

* write something
* explain something
* generate images
* answer questions
* entertain us
* recommend things

But there is another possibility:

> **What if AI could help us use our screens less?**

Many people want to:

* spend more time outdoors
* explore their surroundings
* walk more
* discover nature
* take breaks from screens
* find simple activities to do with friends

However, they often don't know **what to do once they go outside**.

TouchGrass AI solves this by turning AI into a **launchpad for real-world experiences**.

---

# 💡 The Solution

TouchGrass AI generates personalized outdoor missions based on:

* Available time
* Environment
* Mood
* Personal preferences
* Optional user instructions

For example, a user might choose:

```text
Time: 30 minutes
Environment: Park
Mood: Explore
```

TouchGrass AI could generate:

```text
🌿 THE MINI NATURE HUNT

Your mission:

1. Find three different types of leaves.
2. Walk for five minutes and notice three different sounds.
3. Find something with an interesting natural pattern.
4. Spend two minutes observing your surroundings
   without using your phone.

Estimated time: 30 minutes
Reward: +30 XP
```

The user then leaves the screen and completes the activity in the real world.

---

# ✨ Features

## 🤖 AI Adventure Generator

Users can create personalized outdoor missions using an open-weight AI model.

Users choose:

* ⏱️ Time available
* 🌳 Environment
* 🎯 Mood
* ✍️ Additional requirements

The AI then generates a customized outdoor adventure.

---

## 🌳 Multiple Environments

Users can select different environments:

* 🌳 Park
* 🌱 Garden
* 🏙️ City
* 🌍 Anywhere

This allows the AI to create activities that fit the user's surroundings.

---

## 🎯 Different Adventure Styles

Users can choose how they want to spend their time:

### 🔎 Explore

Discover things around you.

### 😌 Relax

Slow down and observe your surroundings.

### 🏃 Move

Focus on walking and physical activity.

### 🎨 Creative

Use your surroundings as inspiration for creative activities.

---

# ⏱️ Mission Mode

Once a mission starts, TouchGrass switches to a minimal mission screen.

The goal is intentional:

> **The website should become less interesting once the mission begins.**

A timer tracks the outdoor session while the user completes their mission.

The user can then return and mark the mission as completed.

---

# 📸 AI Nature Discovery

Users can upload a photo of something they discovered outdoors.

For example:

```text
User
 ↓
Takes photo of a leaf
 ↓
Uploads photo
 ↓
AI analyzes image
 ↓
Possible identification
 ↓
Description
 ↓
Interesting fact
```

The system uses a vision-capable open model through Hugging Face Inference Providers.

The AI is instructed not to invent a precise species when it cannot reliably identify something.

---

# 🏆 XP & Gamification

Every completed mission rewards the user with XP.

Example:

```text
Mission completed
       ↓
    +30 XP
       ↓
Progress updated
       ↓
Journal updated
```

The application tracks:

* ⭐ XP
* 🌿 Completed missions
* 🔥 Streak
* 📖 Outdoor journal

This encourages users to continue exploring instead of continuously using the application.

---

# 📖 Outdoor Journal

Completed missions are stored locally in the browser.

Example:

```text
October 9

🌿 The Mini Nature Hunt
30 minutes

+30 XP
```

The journal allows users to look back at their outdoor activities without requiring an account.

---

# 🔒 Privacy

Privacy is an important part of the project.

The outdoor journal and progress information are stored using:

```text
localStorage
```

This means the application does not require a database or user account for basic progress tracking.

The AI API key is also **not placed inside the frontend JavaScript**.

Instead:

```text
Browser
   ↓
Node.js server
   ↓
Hugging Face
```

The Hugging Face token is stored as an environment variable.

This prevents the secret API token from being exposed directly in the client-side code.

---

# 🤖 Why Open AI / Open-Weight Models?

The project was intentionally designed around open-weight AI instead of building the entire experience around a proprietary AI provider.

The AI model can be changed without rebuilding the entire application.

For example:

```text
TouchGrass
     │
     ▼
AI API Layer
     │
     ├── Model A
     ├── Model B
     └── Model C
```

This makes the AI layer modular.

Open models also provide more flexibility for experimentation, model swapping, customization, and future self-hosting.

The project currently uses Hugging Face Inference Providers to access open models without requiring users to download or run a model locally.

---

# 🧠 Why Not Ollama?

TouchGrass AI intentionally does not require users to install:

* Ollama
* LM Studio
* A local LLM
* Large model files
* Python AI environments

The application can communicate with hosted open models through the Hugging Face inference layer.

This makes the project much easier for a normal user to try.

---

# 🏗️ Architecture

```text
                     ┌──────────────────────┐
                     │      USER            │
                     │                      │
                     │  Selects adventure   │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │   HTML / CSS / JS    │
                     │      Frontend        │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │    Node.js Server    │
                     │     API Layer        │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │ Hugging Face Router  │
                     │                      │
                     │ Open-weight models   │
                     └──────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
             Text Generation          Image Analysis
                    │                       │
                    ▼                       ▼
              AI Mission              Nature Discovery
```

---

# 🛠️ Tech Stack

## Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* LocalStorage
* Browser File API

## Backend

* Node.js
* Express.js
* REST API

## AI

* Hugging Face Inference Providers
* Open-weight language model
* Vision-language model

## Storage

No traditional database is required for the current version.

The application uses:

```text
Browser LocalStorage
```

for:

* XP
* Completed missions
* Journal
* Theme preference

---

# 📁 Project Structure

```text
touchgrass-ai/
│
├── index.html
├── style.css
├── app.js
│
├── README.md
│
└── server/
    │
    ├── server.js
    ├── package.json
    └── .env
```

### `index.html`

Contains the main website structure and UI.

### `style.css`

Contains:

* Layout
* Responsive design
* Buttons
* Cards
* Dark mode
* Mobile styling
* Mission UI

### `app.js`

Handles:

* User selections
* AI requests
* Mission rendering
* Timer
* XP
* Journal
* LocalStorage
* Image upload
* Theme switching

### `server/server.js`

Handles:

* AI API requests
* Hugging Face authentication
* Text generation
* Image analysis

### `server/.env`

Stores the private Hugging Face API token.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/touchgrass-ai.git
```

Move into the project:

```bash
cd touchgrass-ai
```

---

# 2. Install backend dependencies

Go inside the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

---

# 3. Create a Hugging Face Access Token

Create a Hugging Face account and generate an access token with the required inference permissions.

Then create:

```text
server/.env
```

Add:

```env
HF_TOKEN=hf_your_token_here
```

### Important

Never commit your `.env` file to GitHub.

Add this to `.gitignore`:

```text
.env
node_modules/
```

---

# 4. Start the server

Inside the `server` directory:

```bash
npm start
```

The server should start on:

```text
http://localhost:3000
```

Open that address in your browser.

---

# 🔐 Environment Variables

The application requires:

```env
HF_TOKEN=your_huggingface_token
```

The token is intentionally stored on the backend instead of the frontend.

Do not write:

```javascript
const HF_TOKEN = "hf_xxxxxxxxx";
```

inside `app.js`.

That would expose the secret to anyone who opens the website.

---

# 🔄 How the AI Flow Works

## Mission Generation

```text
User chooses:
      │
      ├── Time
      ├── Environment
      ├── Mood
      └── Extra instructions
              │
              ▼
        JavaScript
              │
              ▼
        /api/ai
              │
              ▼
       Node.js Server
              │
              ▼
     Hugging Face Router
              │
              ▼
       Open-weight AI
              │
              ▼
       Generated JSON
              │
              ▼
       TouchGrass UI
```

---

# 📸 Image Analysis Flow

```text
User takes a photo
        │
        ▼
Photo uploaded
        │
        ▼
Browser converts image
        │
        ▼
/api/analyze-image
        │
        ▼
Node.js
        │
        ▼
Vision AI model
        │
        ▼
Nature identification
        │
        ▼
Result displayed
```

---

# 🧪 Example AI Prompt

The mission generator receives instructions similar to:

```text
You are TouchGrass AI.

Create a safe outdoor mission.

Time:
30 minutes

Environment:
Park

Mood:
Explore

The user should spend most of the
time outside rather than looking
at the screen.

Return exactly four practical tasks.
```

The AI returns structured information:

```json
{
  "title": "The Mini Nature Hunt",
  "intro": "Explore your surroundings...",
  "tasks": [
    "Find three different leaves.",
    "Notice five different sounds.",
    "Find an interesting natural pattern.",
    "Spend two minutes observing quietly."
  ]
}
```

---

# 📱 Responsive Design

TouchGrass AI is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

The interface automatically adapts to smaller screens.

---

# 🌙 Dark Mode

The website includes a built-in dark mode.

The user's preference is saved locally.

```text
Light Mode
     ↕
Dark Mode
```

No account is required.

---

# 🔒 Privacy by Design

TouchGrass AI intentionally avoids requiring an account for its core features.

Current local data includes:

```text
XP
Completed missions
Journal entries
Theme preference
```

These are stored locally in the browser.

This means the basic outdoor history does not need to be uploaded to a centralized database.

---

# 🌍 Why This Project Matters

Technology is usually designed to increase engagement.

More:

```text
Clicks
Messages
Notifications
Screen time
```

TouchGrass AI takes the opposite approach.

The success metric isn't:

> "How long did the user stay on the website?"

Instead:

> **"Did the website successfully get the user outside?"**

This changes the role of AI from an attention-consuming tool into an **attention-releasing tool**.

---

# 🌱 Design Philosophy

TouchGrass AI follows three principles.

### 1. AI should be the shortest part

The user should interact with AI briefly.

Then they should leave the screen.

---

### 2. The real world is the interface

The actual experience happens:

* In parks
* In gardens
* On walks
* Around the city
* With friends
* In nature

---

### 3. Technology should know when to get out of the way

A good AI product doesn't always need to keep the user engaged.

Sometimes the best result is:

```text
AI → User → Real World
```

rather than:

```text
AI → User → AI → User → AI → User
```

---

# 🚧 Current Limitations

The current version has some limitations.

### AI availability

Hosted inference depends on the availability and limits of the selected inference provider.

### Image identification

AI image recognition is not guaranteed to identify every plant, animal, or object correctly.

The application therefore asks the model not to claim a precise identification when it is uncertain.

### Local journal

The journal currently uses browser LocalStorage.

Clearing browser storage can remove the saved journal.

### Location

The current version does not require continuous GPS tracking.

This is intentional to keep the first version privacy-friendly.

---

# 🔮 Future Improvements

Possible future versions could include:

### 🗺️ Outdoor Route Builder

Generate walking routes based on:

* Distance
* Time
* Parks
* Nature
* Difficulty

---

### 🐦 Bird Identifier

Take a picture or record a bird call and identify the species.

---

### 🌱 Plant Identifier

Use computer vision to identify plants and provide educational information.

---

### 🌦️ Weather-Aware Missions

Generate activities based on current weather conditions.

---

### 👥 Friend Missions

Allow friends to complete the same challenge together.

---

### 🏆 Global Challenges

Examples:

```text
7-Day Touch Grass Challenge

30-Minute Walking Challenge

Weekend Nature Hunt

Sunset Observation Challenge
```

---

### 📱 PWA Support

Turn the website into an installable Progressive Web App.

This would make TouchGrass feel more like a native mobile application.

---

### 🧠 Local AI

A future version could optionally support local inference using technologies such as:

* WebGPU
* WebLLM
* Transformers.js
* Ollama

This would provide a second mode where users can run compatible models without sending prompts to a remote inference provider.

---

# 🤝 Contributing

Contributions are welcome.

If you want to improve TouchGrass AI:

```bash
git clone YOUR_REPOSITORY
```

Create a branch:

```bash
git checkout -b feature/new-feature
```

Make your changes and test them.

Then:

```bash
git add .
git commit -m "Add new outdoor feature"
git push origin feature/new-feature
```

Open a Pull Request.

---

# 📜 License

This project can be released under the MIT License.

The MIT License allows others to:

* Use the project
* Modify it
* Distribute it
* Build upon it

while retaining the original license notice.

---

# 🙌 Inspiration

TouchGrass AI was inspired by a simple question:

> **What if AI could help us spend less time with AI?**

Instead of making another assistant that waits for the next prompt, TouchGrass AI gives the user a reason to put the phone down.

---

# 🌿 Final Idea

```text
        ASK AI
           │
           ▼
     GET A MISSION
           │
           ▼
       PUT PHONE
          DOWN
           │
           ▼
       GO OUTSIDE
           │
           ▼
        EXPLORE
           │
           ▼
       COME BACK
           │
           ▼
     RECORD DISCOVERY
           │
           ▼
       EARN XP
           │
           ▼
     DO IT AGAIN 🌿
```

### TouchGrass AI

**Less screen. More world.**

---

## Built With

**HTML • CSS • JavaScript • Node.js • Express • Hugging Face • Open-Weight AI**

⭐ If you like the idea, consider starring the repository.
