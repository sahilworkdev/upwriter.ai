// import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";

type OptionsModalProps = {
  id: string;
  handleDeleteData: (id: string) => void;
  onClose: () => void;
};

function OptionsModal({ id, handleDeleteData, onClose }: OptionsModalProps) {
  return (
    <div
      className="absolute right-6 rounded-lg flex flex-col gap-2 overflow-y-auto px-4 py-2 bg-secondary-default shadow-lg z-10"
      onClick={onClose}
    >
      {/* <div className="flex gap-2 cursor-pointer">
        <CiEdit size={18} className="text-blue-500" />
        <span>Rename</span>
      </div> */}

    

      <div
        className="flex gap-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); 
          handleDeleteData(id);
          onClose(); 
        }}
      >
        <FaTrashAlt size={18} className="text-red-500" />
        <span>Delete</span>
      </div>
    </div>
  );
}

export default OptionsModal;
