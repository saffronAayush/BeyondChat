export const createAiSlice = (set) => ({
  aiConversation: [],
  currentConvId: null,

  setAiConversation: (data, convId) =>
    set((state) => {
      if (state.currentConvId !== convId) {
        return {
          aiConversation: [data],
          currentConvId: convId,
        };
      } else {
        return {
          aiConversation: [...state.aiConversation, data],
        };
      }
    }),

  resetAiConversation: () =>
    set(() => ({
      aiConversation: [],
      currentConvId: null,
    })),
});
