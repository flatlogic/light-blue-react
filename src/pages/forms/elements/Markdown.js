import * as React from "react";
import { Button } from "reactstrap";
import MarkdownIt from "markdown-it";
import taskLists from "markdown-it-task-lists";
import s from "./Elements.module.scss";

export const markdown = new MarkdownIt({ html: false, linkify: true }).use(taskLists);

export default function MarkdownEditorComp() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState("write");
  const previewHtml = React.useMemo(() => markdown.render(value), [value]);

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
