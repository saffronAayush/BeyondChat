import { create } from "zustand";
import { createUiSlice } from "./slices/uiSlice";
import { createAiSlice } from "./slices/aiSlice";
import { createInputSlice } from "./slices/inputSlice";

export const useAppStore = create()((...a) => ({
  ...createInputSlice(...a),
  ...createUiSlice(...a),
  ...createAiSlice(...a),
}));
