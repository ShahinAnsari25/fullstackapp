import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Zod schema for validation
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Developer", "Designer", "Manager", "Product Manager"], {
    required_error: "Role is required",
  }),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Status is required",
  }),
  team: z.array(z.string()).nonempty("At least one team must be selected"),
});

const Edit = ({ closeEdit, editData }) => {
  //extracting data
  const { img, name, email, role, status, team } = editData;
  const imageRef = useRef();
  const [selectedTeams, setSelectedTeams] = useState(team);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const teams = ["Frontend", "Backend", "Design", "QA"];
  const handleTeamChange = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team)
        ? prev.filter((item) => item !== team)
        : [...prev, team]
    );
  };

  // Update the `team` field in react-hook-form whenever selectedTeams changes
  React.useEffect(() => {
    setValue("team", selectedTeams);
  }, [selectedTeams, setValue]);

  const removeTeam = (team) => {
    setSelectedTeams((prev) => prev.filter((item) => item !== team));
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  //image upload
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const imageContainerRef = useRef();
  const handleRemovePhoto = () => {
    setSelectedImage("");
    imageContainerRef.current.src = "/userImage.png";
  };
  return (
    <div className="bg-white p-5 rounded-md overflow-y-auto">
      <p className="font-bold text-[23px] mb-2 tracking-wide">Edit Profile</p>
      <div className="flex justify-center items-center mb-3">
        <img
          className="rounded-full h-[80px] w-[80px] object-cover"
          ref={imageContainerRef}
          src={selectedImage || img}
          alt=""
        />
      </div>
      <div className="flex gap-2 justify-center mt-0">
        <input
          style={{
            display: "none",
          }}
          ref={imageRef}
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleImageUpload} // Handle the file selection}
        />
        <button
          className="flex gap-1 bg-transparent items-center border border-editBorder p-2 rounded-md text-editbuttonText bg-editBG"
          onClick={() => {
            imageRef.current.click();
          }}
        >
          <svg className="h-3 w-3 fill-editbuttonText" viewBox="0 0 512 512">
            <path d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z" />
          </svg>
          <span className="font-semibold text-[12px]">CHANGE PHOTO</span>
        </button>
        <button
          className="flex gap-1 bg-transparent items-center border border-editBorder p-2 rounded-md text-VDbodyKeyText bg-editBG"
          onClick={handleRemovePhoto}
        >
          <svg className="h-3 w-3 fill-editbuttonText" viewBox="0 0 448 512">
            <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />{" "}
          </svg>
          <span className="font-semibold text-[12px]">REMOVE PHOTO</span>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
        <div className="flex gap-6 mb-4">
          <div className="w-1/2">
            <label
              className="block text-sm  text-VDbodyKeyText font-semibold ml-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue={name}
              {...register("name")}
              className="mt-1 block w-full border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-1/2">
            <label
              className="block text-sm  text-VDbodyKeyText font-semibold ml-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue={email}
              {...register("email")}
              className="mt-1 block w-full border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-6 mb-4">
          <div className="w-1/2">
            <label
              className="block text-sm  text-VDbodyKeyText font-semibold ml-1"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              defaultValue={role}
              {...register("role")}
              className="mt-1 block w-full bg-transparent border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
            >
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
              <option value="Product Manager">Product Manager</option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>

          <div className="w-1/2">
            <label
              className="block text-sm  text-VDbodyKeyText font-semibold ml-1"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              defaultValue={status}
              {...register("status")}
              className="mt-1 block w-full bg-transparent border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm">
                {errors.status.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm text-VDbodyKeyText font-semibold ml-1"
            htmlFor="team"
          >
            Teams
          </label>
          <div className="relative inline-block w-full">
            <div
              className="mt-1 block w-full bg-transparent border border-editBorder border-b-VDheadingText rounded-t-md p-3 cursor-pointer text-sm"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <svg
                className="h-3 w-3 absolute top-6 right-2"
                viewBox="0 0 448 512"
              >
                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>

              <div className="flex gap-2 flex-wrap">
                {selectedTeams.length > 0
                  ? selectedTeams.map((team) => (
                      <div
                        key={team}
                        className="flex items-center justify-between p-2 mb-1 border-designBorder text-sm text-customPurple bg-designBG rounded-md gap-2"
                      >
                        <span className="text-customPurple">{team}</span>
                        <button
                          type="button"
                          onClick={() => removeTeam(team)}
                          className="text-designText-500 hover:text-designText-700 text-sm"
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  : "Select teams"}
              </div>
            </div>
            <div
              className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg text-sm ${
                dropdownOpen ? "" : "hidden"
              }`}
            >
              {teams.map((team) => (
                <label key={team} className="flex items-center p-2">
                  <input
                    type="checkbox"
                    checked={selectedTeams.includes(team)}
                    onChange={() => handleTeamChange(team)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{team}</span>
                </label>
              ))}
            </div>
          </div>
          {errors.team && (
            <span className="text-red-500 text-sm">{errors.team.message}</span>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={closeEdit}
            className="text-md border border-editBorder p-0.5 pl-2 pr-2 rounded-md text-VDbodyKeyText bg-editBG font-bold tracking-wider"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="text-md border border-editBorder p-0.5 pl-2 pr-2 rounded-md text-VDbodyKeyText bg-editBG ml-2 font-bold tracking-wider"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};
export default Edit;
