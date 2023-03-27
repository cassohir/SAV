import { createContextId, useTask$ } from "@builder.io/qwik";

export type FormProps = {
    isOpen: boolean;
}


export const FormStateContext = createContextId<FormProps>("form-context");
