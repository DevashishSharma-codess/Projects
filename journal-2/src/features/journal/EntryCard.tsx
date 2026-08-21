import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { formatReadableDate } from "../../utils/dateUtils";
import "./EntryCard.css";

function cleanText(text) {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function EntryCard({ entry }) {
  const { deleteEntry } = useContext(AppContext);

  return (
    <Card className="entry-card">

      <div className="entry-card-header">

        <h4>{entry.title}</h4>

        <span>
          {formatReadableDate(entry.date)}
        </span>

      </div>

      <p className="entry-card-preview">
        {cleanText(entry.content)}
      </p>

      <div className="entry-card-footer">
        <Badge variant="secondary">
          #{entry.tag}
        </Badge>

        <button
          type="button"
          className="delete-entry-btn"
          onClick={() => deleteEntry(entry.id)}
        >
          Delete
        </button>
      </div>

    </Card>
  );
}