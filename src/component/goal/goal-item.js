import { IconCheck, IconTrash } from "@tabler/icons-react";

const GoalItem = ({ goal }) => {
  return (
    <div className="border-b border-neutral-700 py-2">
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 bg-neutral-800 flex justify-center items-center rounded-md text-xs">
          {goal.id + 1}
        </div>
        <p className="text-neutral-400 text-sm">{goal.title}</p>
        <IconCheck size={20} className="text-neutral-400" />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs sm:text-sm py-2 sm:py-0 w-10/12">
          {goal.description}
        </span>
        <div className="w-8 h-8 bg-neutral-800 text-neutral-400 flex justify-center items-center rounded-md cursor-pointer hover:text-red-600">
          <IconTrash size={19} />
        </div>
      </div>
    </div>
  );
};

export default GoalItem;
