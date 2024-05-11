import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_ID, userRequest } from "../requestMethod";

export const getFriendRequests = createAsyncThunk(
  "getFriendRequest",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userRequest.get(`/user/get-friend-requests/${USER_ID}`);

      return res.data.data;
    } catch (error) {
      console.error(error);
      rejectWithValue(error);
    }
  }
);
export const rejectFriendRequest = createAsyncThunk(
  "rejectFriendRequest",
  async (data, { rejectWithValue }) => {
    try {
      await userRequest.delete(
        `/user/reject-friend-request/${USER_ID}/${data.friendRequestId}`
      );

      return data.friendRequestId;
    } catch (error) {
      console.error(error);
      rejectWithValue(error);
    }
  }
);
export const getConversations = createAsyncThunk(
  "getConversation",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userRequest.get(`/conversation/${USER_ID}`);
      return res.data;
    } catch (error) {
      console.error(error);
      rejectWithValue(error);
    }
  }
);
export const getMessages = createAsyncThunk(
  "getMessages",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userRequest.get(
        `/message/${USER_ID}/${data.conversationId}`
      );

      return { conversationId: data.conversationId, messages: res.data };
    } catch (error) {
      console.error(error);
      rejectWithValue(error);
    }
  }
);
export const sendMessages = createAsyncThunk(
  "sendMessages",
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      console.error(error);
      rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: {
    friendRequests: [],
    friends: [],
    conversations: [],
    messages: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFriendRequests.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = action.payload;
      })
      .addCase(getFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(rejectFriendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = state.friendRequests.filter(
          (data) => data._id !== action.payload
        );
      })
      .addCase(rejectFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(getConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
        state.error = null;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        const { conversationId } = action.payload;

        if (conversationId) {
          action.payload.conversationId = null;
          state.messages[conversationId] = action.payload.messages;
        }
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    builder
      .addCase(sendMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        const { conversationId } = action.payload;
        console.log(action.payload);
        if (conversationId) {
          if (!state.messages[conversationId]) {
            state.messages[conversationId] = []; // Initialize as an empty array if not exists
          }
          state.messages[conversationId] = [
            ...state.messages[conversationId],
            action.payload,
          ];
        }
        console.log(state.messages);
        state.error = null;
      })

      .addCase(sendMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;
