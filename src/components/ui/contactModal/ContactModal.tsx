"use client";

import { useState } from "react";
import scss from "./contactModal.module.scss";
import { contactApi } from "@/api/api";

interface IContactModalProps {
  clientEmail: string;
  sellerEmail: string;
  onClose: () => void;
}

const ContactModal = ({
  clientEmail,
  sellerEmail,
  onClose,
}: IContactModalProps) => {
  const [message, setMessage] = useState(
    "Hi! I'm interested in this car. Is it still available?",
  );
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const response = await contactApi.post("/contact-seller", {
        clientEmail,
        sellerEmail,
        message: message.trim(),
      });

      if (!response.data) throw new Error();

      setSent(true);
      setTimeout(onClose, 1000);
    } catch {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.overlay} onClick={onClose}>
      <div className={scss.modal} onClick={(e) => e.stopPropagation()}>
        <button className={scss.close} onClick={onClose}>
          ×
        </button>

        <h2>Send message to seller</h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading || sent}
        />

        <button
          className={scss.send}
          onClick={handleSend}
          disabled={loading || sent || !message.trim()}
        >
          {sent ? "Message sent ✓" : loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
