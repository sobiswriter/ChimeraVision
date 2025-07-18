# **App Name**: ChimeraVision

## Core Features:

- Chat Window: Display the ChatWindow, which includes the TitleBar, MessageList, and ChatInput components.
- Draggable Title Bar: Render the TitleBar component for window dragging and controls.
- Scrollable Message List: Render messages using MessageItem components in the MessageList, with automatic scrolling to the bottom on new messages.
- AI Avatar: Display an AI avatar next to AI-generated messages in the chat.
- Status Indicator: The LLM uses its tool to determine the appropriate status of the ai and then update its appearance in the UI
- AI Message Generation: AI generates the chat message to be displayed, which could be about the current game context, providing helpful suggestions to the user about gameplay strategy, or to socialize while playing

## Style Guidelines:

- Primary color: Deep slate gray (#2D3748) for the ChatWindow background, offering a sleek, dark aesthetic.
- Background color: Dark charcoal (#1A202C), a desaturated, darker variant of the primary color to provide contrast while maintaining the dark theme.
- Accent color: Electric blue (#3182CE) for user messages and interactive elements, providing a pop of color against the dark background.
- Body and headline font: 'Inter' sans-serif for a clean and modern feel, suitable for both headlines and body text within the chat interface.
- Use modern icons from lucide-react for window controls and chat input actions.
- Maintain a minimalist layout with rounded corners, subtle borders, and consistent padding throughout the chat window.
- Implement smooth fade-in animations for new messages and subtle scrolling animations for an engaging user experience.