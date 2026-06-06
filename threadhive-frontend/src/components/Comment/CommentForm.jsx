import { Card, Form, Button } from "react-bootstrap";
import RephraseButton from "../Shared/RephraseButton.jsx";
import { COMMENT_API } from "../../config/apiConfig.js";
import './CommentForm.css';

export default function CommentForm({ commentText, onCommentChange, onPostComment, disabled }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onPostComment) {
      onPostComment();
    }
  };

  return (
    <Card className="add-comment-section mb-4 border-0">
      <Card.Body>
        <h5 className="add-comment-title">Add a Comment</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="commentTextarea" className="mb-2">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Write a comment..."
              value={commentText}
              onChange={onCommentChange}
              required
              className="comment-textarea"
            />
          </Form.Group>

          <RephraseButton
            text={commentText}
            onAccept={(rephrased) => onCommentChange({ target: { value: rephrased } })}
            endpoint={COMMENT_API.REPHRASE}
          />

          <Button
            variant="primary"
            type="submit"
            disabled={disabled || !commentText?.trim()}
            className="post-comment-btn mt-3"
          >
            📝 Post Comment
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
