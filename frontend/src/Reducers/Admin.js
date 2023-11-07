import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  
};

export const adminReducer = createReducer(initialState,{
  AdminLoginRequest: (state) => {
    state.loading = true;
    state.isAdminAuthenticated = false;
  },
  AdminLoginSuccess: (state, action) => {
    state.loading = false;
    state.admin = action.payload;
    state.isAdminAuthenticated = action.payload!==undefined && action.payload!==null;
  },
  AdminLoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAdminAuthenticated = false;
  },

  LoadAdminRequest: (state) => {
    state.loading = true;
  },
  LoadAdminSuccess: (state, action) => {
    state.loading = false;
    state.admin = action.payload;
    state.isAdminAuthenticated = true;
  },
  LoadAdminFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAdminAuthenticated = false;
  },

  AdminRegisterRequest: (state) => {
    state.loading = true;
  },
  AdminRegisterSuccess: (state, action) => {
    state.loading = false;
    state.admin = action.payload;
    state.isAdminAuthenticated = true;
  },
  AdminRegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAdminAuthenticated = false;
  },
  
  LogoutAdminRequest: (state) => {
    state.loading = true;
  },
  LogoutAdminSuccess: (state) => {
    state.loading = false;
    state.admin = null;
    state.isAdminAuthenticated = false;
  },
  LogoutAdminFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAdminAuthenticated = true;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});

export const adminUsersReducer = createReducer(initialState, {
  adminViewUsersRequest: (state) => {
    state.loading = true;
  },
  adminViewUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  adminViewUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const adminReportPostsReducer = createReducer(initialState, {
  adminReportPostsRequest: (state) => {
    state.loading = true;
  },
  adminReportPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  adminReportPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const adminUserProfileReducer = createReducer(initialState, {
  adminUserProfileRequest: (state) => {
    state.loading = true;
  },
  adminUserProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  adminUserProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});