import { EditorProps } from "draft-js";

import { IFieldProps } from "../field/field.interface";

type TypeEditorPropsField = EditorProps & IFieldProps;

export interface IEditorField
  extends Omit<TypeEditorPropsField, "editorState"> {
  onChange: (...event: any[]) => void;
  value: string;
}
