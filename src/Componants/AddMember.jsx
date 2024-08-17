import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Zod schema for validation
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  workEmail: z.string().email("Invalid email address"),
  role: z.enum(["Developer", "Designer", "Manager", "Product Manager"], {
    required_error: "Role is required",
  }),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Status is required",
  }),
  team: z.array(z.string()).nonempty("At least one team must be selected"),
  nationality: z.string().min(1, "Nationality is required"),
  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must be at most 15 digits")
    .regex(/^\d+$/, "Contact number must contain only digits"),
  DOB: z
    .string()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use yyyy-mm-dd."),
  UserID: z
    .string()
    .min(2, "User ID is required")
    .regex(/^@/, "User ID must start with '@'"),
});

const AddMember = ({ closeAddMember }) => {
  const imageRef = useRef();
  const [selectedTeams, setSelectedTeams] = useState("");
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
  //team field
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
  //upload image
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
  return (
    <div className="p-8">
      <p className="font-bold text-[23px] mb-2 tracking-wide">ADD MEMBER</p>
      <div className="flex justify-center items-center mb-3">
        <img
          className="rounded-full h-[80px] w-[80px] object-cover"
          src={selectedImage || "/userImage.png"}
          alt="Invalid"
        />
      </div>
      <div className="flex gap-2 justify-center mt-2">
        <input
          style={{
            display: "none",
          }}
          ref={imageRef}
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleImageUpload} // Handle the file selection
        />
        <button
          className="flex gap-1 bg-transparent items-center border border-editBorder p-2 rounded-md text-editbuttonText bg-editBG"
          onClick={() => {
            imageRef.current.click();
          }}
        >
          <svg className="h-4 w-4 fill-VDbodyKeyText" viewBox="0 0 512 512">
            <path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
          </svg>
          <span className="font-semibold text-[12px]">UPLOAD PHOTO</span>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5">
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
              htmlFor="UserID"
            >
              UserID
            </label>
            <input
              id="UserID"
              type="text"
              {...register("UserID")}
              className="mt-1 block w-full border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
            />
            {errors.UserID && (
              <span className="text-red-500 text-sm">
                {errors.UserID.message}
              </span>
            )}
          </div>

          <div className="w-1/2">
            <label
              className="block text-sm  text-VDbodyKeyText font-semibold ml-1"
              htmlFor="contact"
            >
              Contact No
            </label>
            <input
              id="contact"
              type="contact"
              {...register("contact")}
              className="mt-1 block w-full border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
            />
            {errors.contact && (
              <span className="text-red-500 text-sm">
                {errors.contact.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-6 mb-4">
          <div className="w-1/2">
            <label
              className="block text-sm  text-VDbodyKeyText font-semibold ml-1"
              htmlFor="DOB"
            >
              DOB
            </label>
            <input
              id="DOB"
              type="text"
              {...register("DOB")}
              className="mt-1 block w-full border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
              placeholder="YY/MM/DD"
            />
            {errors.DOB && (
              <span className="text-red-500 text-sm">{errors.DOB.message}</span>
            )}
          </div>
          <div className="w-1/2">
            <label
              className="block text-sm  text-VDbodyKeyText font-semibold ml-1"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              className="mt-1 block w-full bg-transparent border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6 mb-4">
          <div className="w-1/2">
            <label
              className="block text-sm  text-VDbodyKeyText font-semibold ml-1"
              htmlFor="workEmail"
            >
              Work Email
            </label>
            <input
              id="workEmail"
              type="workEmail"
              {...register("workEmail")}
              className="mt-1 block w-full border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
            />
            {errors.workEmail && (
              <span className="text-red-500 text-sm">
                {errors.workEmail.message}
              </span>
            )}
          </div>

          <div className="w-1/2">
            <label
              className="block text-sm  text-VDbodyKeyText font-semibold ml-1"
              htmlFor="nationality"
            >
              Nationality
            </label>
            <input
              id="nationality"
              type="nationality"
              {...register("nationality")}
              className="mt-1 block w-full border border-editBorder border-b-VDheadingText rounded-t-md shadow-sm p-3 text-sm"
            />
            {errors.nationality && (
              <span className="text-red-500 text-sm">
                {errors.nationality.message}
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

              <div className="flex gap-2">
                {selectedTeams.length > 0
                  ? selectedTeams.map((team) => (
                      <div
                        key={team}
                        className="flex items-center justify-between p-2 mb-1 border-designBorder text-designText bg-designBG rounded-md gap-2"
                      >
                        <span className="text-designText text-sm">{team}</span>
                        <button
                          type="button"
                          onClick={() => removeTeam(team)}
                          className="text-designText-500 hover:text-designText-700"
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  : "Select teams"}
              </div>
            </div>
            <div
              className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg ${
                dropdownOpen ? "" : "hidden"
              }`}
            >
              {teams.map((team) => (
                <label key={team} className="flex items-center p-2">
                  <input
                    type="checkbox"
                    checked={selectedTeams.includes(team)}
                    onChange={() => handleTeamChange(team)}
                    className="form-checkbox text-sm"
                  />
                  <span className="ml-2 text-sm">{team}</span>
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
            onClick={closeAddMember}
            className="text-md border border-editBorder p-0.5 pl-2 pr-2 rounded-md text-VDbodyKeyText bg-editBG ml-2 font-bold tracking-wider"
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
export default AddMember;
