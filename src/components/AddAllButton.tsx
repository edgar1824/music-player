import { FC } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "./Button";

// Does nothing
export const AddAllButton: FC = () => {
  return (
    <Button className="flex items-center gap-3">
      <FaPlus /> Add All
    </Button>
  );
};
