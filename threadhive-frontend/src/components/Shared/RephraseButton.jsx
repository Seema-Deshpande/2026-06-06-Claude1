import { useState } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import { rephraseText } from "../../services/aiService.js";

export default function RephraseButton({ text, onAccept, endpoint }) {
  const [rephrasing, setRephrasing] = useState(false);
  const [rephrasedText, setRephrasedText] = useState(null);
  const [rephraseError, setRephraseError] = useState(null);

  const handleRephrase = async () => {
    if (!text?.trim()) return;
    setRephrasing(true);
    setRephraseError(null);
    setRephrasedText(null);
    try {
      const result = await rephraseText(text, endpoint);
      setRephrasedText(result);
    } catch {
      setRephraseError("Failed to rephrase. Please try again.");
    } finally {
      setRephrasing(false);
    }
  };

  const handleAccept = () => {
    onAccept(rephrasedText);
    setRephrasedText(null);
  };

  const handleReject = () => {
    setRephrasedText(null);
    setRephraseError(null);
  };

  return (
    <div className="mt-1">
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={handleRephrase}
        disabled={!text?.trim() || rephrasing}
        className="mt-1"
      >
        {rephrasing ? (
          <>
            <Spinner animation="border" size="sm" className="me-1" />
            Rephrasing...
          </>
        ) : (
          <><span>✦</span> Rephrase with AI</>
        )}
      </Button>

      {rephraseError && (
        <Alert variant="danger" className="mt-2 py-2 mb-0">
          {rephraseError}
        </Alert>
      )}

      {rephrasedText && (
        <Alert variant="info" className="mt-2 mb-0">
          <div className="mb-2" style={{ whiteSpace: "pre-wrap" }}>{rephrasedText}</div>
          <div className="d-flex gap-2">
            <Button size="sm" variant="primary" onClick={handleAccept}>
              Accept
            </Button>
            <Button size="sm" variant="outline-secondary" onClick={handleReject}>
              Reject
            </Button>
          </div>
        </Alert>
      )}
    </div>
  );
}
