import { BaseViewType, ViewTypes } from "@components/Formalite/Formalite.type";
import { SxProps, TextFieldProps } from "@mui/material";
import { DropzoneOptions } from "react-dropzone";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  CustomFile,
  ImageDownloaderPromise,
  OutsideFile,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import { FormikProps } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import { Theme } from "@mui/material/styles";

export interface TextDropZoneViewType extends BaseViewType {
  type: ViewTypes.TextDropZoneView;
  mustRegex?: RegExp;

  /**
   * Props that contain
   *
   * All props that can passed to MUI TextField component [MUI TextFieldProps](https://mui.com/material-ui/api/text-field/)
   *
   * @prop onChange > Callback will call when input value change (array)
   *
   * @prop dropZoneOptions > Specify props that passed to react-dropzone Dropzone component [react-dropzone Dropzone](https://react-dropzone.js.org/#src)
   * @see [TextDropZoneView docs](https://formalite-docs.novin.dev/?path=/docs/components-dropzoneview--text-drop-zone-view)
   */
  inputProps: Omit<TextFieldProps, "onChange"> & {
    /**
     * Callback will call when input value change (array)
     */
    onChange?: (value: string) => void;
    /**
     * Specify props that passed to react-dropzone Dropzone component
     * @see [react-dropzone Dropzone](https://react-dropzone.js.org/#src)
     */
    dropZoneOptions?: Partial<DropzoneOptions>;
  };

  /**
   * A callback function that runs when Upload occurred in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param file > The chosen file
   * @param progress > A callback that gives progress number in arg
   * @param uploadController > uploadController to connect to axios for auto abort
   */
  onUpload: (
    file: File,
    progress: (progress: number) => void,
    uploadController: AbortController
  ) => Promise<string | undefined>;

  /**
   * A callback function that runs when Delete occurred in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param id > id of selected item to be deleted
   * @param isFromDefault > Tells you that this is a new item or it's from the default value
   * @param isSuccess > Tells you delete was Success
   */
  onDelete: (
    id: string,
    isFromDefault: boolean,
    isSuccess: boolean
  ) => Promise<void>;

  /**
   * A callback function that must run when an image want to be downloded in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param pathUrl > The url of downloaded image
   * @param controller > A controller object that allows you to abort one or more DOM requests as and when desired.
   */
  imageDownloader?: (
    pathUrl: string,
    controller: AbortController
  ) => Promise<ImageDownloaderPromise>;

  /**
   * Choose that MultiDropZoneView shows preview
   */
  showPreview?: boolean;
}

export type TextDropZoneViewProps<T> = {
  allData: TextDropZoneViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
  translator: Function;
  formMustRegex?: RegExp;
};

export interface UploadTextFileProps extends DropzoneOptions {
  error?: boolean;
  files: (CustomFile | OutsideFile)[];
  showPreview: boolean;
  onRemove: (
    id: string,
    isFromDefault: boolean,
    isSuccess: boolean
  ) => Promise<void>;
  sx?: SxProps<Theme>;
  helperText?: ReactNode;
  setFile: Dispatch<SetStateAction<(CustomFile | OutsideFile)[]>>;
  setToFormik: (object: any) => void;
  uploadFunction: (item: CustomFile) => void;
}
