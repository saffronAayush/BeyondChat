export const createUiSlice = (set) => ({
  // Inbox visibility
  showInboxSection: false,
  setShowInboxSection: (data) => set(() => ({ showInboxSection: data })),

  // Add to composer
  addToComposer: false,
  toggelAddToComposer: () =>
    set((state) => ({ addToComposer: !state.addToComposer })),

  // AI section shrink toggle
  shrinkAiSection: false,
  setShrinkAiSection: (data) =>
    set(() => ({
      shrinkAiSection: data,
    })),
});
