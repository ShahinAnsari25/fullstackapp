import React from "react";
import { useState, useEffect } from "react";
import PersonalDetails from "./PersonDetails";
import Edit from "./Edit";
import Delete from "./Delete";
import AddMember from "./AddMember";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

//Locally stored dummy data
const demoData = [
  {
    img: "/image1.webp",
    name: "John Doe",
    status: "Inactive",
    email: "john@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@John",
    role: "frontend Developer",
    DOB: "22/09/1992",
    gender: "Male",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "johnwork@gmail.com",
  },
  {
    img: "/image2.webp",
    name: "Lucas Murphy",
    status: "Active",
    email: "Lucas@example.com",
    team: "Design Product Technology Sales",
    userID: "@Lucas",
    role: "backend Developer",
    DOB: "22/09/1992",
    gender: "Female",
    nationality: "Indian",
    contact: "9786371639",
    workEmail: "Lucaswork@gmail.com",
  },
  {
    img: "/image3.webp",
    name: "Noah Harrison",
    status: "Inactive",
    email: "Noah@example.com",
    team: "Design Technology Marketing Product Sales",
    userID: "@Noah",
    role: "frontend Developer",
    DOB: "22/09/1992",
    gender: "Male",
    nationality: "Canadian",
    contact: "9725991639",
    workEmail: "Noahwork@gmail.com",
  },
  {
    img: "/image4.webp",
    name: "Olivia Bennett",
    status: "Inactive",
    email: "john@example.com",
    team: "Technology Product Marketing Sales",
    userID: "@Olivia",
    role: "frontend Developer",
    DOB: "22/09/1992",
    gender: "Female",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Oliviawork@gmail.com",
  },
  {
    img: "/image5.webp",
    name: "Sophia Mitchell",
    status: "Active",
    email: "Sophia@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Sophia",
    role: "Product Manager",
    DOB: "22/09/1992",
    gender: "Female",
    nationality: "Canadian",
    contact: "9722371639",
    workEmail: "Sophiawork@gmail.com",
  },
  {
    img: "/image6.webp",
    name: "Ava Cooper",
    status: "Inactive",
    email: "Ava@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Ava",
    role: "frontend Developer",
    DOB: "22/09/1992",
    gender: "Female",
    nationality: "Canadian",
    contact: "9853716393",
    workEmail: "Ava@gmail.com",
  },
  {
    img: "/image7.webp",
    name: "Mason Sullivan",
    status: "Active",
    email: "mason@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Mason",
    role: "backend Developer",
    DOB: "22/09/1999",
    gender: "Female",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Masonwork@gmail.com",
  },
  {
    img: "/image8.jpg",
    name: "Isabella Foster",
    status: "Inactive",
    email: "Isabella@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Isabella",
    role: "frontend Developer",
    DOB: "22/09/2000",
    gender: "Male",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Isabella@gmail.com",
  },
  {
    img: "/image9.jpg",
    name: "Liam Brooks",
    status: "Inactive",
    email: "Liam@example.com",
    team: "Design Technology Marketing Sales",
    userID: "@Liam",
    role: "Product Designer",
    DOB: "22/09/1982",
    gender: "Male",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Liam@gmail.com",
  },
  {
    img: "/image10.jpg",
    name: "Harper Morgan",
    status: "Active",
    email: "Harper@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Harper",
    role: "Product Manager",
    DOB: "22/09/1992",
    gender: "Male",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Harper@gmail.com",
  },
  {
    img: "/image11.jpg",
    name: "Mia Richardson",
    status: "Active",
    email: "Mia@example.com",
    team: "Design Technology Marketing Sales",
    userID: "@Mia",
    role: "frontend Developer",
    DOB: "22/09/1995",
    gender: "Female",
    nationality: "Canadian",
    contact: "9725875639",
    workEmail: "MiaWork@gmail.com",
  },
  {
    img: "/image12.jpg",
    name: "William Hayes",
    status: "Inactive",
    email: "William@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@William",
    role: "frontend Developer",
    DOB: "22/09/1992",
    gender: "Male",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Williamwork@gmail.com",
  },
  {
    img: "/image13.jpg",
    name: "Liam Brooks",
    status: "Inactive",
    email: "Liam@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Liam",
    role: "frontend Developer",
    DOB: "22/09/1992",
    gender: "Male",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Liamwork@gmail.com",
  },
  {
    img: "/image14.jpg",
    name: "James Kelly",
    status: "Inactive",
    email: "James@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@James",
    role: "Product designer",
    DOB: "22/09/1992",
    gender: "Female",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Jameswork@gmail.com",
  },
  {
    img: "/image15.jpg",
    name: "Charlotte Gray",
    status: "Active",
    email: "Charlotte@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Charlotte",
    role: "Product Manager",
    DOB: "22/09/1992",
    gender: "Female",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Charlotte@gmail.com",
  },
  {
    img: "/image16.jpg",
    name: "Alexander Parker",
    status: "Inactive",
    email: "Alexander@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Alexander",
    role: "Product Manager",
    DOB: "22/09/1992",
    gender: "Female",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Alexanderwork@gmail.com",
  },
  {
    img: "/image18.jpg",
    name: "Abigail Reed",
    status: "Inactive",
    email: "Abigail@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Abigail",
    role: "backend Developer",
    DOB: "22/09/1992",
    gender: "Male",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Abigailwork@gmail.com",
  },
  {
    img: "/image19.jpg",
    name: "Elijah Campbell",
    status: "Inactive",
    email: "Elijah@example.com",
    team: "Design Product Marketing Technology Sales",
    userID: "@Elijah",
    role: "frontend Developer",
    DOB: "22/09/1992",
    gender: "Female",
    nationality: "Canadian",
    contact: "9725371639",
    workEmail: "Elijahwork@gmail.com",
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    id: "name", // Adding an explicit id
    header: "Name",
    meta: {
      className: "", // Remove right padding
    },
    cell: (info) => {
      const { name, userID, img } = info.row.original;

      return (
        <div className="flex gap-2">
          <img
            src={img}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          />
          <div className="">
            <p className="font-semibold m-0">{name}</p>
            <p className="text-sm m-0 mt-1">{userID}</p>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("status", {
    id: "status", // Adding an explicit id
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const isActive = status === "Active";
      return (
        <div className="flex items-center p-1 border border-customLightGray rounded-lg bg-white">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-1 ml-1 ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          {status}
        </div>
      );
    },
  }),
  columnHelper.accessor("role", {
    id: "role", // Adding an explicit id
    header: "Role",
    filterFn: (row, columnId, filterValue) => {
      //fgfhdhttrt
      return row
        .getValue(columnId)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  }),
  columnHelper.accessor("email", {
    id: "email", // Adding an explicit id
    header: "Email",
  }),
  columnHelper.accessor("team", {
    id: "team", // Adding an explicit id
    header: "Team",
    cell: (info) => (
      <div className="flex gap-2 flex-wrap">
        {info
          .getValue()
          .split(" ")
          .map((word, index, arr) => {
            if (index < 3) {
              return (
                <span
                  key={index}
                  className={`px-2 py-1 border rounded-2xl ${
                    word === "Design"
                      ? "border-designBorder text-designText bg-designBG"
                      : word === "Product"
                      ? "border-productBorder text-productText bg-productBG"
                      : word === "Marketing"
                      ? "border-MarketingBorder text-MarketingText bg-MarketingBG"
                      : "border-otherBorder text-deleteEdit bg-otherBG"
                  }`}
                >
                  {word}
                </span>
              );
            } else if (index === 3) {
              return (
                <span
                  key={index}
                  className="px-2 py-1 border rounded-2xl border-otherBorder text-deleteEdit bg-otherBG"
                >
                  +{arr.length - 3}
                </span>
              );
            } else {
              return null;
            }
          })}
      </div>
    ),
    filterFn: (row, columnId, filterValue) => {
      //fgfhdhttrt
      return row
        .getValue(columnId)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
    enableSorting: false, // Disable sorting for the "Team" column
  }),
];

const PeopleDirectory = () => {
  //setting state for data
  const [data, setData] = useState(demoData);
  //state for column vise filter
  const [columnFilters, setColumnFilters] = React.useState([]);
  //state for sorting
  const [sorting, setSorting] = React.useState([]);
  //state for pagination
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  //filtering two column role and team
  const [filters, setFilters] = React.useState({
    role: "",
    team: "",
  });
  //state for global filter
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
      pagination,
      globalFilter: filtering,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  //this function in handling column filter (based on role and team)
  const handleFilterChange = (roleTeamVal, columnId) => {
    setFilters({
      ...filters,
      [columnId]: roleTeamVal,
    });
    if (roleTeamVal) {
      setColumnFilters([{ id: columnId, value: roleTeamVal }]);
    } else {
      setColumnFilters((prev) =>
        prev.filter((filter) => filter.id !== columnId)
      );
    }
  };
  //pagination
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pagesToShow = 6;
  const visiblePages = (() => {
    let start = Math.max(0, pageIndex - Math.floor(pagesToShow / 2));
    let end = start + pagesToShow;
    if (end > pageCount) {
      end = pageCount;
      start = Math.max(0, end - pagesToShow);
    }
    const pages = Array.from({ length: end - start }, (_, i) => start + i);

    // If we have more pages to show, handle ellipsis
    if (start > 0) {
      pages.unshift("...");
      pages.unshift(0);
    }
    if (end < pageCount) {
      pages.push("...");
      pages.push(pageCount - 1);
    }
    return pages;
  })();

  //state to manage details pane
  const [viewDetails, setViewDetails] = useState(false);
  //state to manage clicked row deatils
  const [userDetails, setUserDetails] = useState(null);
  const handleRowClick = (userData) => {
    setViewDetails(true);
    setUserDetails({
      name: userData.name,
      img: userData.img,
      userID: userData.userID,
      role: userData.role,
      DOB: userData.DOB,
      gender: userData.gender,
      nationality: userData.nationality,
      contact: userData.contact,
      emailAdd: userData.email,
      workEmail: userData.workEmail,
    });
  };
  //handle close btn
  const closeDetails = () => {
    setViewDetails(false);
    setUserDetails(null);
  };

  //edit functionality
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    img: "",
    name: "",
    email: "",
    role: "",
    status: "",
    team: [],
  });
  const handleRowClickEdit = (e, userData) => {
    e.stopPropagation();

    setEditData({
      img: userData.img,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status,
      team: userData.team.split(" "),
    });
    setOpenEdit(true);
  };
  const closeEdit = () => {
    setOpenEdit(false);
  };
  //filter functionality ui
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [urlStringRoleTeam, setUrlStringRoleTeam] = useState("");
  const handleHeadingChange = (heading) => {
    if (selectedHeading === heading) {
      setSelectedHeading(null);

      // Clear the relevant filter when the heading is unselected
      if (heading === "role") {
        setSelectedRole(null);
        handleFilterChange(null, "role");
      } else if (heading === "team") {
        setSelectedTeam(null);
        handleFilterChange(null, "team");
      }
    } else {
      setSelectedHeading(heading);
      setSelectedRole(null);
      setSelectedTeam(null);
      setUrlStringRoleTeam("");

      // Ensure any existing filter for the other heading is cleared
      if (heading === "role") {
        handleFilterChange(null, "team");
      } else if (heading === "team") {
        handleFilterChange(null, "role");
      }
    }
  };
  const handleSubCheckboxChange = (type, value) => {
    if (type === "role") {
      if (value === selectedRole) {
        setSelectedRole(null);
        handleFilterChange(null, "role"); // Clear the filter when unchecked
      } else {
        setSelectedRole(value);
        handleFilterChange(value, "role");
      }
    } else if (type === "team") {
      if (value === selectedTeam) {
        setSelectedTeam(null);
        handleFilterChange(null, "team"); // Clear the filter when unchecked
      } else {
        setSelectedTeam(value);
        handleFilterChange(value, "team");
      }
    }
  };

  const handleFilterSelectbtn = () => {
    if (selectedHeading === "role") {
      handleFilterChange(selectedRole, "role");
      setUrlStringRoleTeam(selectedRole);
    } else if (selectedHeading === "team") {
      handleFilterChange(selectedTeam, "team");
      setUrlStringRoleTeam(selectedTeam);
    } else {
    }
  };
  //handle filter toggle BTN
  const handleFilterToggle = () => {
    setOpenFilter(!openFilter);
  };

  //Delete functionality
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const handleDeleteBtn = () => {
    //assuming userID is unique
    const updatedData = data.filter(
      (item) => item.userID !== deleteData.userID
    );
    setData(updatedData);
  };
  const openDeleteModal = (e, userData) => {
    e.stopPropagation();
    setDeleteOpen(true);
    setDeleteData(userData);
  };
  const closeDelete = () => {
    setDeleteOpen(false);
  };
  //add member functionality
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const closeAddMember = () => {
    setAddMemberOpen(false);
  };
  const openAddMember = () => {
    setAddMemberOpen(true);
  };
  //reflecting state in url
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams();

    if (filtering) {
      params.set("query", filtering);
    }

    if (selectedRole) {
      params.set("role", urlStringRoleTeam);
    }

    if (selectedTeam) {
      params.set("team", urlStringRoleTeam);
    }

    if (userDetails !== null) {
      params.set("selectedRow", userDetails.name);
    }

    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
  }, [
    filtering,
    location.pathname,
    navigate,
    urlStringRoleTeam,
    selectedTeam,
    selectedRole,
    userDetails,
  ]);
  return (
    <div className=" h-full">
      {addMemberOpen && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2   border bg-VDbg rounded-md w-[800px]">
          <AddMember closeAddMember={closeAddMember}></AddMember>
        </div>
      )}
      {deleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-25 bg-black">
          <div className="bg-VDbg border rounded-lg shaddow-lg p-4">
            <Delete
              closeDelete={closeDelete}
              handleDeleteBtn={handleDeleteBtn}
            />
          </div>
        </div>
      )}
      {viewDetails && (
        <div className="viewDetailsContainer w-[40%] fixed top-0 right-0 h-full rounded-md bg-VDbg overflow-y-auto">
          <PersonalDetails
            userDetails={userDetails}
            closeDetails={closeDetails}
          ></PersonalDetails>
        </div>
      )}
      {openEdit && (
        <div className="editSection fixed inset-0 flex items-center justify-center bg-opacity-25 bg-black">
          <div className="w-[600px] h-auto border bg-VDbg rounded-md">
            <Edit closeEdit={closeEdit} editData={editData} />
          </div>
        </div>
      )}

      <div className="headerSection flex p-5 justify-between">
        <div className="totalListNum flex items-center">
          <div className="text-2xl font-semibold">Team members</div>
          <div className="ml-3 border border-designBorder text-designText bg-designBG rounded-xl p-2 pt-0 pb-0 font-semibold mt-2">
            100 users
          </div>
        </div>
        <div className="otherItems flex gap-3 items-center">
          <div className="searchBar flex gap-2 items-center border border-customeGray p-1 pl-3 rounded-t-md border-b-black text-md">
            <input
              style={{
                width: "270px",
              }}
              className="text-lg outline-none"
              type="text"
              placeholder="Search"
              value={filtering}
              onChange={(e) => {
                setFiltering(e.target.value);
              }}
            />
            <svg
              className="h-4 w-4 mr-2 fill-customPurple"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
          <div className="filterIcon">
            <svg
              className="h-6 w-6 fill-customeGray cursor-pointer"
              onClick={handleFilterToggle}
              viewBox="0 0 512 512"
            >
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
            {openFilter && (
              <div className="filterContainer absolute top-[165px] right-5 border w-[240px] p-1 bg-filterBG rounded-md">
                <p className="text-filterHeader font-semibold p-2 pb-1 border-b border-b-customeGray text-[22px]">
                  Filters
                </p>
                <div className="mt-3 p-4">
                  <div>
                    <label className="cursor-pointer text-[20px] flex items-center mb-2 text-filterHeading relative">
                      <svg
                        className="h-4 w-4 fill-customeGray absolute top-2 right-1"
                        viewBox="0 0 448 512"
                      >
                        <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                      </svg>
                      <input
                        type="checkbox"
                        checked={selectedHeading === "role"}
                        onChange={() => handleHeadingChange("role")}
                        className="mr-4 text-xl transform scale-150 accent-customPurple"
                      />
                      Roles
                    </label>
                    {selectedHeading === "role" && (
                      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                        <label className="cursor-pointer text-filterSubHeading flex gap-3 items center text-[15px]">
                          <input
                            type="checkbox"
                            checked={selectedRole === "Product Designer"}
                            onChange={() =>
                              handleSubCheckboxChange(
                                "role",
                                "Product Designer"
                              )
                            }
                            className="transform scale-125 accent-customPurple"
                          />
                          Product Designer
                        </label>
                        <br />
                        <label className="cursor-pointer text-filterSubHeading flex gap-3 items center text-[15px]">
                          <input
                            type="checkbox"
                            checked={selectedRole === "Product Manager"}
                            onChange={() =>
                              handleSubCheckboxChange("role", "Product Manager")
                            }
                            className="transform scale-125 accent-customPurple"
                          />
                          Product Manager
                        </label>
                        <br />
                        <label className="cursor-pointer text-filterSubHeading flex gap-3 items center text-[15px]">
                          <input
                            type="checkbox"
                            checked={selectedRole === "Frontend Developer"}
                            onChange={() =>
                              handleSubCheckboxChange(
                                "role",
                                "Frontend Developer"
                              )
                            }
                            className="transform scale-125 accent-customPurple"
                          />
                          Frontend Developer
                        </label>
                        <br />
                        <label className="cursor-pointer text-filterSubHeading flex gap-3 items center text-[15px]">
                          <input
                            type="checkbox"
                            checked={selectedRole === "Backend Developer"}
                            onChange={() =>
                              handleSubCheckboxChange(
                                "role",
                                "Backend Developer"
                              )
                            }
                            className="transform scale-125 accent-customPurple"
                          />
                          Backend Developer
                        </label>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <label className="cursor-pointer text-[20px] flex items-center mb-2 text-filterHeading relative">
                      <svg
                        className="h-4 w-4 fill-customeGray absolute top-2 right-1"
                        viewBox="0 0 448 512"
                      >
                        <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                      </svg>
                      <input
                        type="checkbox"
                        checked={selectedHeading === "team"}
                        onChange={() => handleHeadingChange("team")}
                        className="mr-4 text-xl transform scale-150 accent-customPurple"
                      />
                      Team
                    </label>
                    {selectedHeading === "team" && (
                      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                        <label className="cursor-pointer text-filterSubHeading flex gap-3 items center text-[15px]">
                          <input
                            type="checkbox"
                            checked={selectedTeam === "Design"}
                            onChange={() =>
                              handleSubCheckboxChange("team", "Design")
                            }
                            className="transform scale-125 accent-customPurple"
                          />
                          Design
                        </label>
                        <br />
                        <label className="cursor-pointer text-filterSubHeading flex gap-3 items center text-[15px]">
                          <input
                            type="checkbox"
                            checked={selectedTeam === "Product"}
                            onChange={() =>
                              handleSubCheckboxChange("team", "Product")
                            }
                            className="transform scale-125 accent-customPurple"
                          />
                          Product
                        </label>
                        <br />
                        <label className="cursor-pointer text-filterSubHeading flex gap-3 items center text-[15px]">
                          <input
                            type="checkbox"
                            checked={selectedTeam === "Marketing"}
                            onChange={() =>
                              handleSubCheckboxChange("team", "Marketing")
                            }
                            className="transform scale-125 accent-customPurple"
                          />
                          Marketing
                        </label>
                        <br />
                        <label className="cursor-pointer text-filterSubHeading flex gap-3 items center text-[15px]">
                          <input
                            type="checkbox"
                            checked={selectedTeam === "Technology"}
                            onChange={() =>
                              handleSubCheckboxChange("team", "Technology")
                            }
                            className="transform scale-125 accent-customPurple"
                          />
                          Technology
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className={`${
                    selectedRole || selectedTeam
                      ? "bg-customPurple text-white"
                      : "bg-editDisabledBtnBG text-editDisabledBtnText"
                  } font-semibold w-full p-2 rounded-md`}
                  onClick={handleFilterSelectbtn}
                  disabled={!selectedRole && !selectedTeam}
                >
                  SELECT
                </button>
              </div>
            )}
          </div>
          <div className="addMemberContainer">
            <button
              className="bg-customPurple text-white rounded-md font-semibold p-2"
              onClick={openAddMember}
            >
              + ADD MEMBER
            </button>
          </div>
        </div>
      </div>
      <table className="table-auto border-collapse min-w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-peopleDirectoryText border-b border-t border-gray-300 p-2 cursor-pointer text-start text-md"
                  onClick={() => {
                    if (header.column.columnDef.enableSorting !== false) {
                      const isDescending = table
                        .getState()
                        .sorting.some(
                          (sort) => sort.id === header.id && sort.desc
                        );
                      setSorting([{ id: header.id, desc: !isDescending }]);
                    }
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.columnDef.enableSorting !== false && (
                    <span>
                      {table
                        .getState()
                        .sorting.find((sort) => sort.id === header.id)?.desc ? (
                        <svg
                          className="h-4 w-4 inline-block ml-3 fill-customeGray"
                          viewBox="0 0 384 512"
                        >
                          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4 inline-block ml-3 fill-customeGray"
                          viewBox="0 0 384 512"
                        >
                          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                        </svg>
                      )}
                    </span>
                  )}
                </th>
              ))}
              <th className="text-customeGray border-b border-t border-gray-300 p-2 cursor-pointer text-start text-md"></th>
              <th className="text-customeGray border-b border-t border-gray-300 p-2 cursor-pointer text-start text-md"></th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              onClick={() => {
                handleRowClick(row.original);
              }}
              className={`cursor-pointer ${
                index % 2 !== 0 ? "bg-oddRowBg" : ""
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`border-b border-gray-300 text-sm text-peopleDirectoryText ${
                    cell.column.columnDef.meta?.className || "p-3"
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td
                className="border-b border-gray-300 p-3"
                onClick={(e) => {
                  openDeleteModal(e, row.original);
                }}
              >
                <svg className="h-4 w-4 fill-deleteEdit" viewBox="0 0 448 512">
                  <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
              </td>
              <td
                onClick={(e) => {
                  handleRowClickEdit(e, row.original);
                }}
                className="border-b border-gray-300 p-3"
              >
                <svg className="h-4 w-4 fill-deleteEdit" viewBox="0 0 512 512">
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-between mt-4 mb-2 border-t p-3">
        <button
          className="bg-transparent border border-customLightGray text-VDbodyKeyText font-semibold rounded-md p-1.5 flex gap-2 items-center text-md mt-3"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <svg
            className="h-5 w-5 fill-VDbodyKeyText"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          <span className="mb-1">Previous</span>
        </button>
        <div className="flex">
          {visiblePages.map((page, index) => (
            <button
              key={index}
              className={` ${
                pageIndex === page
                  ? "bg-paginationBG text-paginationSelectedText"
                  : "bg-transparent text-paginationText"
              } font-semibold text-md p-0 pl-5 pr-5 rounded-md  ${
                typeof page === "number" ? "" : "pointer-events-none"
              }`}
              onClick={() =>
                typeof page === "number" && table.setPageIndex(page)
              }
            >
              {typeof page === "number" ? page + 1 : page}
            </button>
          ))}
        </div>
        <button
          className="bg-transparent border border-customLightGray text-VDbodyKeyText font-semibold rounded-md p-1.5 flex gap-2 items-center text-md mt-3"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{
            height: "fit-content",
          }}
        >
          <span className="mb-1">Next</span>
          <svg
            className="h-4 w-4 fill-VDbodyKeyText"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PeopleDirectory;
