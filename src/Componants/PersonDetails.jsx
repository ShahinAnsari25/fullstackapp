const PersonalDetails = ({ userDetails, closeDetails }) => {
  //getting values of clicked row
  const {
    name,
    img,
    userID,
    role,
    DOB,
    gender,
    nationality,
    contact,
    emailAdd,
    workEmail,
  } = userDetails;
  //handle close btn
  const handleCloseBtn = () => {
    closeDetails();
  };
  return (
    <div className="rounded-md border h-full">
      <div className="viewDetailsHeader flex gap-3 p-4 bg-VDheader rounded-t-lg relative">
        <div className="imageSection">
          <img
            className="rounded-full h-[100px] w-[100px] object-cover"
            src={img}
            alt=""
          />
        </div>
        <div className="introSectio text-white flex-col justify-center items-center">
          <p className="mt-2 ml-1 font-bold text-xl">{name}</p>
          <div className="roleUserIdContainer flex pt-2">
            <div className="userIDContainer border-r p-2 pt-0 pb-0 text-sm">
              <p className="m-0">{userID}</p>
              <p className="m-0">userID</p>
            </div>
            <div className="roleContainer p-2 pt-0 pb-0 text-sm">
              <p className="m-0">{role}</p>
              <p className="m-0">Role</p>
            </div>
          </div>
        </div>
        <button className="absolute top-3 right-3" onClick={handleCloseBtn}>
          <svg className="h-6 w-6 fill-white" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>
      <p className="m-3 p-3 font-semibold text-lg bg-VDpersonalInfo rounded-lg text-VDheadingText">
        Personal Information
      </p>
      <div className="dataContainer m-3">
        <div className="flex border-b">
          <p className="m-0 text-VDbodyKeyText p-3  w-[40%] font-semibold">
            Date of Birth
          </p>
          <p className="m-0 text-VDbodyValueText p-3  w-[60%] font-semibold">
            {DOB}
          </p>
        </div>
        <div className="flex border-b">
          <p className="m-0 text-VDbodyKeyText p-3  w-[40%] font-semibold">
            Gender
          </p>
          <p className="m-0 text-VDbodyValueText p-3  w-[60%] font-semibold">
            {gender}
          </p>
        </div>
        <div className="flex border-b">
          <p className="m-0 text-VDbodyKeyText p-3  w-[40%] font-semibold">
            Nationality
          </p>
          <p className="m-0 text-VDbodyValueText p-3  w-[60%] font-semibold">
            {nationality}
          </p>
        </div>
        <div className="flex border-b">
          <p className="m-0 text-VDbodyKeyText p-3  w-[40%] font-semibold">
            Contact no.
          </p>
          <p className="m-0 text-VDbodyValueText p-3  w-[60%] font-semibold">
            {contact}
          </p>
        </div>
        <div className="flex border-b">
          <p className="m-0 text-VDbodyKeyText p-3  w-[40%] font-semibold">
            E-mail Address
          </p>
          <p className="m-0 text-VDbodyValueText p-3  w-[60%] font-semibold">
            {emailAdd}
          </p>
        </div>
        <div className="flex border-b">
          <p className="m-0 text-VDbodyKeyText p-3  w-[40%] font-semibold">
            Work email Address
          </p>
          <p className="m-0 text-VDbodyValueText p-3  w-[60%] font-semibold">
            {workEmail}
          </p>
        </div>
      </div>
      <p className="m-3 p-3 font-semibold text-lg bg-VDpersonalInfo rounded-lg text-VDheadingText">
        Research and Publication
      </p>

      <div className="p-2 m-3 mt-0 pt-0">
        <p className="font-semibold mb-2">
          Al and User Experience: The Future of Design
        </p>
        <p className="text-VDbodyValueText mb-2">
          Published in the Journal of Modern Design 2022
        </p>
        <p className="text-VDbodyValueText">
          Al, loT based real time condition monitoring of Electrical Machines
          using Python language Abstract: Maintaining induction motors in good
          working order before they fail benefits small{" "}
          <span className="text-VDseePub">See More...</span>
        </p>
        <p className="text-VDseePub flex gap-2 mt-3">
          <svg
            className="h-6 w-6 fill-VDseePub"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M384 32c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0zM160 144c-13.3 0-24 10.7-24 24s10.7 24 24 24l94.1 0L119 327c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135L288 328c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160c0-13.3-10.7-24-24-24l-152 0z" />
          </svg>
          <span className="font-bold">SEE PUBLICATION</span>
        </p>
      </div>
    </div>
  );
};
export default PersonalDetails;
