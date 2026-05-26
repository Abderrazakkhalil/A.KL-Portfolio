# PoC — Physical Node Interface

Frictionless smartphone-to-physical-environment interaction demo.  
A phone scans a QR code at a physical station → selects an action → watches it process live → receives a digital receipt.

---

## Table of Contents

1. [Quick Start (Local)](#1-quick-start-local)
2. [Access from a Phone — Same Wi-Fi (LAN)](#2-access-from-a-phone--same-wi-fi-lan)
3. [Access from a Phone — Anywhere (ngrok)](#3-access-from-a-phone--anywhere-ngrok)
4. [Demo Flow](#4-demo-flow)
5. [QR Code Content](#5-qr-code-content)
6. [Tech Stack](#6-tech-stack)
7. [Project Structure](#7-project-structure)

---

## 1. Quick Start (Local)

```bash
# Install all dependencies from the project root
npm install

# Start both backend (port 3001) and frontend (port 5173) together
npm run dev
```

| Service        | URL                        |
|----------------|----------------------------|
| Frontend (UI)  | http://localhost:5173       |
| Backend API    | http://localhost:3001       |

---

## 2. Access from a Phone — Same Wi-Fi (LAN)

If your phone and your computer are on the **same Wi-Fi network**, no extra tools are needed.

1. Find your machine's local IP address:
   ```bash
   # Windows
   ipconfig
   # Look for "IPv4 Address" under your Wi-Fi adapter, e.g. 192.168.1.42
   ```

2. Open your frontend's `vite.config.js` and make sure it allows external connections (already set):
   ```js
   server: { host: true }
   ```

3. On your phone browser, navigate to:
   ```
   http://<YOUR_LAN_IP>:5173
   ```
   Example: `http://192.168.1.42:5173`

4. The backend WebSocket also runs on port `3001` on the same IP — the client connects automatically.

> **Tip:** Your LAN IP is printed in the server console when you run `npm run dev`.

---

## 3. Access from a Phone — Anywhere (ngrok)

Use **ngrok** to expose both the frontend and backend over the internet — ideal for demos on a different network or sharing with remote testers.

### Step 1 — Install ngrok

```bash
# Windows (with Chocolatey)
choco install ngrok

# Or download directly from https://ngrok.com/download and add to PATH
```

### Step 2 — Authenticate ngrok (one-time)

Sign up at https://ngrok.com, get your auth token, then run:

```bash
ngrok config add-authtoken <YOUR_NGROK_TOKEN>
```

### Step 3 — Start the project

```bash
npm run dev
```

### Step 4 — Expose the backend (port 3001)

Open a **new terminal** and run:

```bash
ngrok http 3001
```

Copy the generated HTTPS URL, e.g.:
```
https://a1b2c3d4.ngrok-free.app
```

### Step 5 — Point the frontend at the ngrok backend

Open `client/src/store.js` and replace the server URL with your ngrok backend URL:

```js
// Before
const SOCKET_URL = 'http://localhost:3001';

// After
const SOCKET_URL = 'https://a1b2c3d4.ngrok-free.app';
```

Restart the frontend (`Ctrl+C` then `npm run dev` again).

### Step 6 — Expose the frontend (port 5173)

Open **another new terminal**:

```bash
ngrok http 5173
```

Copy the second ngrok URL, e.g. `https://e5f6g7h8.ngrok-free.app`.

### Step 7 — Open on your phone

On any phone (no Wi-Fi restriction), open:
```
https://e5f6g7h8.ngrok-free.app
```

The phone will load the full app, communicate with the backend in real-time via WebSocket, and the complete demo flow works end-to-end. 🎉

> **Free tier limit:** ngrok free accounts allow 1 concurrent tunnel per session. You can run both tunnels by starting them in separate terminals; the free tier supports 2 tunnels with a registered account.

---

## 4. Demo Flow

| Step | Screen            | What happens                                                     |
|------|-------------------|------------------------------------------------------------------|
| 1    | **Scan**          | Scan a QR code with the phone camera or type a Station ID manually |
| 2    | **Action**        | Tap colored action buttons and set quantities                    |
| 3    | **Processing**    | Live progress bar driven by WebSocket events (~6 seconds)        |
| 4    | **Receipt**       | Thermal-style digital receipt with a QR code proof              |
| —    | **History**       | Swipe to see all past transactions stored in LocalStorage        |

---

## 5. QR Code Content

Generate a QR code (use any free QR generator) containing one of these plain-text Station IDs:

```
STATION_01
STATION_02
STATION_03
STATION_04
STATION_05
```

Point your phone camera at the QR code on the Scan screen to jump straight into the flow.

---

## 6. Tech Stack

| Layer      | Technology                             |
|------------|----------------------------------------|
| Frontend   | React 18, Vite, TailwindCSS, Zustand   |
| Animations | Framer Motion                          |
| Backend    | Node.js, Express, Socket.io            |
| State      | In-memory Map (server) + Zustand       |
| History    | LocalStorage (client)                  |
| Tunnel     | ngrok (for remote phone access)        |

---

## 7. Project Structure

```
PoC/
├── server/
│   ├── index.js          # Express + Socket.io server (port 3001)
│   └── package.json
├── client/
│   ├── src/
│   │   ├── main.jsx       # Entry point
│   │   ├── App.jsx        # Screen router
│   │   ├── store.js       # Zustand state + Socket.io client  ← set SOCKET_URL here for ngrok
│   │   ├── index.css      # Tailwind + global styles
│   │   └── screens/
│   │       ├── ScanScreen.jsx       # Step 1 — QR/NFC scan
│   │       ├── ActionScreen.jsx     # Step 2 — Action selection
│   │       ├── ProcessingScreen.jsx # Step 3 — Real-time tracking
│   │       ├── ReceiptScreen.jsx    # Step 4 — Digital receipt
│   │       └── HistoryScreen.jsx    # Transaction history
│   ├── index.html
│   ├── vite.config.js     # host: true — allows LAN/ngrok access
│   ├── tailwind.config.js
│   └── postcss.config.js
└── package.json           # Root orchestrator (concurrently)
```
