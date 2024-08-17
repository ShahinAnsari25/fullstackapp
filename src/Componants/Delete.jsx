const Delete = ({ closeDelete, handleDeleteBtn }) => {
  return (
    <div className="p-4 w-[600px]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-deteTextColor">
          Delete Member Details
        </h1>
        <svg
          className="h-4 w-4 fill-VDheadingText"
          onClick={closeDelete}
          viewBox="0 0 384 512"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>

      <p className="mt-3 mb-3 text-VDbodyValueText text-md">
        Are you sure you want to delete this member details? This action cannot
        be undone.
      </p>
      <div className="flex justify-end">
        <button
          className="bg-customPurple text-white p-2 pl-3 pr-3 rounded-md font-semibold text-lg tracking-widest"
          onClick={() => {
            handleDeleteBtn();
            closeDelete();
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};
export default Delete;
