import "../userList/userList.css";
import { DataGrid} from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminReportPosts, adminUserPostDelete } from "../../Actions/Admin";
import { useAlert } from "react-alert";

export default function PostList() {
   const alert = useAlert();
  const { posts} = useSelector(
    (state) => state.reportPosts
  );
  console.log("Reported Posts in postList is......",posts);
  const [data, setData] = useState([]);
  const [sortModel, setSortModel] = useState([]);
  const dispatch = useDispatch();
 

    useEffect(() => {
    dispatch(adminReportPosts());
  }, [dispatch]);

    // // Update the data state when users data changes
    useEffect(() => {
      if (posts) {
        setData(posts);
      }

    }, [posts]);

  const handleDelete = async (userId,postId) => {
    try {

      await dispatch(adminUserPostDelete(userId,postId));
      dispatch(adminReportPosts());
      alert.success("Post Deleted");
      
    } catch (error) {

      console.log("Error deleting post:",error);
      
    }
    
  };

   

     const getRowId = (row) => row._id; // Assuming `_id` is the unique property

  
  const columns = [
    {
      field: "owner",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
             <img className="userListImg" src={params?.row?.owner.avatar.url} alt="" /> 
            {params?.row?.owner.name}
          </div>
        );
      },
    },
    { field: "caption", headerName: "Caption", width: 200 },
    {
      field: "image",
      headerName: "Post",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
                       <img className="userListImg" src={params?.row?.image.url} alt="" /> 
          </div>
        );
      },
    },
    {
      field: "likes",
      headerName: "Total Likes",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params?.row?.likes.length} 
          </div>
        );
      },
    },
    {
      field: "comments",
      headerName: "Total Comments",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params?.row?.comments.length}
          </div>
        );
      },
    },
    {
      field: "reports",
      headerName: "Total Reports",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params?.row?.reports.length} 
          </div>
        );
      },
    },
  
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.owner._id,params.row._id)}
            />
            
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
