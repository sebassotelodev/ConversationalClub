import { useEffect, useRef } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

export const Chat = ({ isVisible, onToggle }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    // Exponemos la función onToggle globalmente para poder usarla desde los estilos

    createChat({
      webhookUrl: `${process.env.NEXT_PUBLIC_KEYIA}`,
      webhookConfig: {
        method: "POST",
        headers: {},
      },
      target: "#n8n-chat",
      mode: "window",
      chatInputKey: "chatInput",
      chatSessionKey: "sessionId",
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: "en",
      initialMessages: [
        "Hello! 👋",
        "I'm Further's registration assistant for the Conversational Club.",
        "I'll help you secure your spot with Morgan Robinson!",
      ],
      i18n: {
        en: {
          title: "Conversational Club Registration",
          subtitle: "Let's get you registered with Morgan!",
          footer: "",
          getStarted: "Start Registration",
          inputPlaceholder: "Type your message here...",
        },
      },
      enableStreaming: false,
    });

    // Limpieza al desmontar el componente
    return () => {
      delete window.chatToggle;
    };
  }, [onToggle]);


  return (
    <>
      <style jsx global>{`
        :root {
          /* --- PALETA DE COLORES PERSONALIZADA --- */
          --chat--primary-dark: #112C3E;
          --chat--secondary-dark: #0C212D;
          --chat--accent-orange: #EE7203;
          --chat--accent-red: #FF3816;
          --chat--neutral-gray: #495463;
          --chat--pure-white: #FFFFFF;
          
          /* --- VARIABLES DE CHAT --- */
          --chat--color-primary: linear-gradient(135deg, var(--chat--primary-dark), var(--chat--secondary-dark));
          --chat--color-secondary: linear-gradient(135deg, var(--chat--accent-orange), var(--chat--accent-red));
          --chat--color-accent: var(--chat--accent-orange);
          --chat--message--bot--background: var(--chat--pure-white);
          --chat--message--bot--color: var(--chat--primary-dark);
          --chat--message--user--background:var(--chat--pure-white);
          --chat--message--user--color: var(--chat--primary-dark);
          --chat--color-dark: var(--chat--primary-dark);
          --chat--color-white: var(--chat--pure-white);
          --chat--color-gray: var(--chat--neutral-gray);
          --chat--color-light: rgba(255, 255, 255, 0.7);
          --chat--color-medium: rgba(255, 255, 255, 0.2);
          --chat--color-border: rgba(255, 255, 255, 0.15);

          /* --- DISEÑO --- */
          --chat--spacing: 20px;
          --chat--border-radius: 16px;
          --chat--window--width: 380px;
          --chat--window--height: 85vh;
          --chat--window--max-height: 600px;
          --chat--toggle--size: 60px;
          --chat--toggle--background: linear-gradient(135deg, var(--chat--accent-orange), var(--chat--accent-red));
          --chat--toggle--color: var(--chat--color-white);
          --chat--header--background: linear-gradient(135deg, var(--chat--primary-dark), var(--chat--secondary-dark));
          --chat--header--color: var(--chat--color-white);
          --chat--header--padding: 16px 20px;
          --chat--header--border-bottom: 1px solid var(--chat--color-border);
          --chat--heading--font-size: 1.1rem;
          --chat--subtitle--font-size: 0.85rem;
          --chat--message--padding: 12px 16px;
          --chat--message--font-size: 0.95rem;
          --chat--message--border-radius: 18px;
          --chat--message--user--border: none;
          --chat--message--bot--border: 1px solid rgba(17, 44, 62, 0.1);
        }

        
        }
      `}</style>

      <div ref={chatRef} id="n8n-chat"></div>
    </>
  );
};
