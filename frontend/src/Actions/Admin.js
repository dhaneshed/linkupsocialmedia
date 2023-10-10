import {AdminApi} from "../api/AdminApi";

export const loginAdmin = (email, password) => async (dispatch) => {
  console.log("Reached login Admin");
  try {
    dispatch({
      type: "AdminLoginRequest",
    });

    const { data } = await AdminApi.post(
      "/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(" Admin data is", data);

    dispatch({
      type: "AdminLoginSuccess",
      payload: data.admin,
    });
  } catch (error) {
    dispatch({
      type: "AdminLoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadAdminRequest",
    });
    const { data } = await AdminApi.get("/me");

    dispatch({
      type: "LoadAdminSuccess",
      payload: data.admin,
    });
  } catch (error) {
    dispatch({
      type: "LoadAdminFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutAdminRequest",
    });

    await AdminApi.get("/logout");

    dispatch({
      type: "LogoutAdminSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutAdminFailure",
      payload: error.response.data.message,
    });
  }
};

export const adminViewUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminViewUsersRequest",
    });
    const { data } = await AdminApi.get(`/users`);
    console.log("User data is.....",data);

    dispatch({
      type: "adminViewUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "adminViewUsersFailure",
      payload: error.response.data.message,
    });
  }
};

export const blockTheUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "blockTheUserRequest",
    });

    const { data } = await  AdminApi.put(`/block/${id}`);
    dispatch({
      type: "blockTheUserSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "blockTheUserFailure",
      payload: error?.response?.data?.message,
    });
  }
};

export const unBlockTheUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "unBlockTheUserRequest",
    });

    const { data } = await  AdminApi.put(`/activate/${id}`);
    dispatch({
      type: "unBlockTheUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "unBlockTheUserFailure",
      payload: error.response.data.message,
    });
  }
};



export const adminReportPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminReportPostsRequest",
    });
    const { data } = await AdminApi.get(`/posts`);
    console.log(" Reported Post data in UserApi is.....",data);

    dispatch({
      type: "adminReportPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "adminReportPostsFailure",
      payload: error.response.data.message,
    });
  }
};
export const adminUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "adminUserProfileRequest",
    });

    const { data } = await AdminApi.get(`/user/${id}`);
    dispatch({
      type: "adminUserProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "adminUserProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const adminUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "adminUserPostsRequest",
    });

    const { data } = await AdminApi.get(`/userposts/${id}`);
    console.log("adminUserPosts data",data);
    dispatch({
      type: "adminUserPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "adminUserPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const adminUserPostDelete = (userId,postId) => async (dispatch) => {
  try {
    dispatch({
      type: "adminUserPostDeleteRequest",
    });
    
    const { data } = await AdminApi.delete(`/post/${userId}/${postId}`);
    dispatch({
      type: "adminUserPostDeleteSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "adminUserPostDeleteFailure",
      payload: error.response.data.message,
    });
  }
};

