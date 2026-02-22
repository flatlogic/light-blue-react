import * as React from "react";
import { Button } from "reactstrap";
import * as Showdown from "showdown";
import s from "./Elements.module.scss";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export default function MarkdownEditorComp() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState("write");
  const previewHtml = React.useMemo(() => converter.makeHtml(value), [value]);

  return (
    <div className={s.markdownEditor}>
      <div className={s.markdownToolbar}>
        <Button
          color={selectedTab === "write" ? "primary" : "default"}
          size="sm"
          onClick={() => setSelectedTab("write")}
        >
          Write
        </Button>
        <Button
          color={selectedTab === "preview" ? "primary" : "default"}
          size="sm"
          onClick={() => setSelectedTab("preview")}
        >
          Preview
        </Button>
      </div>
      {selectedTab === "write" ? (
        <textarea
          className={`form-control ${s.markdownTextarea}`}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      ) : (
        <div
          className={s.markdownPreview}
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      )}
    </div>
  );
}
