import cn from "classnames";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { FC, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import styles from "./EditorField.module.scss";
import { IEditorField } from "./editorField.interface";

const EditorField: FC<IEditorField> = ({
  onChange,
  value,
  placeholder,
  error,
}): JSX.Element => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (!isUpdated) {
      const defaultValue = value ? value : "";
      const blockFromHtml = htmlToDraft(defaultValue);

      const contentState = ContentState.createFromBlockArray(
        blockFromHtml.contentBlocks,
        blockFromHtml.entityMap
      );

      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value, isUpdated]);

  const onEditorStateChange = (editorState: EditorState) => {
    setIsUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <div className={cn(styles.common, styles.editorField)}>
      <label>
        <span>{placeholder}</span>
        <div className={styles.wrapper}>
          <Editor
            toolbarClassName={styles.toolbar}
            editorClassName={styles.editor}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            spellCheck
            toolbar={{
              options: ["inline", "list"],
              inline: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["bold", "italic", "underline", "strikethrough"],
              },
              list: {
                inDropdown: false,
                options: ["unordered", "ordered"],
              },
            }}
          />
        </div>
        {error && <div className={styles.message}>{error.message}</div>}
      </label>
    </div>
  );
};

export default EditorField;
