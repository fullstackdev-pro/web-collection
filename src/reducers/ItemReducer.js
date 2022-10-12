import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../api";
import { toast } from "react-toastify";

export const slice = createSlice({
  name: "items",
  initialState: {
    items: [],
    itemsTotal: 0,
    current: false,
    itemToggle: false,
  },
  reducers: {
    get: (state, action) => {
      state.items = action.payload.object.items;
      state.itemsTotal = action.payload.object.total;
    },
    delete: (state, action) => {
      toast.success("Item Deleted");
    },
    post: (state, action) => {
      if (action.payload.details) {
        toast.warning(action.payload.details[0].message);
        state.itemToggle = false;
        state.current = !state.current;
      } else if (action.payload.message) {
        toast.warning(action.payload.message);
        state.itemToggle = false;
        state.current = !state.current;
      } else if (action.payload.savedItem) {
        toast.success("Item Saved");
        state.itemToggle = true;
        state.current = !state.current;
      }
    },
    update: (state, action) => {
      console.log(action.payload);
      if (action.payload.keyPattern?.title) {
        toast.warning("Title already is exist");
        state.itemToggle = false;
        state.current = !state.current;
      }
      if (action.payload.keyPattern?.email) {
        toast.warning("Email already is exist");
        state.itemToggle = false;
        state.current = !state.current;
      } else if (action.payload.updated) {
        console.log("update");
        toast.success("Item Updated");
        state.itemToggle = true;
        state.current = !state.current;
      }
    },
  },
});

export const getitems = () =>
  apiCall({
    url: `/item`,
    method: "get",
    onSuccess: slice.actions.get.type,
  });

export const getItemsSearch = (search, page) =>
  apiCall({
    url: `/item?page=${page}&limit=5&search=${search}`,
    method: "get",
    onSuccess: slice.actions.get.type,
  });

export const itemdelete = (id) =>
  apiCall({
    url: "/item/" + id,
    method: "delete",
    onSuccess: slice.actions.delete.type,
    onFail: slice.actions.delete.type,
  });

export const saveitems = (data) =>
  apiCall({
    url: "/item",
    method: "post",
    data,
    onSuccess: slice.actions.post.type,
    onFail: slice.actions.post.type,
  });

export const updateitems = (data) =>
  apiCall({
    url: "/item/" + data.id,
    method: "put",
    data,
    onSuccess: slice.actions.update.type,
    onFail: slice.actions.update.type,
  });

export default slice.reducer;
