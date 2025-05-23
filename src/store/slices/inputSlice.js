export const createInputSlice = (set) => ({
  // AI Input
  textForAiInput: "",
  focusTriggerForAiInput: 0,
  setTextForAiInput: (text) =>
    set(() => ({
      textForAiInput: text,
      focusTriggerForAiInput: Date.now(),
    })),

  // Composer Input
  textForComposer: "",
  focusTrigger: 0,
  setTextComposer: (text) =>
    set(() => ({
      textForComposer: text,
      focusTrigger: Date.now(),
    })),
});
