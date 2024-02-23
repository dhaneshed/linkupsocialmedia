import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminViewUsers, blockTheUser, unBlockTheUser } from "../../Actions/Admin";
import { loadUser, logoutUser } from "../../Actions/User";

export default function UserList() {
  const { users } = useSelector((state) => state.adminUsers);

  const [data, setData] = useState([]);
  const [sortModel, setSortModel] = useState([]);
  const socket = useRef();
  const dispatch = useDispatch();
  const socketURL = ' https://link-up-mppk.onrender.com:4000';
  socket.current = io(socketURL);

  useEffect(() => {
    dispatch(adminViewUsers());
  }, [dispatch]);



  // // Update the data state when users data changes
  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };



  const handleBlockUser = async (id) => {
    await dispatch(blockTheUser(id));
    dispatch(adminViewUsers());
    dispatch(logoutUser());
    socket.current.emit('user-blocked', { userId: id });

  };




  const handleUnblockUser = async (id) => {

    await dispatch(unBlockTheUser(id));
    dispatch(loadUser());
    dispatch(adminViewUsers());

  };

  const getRowId = (row) => row._id; // Assuming `_id` is the unique property

  const columns = [
    {
      field: "name",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar.url} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "followers",
      headerName: "Followers",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">{params.row.followers.length}</div>
        );
      },
    },
    {
      field: "following",
      headerName: "Following",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">{params.row.following.length}</div>
        );
      },
    },
    {
      field: "posts",
      headerName: "Posts",
      width: 120,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.posts.length}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>

            {params.row.isBlocked ? (
              <button
                className="userListEdit"
                onClick={() => handleUnblockUser(params.row._id)}
              >
                Activate
              </button>
            ) : (
              <button
                className="userListDelete"
                onClick={() => handleBlockUser(params.row._id)}
              >
                Block
              </button>
            )}
          </>
        );
      },
    },
  ];

  const handleSortModelChange = (newModel) => {
    // Set the new sorting model
    setSortModel(newModel);
    // Sort the data accordingly
    const sortedData = [...data];
    newModel.forEach((model) => {
      const { field, sort } = model;
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        if (sort === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else if (sort === "desc") {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
        return 0;
      });
    });
    setData(sortedData);
  };

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={getRowId}
        pageSize={8}
        checkboxSelection
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
      />
    </div>
  );
}
