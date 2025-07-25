# ChimeraVision - AI Gaming Companion

ChimeraVision is a sleek, modern AI-powered chat overlay designed for gamers. It provides in-game assistance, strategy advice, and social messaging suggestions through an intuitive and non-intrusive interface. The UI is designed to feel like a native part of the gaming experience, featuring a minimalist launcher icon and a "frosted glass" chat window that animates smoothly over your game.

This project represents the frontend "puppet" of the application, designed to be controlled by a separate backend "puppeteer" (e.g., an Electron shell) for full integration.

## Features

- **Minimalist Launcher**: Starts as a small, unobtrusive launcher icon.
- **Animated Chat Interface**: The chat window opens and closes with smooth animations powered by Framer Motion.
- **Frosted Glass UI**: A beautiful, translucent design with a subtle blur effect that allows gamers to see the action behind the chat.
- **Dynamic & Responsive**: The UI is fully responsive and interactive.
- **Decoupled Architecture**: Designed to communicate with a backend via a simple API bridge, making it highly extensible.
- **AI-Powered**: Built to display messages and advice generated by a powerful AI backend using Genkit.

## Tech Stack

This project is built with a modern, production-ready tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your system.

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/chimeravision.git
    cd chimeravision
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can run the development server:

```sh
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Backend Integration

This UI is designed to be integrated into a larger host application (like Electron). It communicates with the backend through a `window.chimeraApi` object, which must be exposed by the host's preload script.

- **Sending Messages**: The UI sends user messages to the backend via `chimeraApi.sendUserMessage(text)`.
- **Receiving Messages**: The UI listens for new AI-generated messages from the backend via `chimeraApi.onNewMessage((message) => { ... })`.

All AI logic, timers, and proactive messages are handled by the backend, keeping the UI layer clean, fast, and focused on presentation.
