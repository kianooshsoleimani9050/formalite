import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { MultiDropZoneViewType } from "./MultiDropZoneView.type";

const validation = Yup.object({
  title: Yup.array().of(Yup.mixed()).nullable(),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: [
    {
      preview: "https://picsum.photos/200",
      uid: "123",
    },
    {
      preview: "https://picsum.photos/200",
      uid: "1231",
    },
  ],
};

type TestMultiDropZoneViewProps = Omit<MultiDropZoneViewType, "type"> & {
  lang?: Language;
};

export const TestMultiDropZoneView = ({
  lang = "en",
  ...props
}: TestMultiDropZoneViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.MultiDropZoneView,
        ...props,
      },
    };
  }, [props]);

  return (
    <Formalite<ValidationType>
      lang={lang}
      formString={formString}
      initialValues={iniValues}
      validationSchema={validation}
      formRef={formRef}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
