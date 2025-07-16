import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const Column = ({
  title,
  tasks,
  status,
  onTaskUpdate,
  onTaskDelete,
  onTaskCreate,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const taskIds = tasks.map((task) => task._id);

  const getColumnColor = () => {
    switch (status) {
      case "To Do":
        return "dark:bg-[#202020]";
      case "In Progress":
        return "dark:bg-[#27211B]";
      case "Done":
        return "dark:bg-[#1B231F]";
      default:
        return "dark:bg-gray-900";
    }
  };

  const getHeaderColor = () => {
    switch (status) {
      case "To Do":
        return "bg-gray-200 dark:bg-[#3D3D3D] text-gray-800 dark:text-white";
      case "In Progress":
        return "bg-amber-200 dark:bg-[#90692F] text-amber-800 dark:text-white";
      case "Done":
        return "bg-green-200 dark:bg-[#245E41] text-green-800 dark:text-white";
      default:
        return "bg-gray-200 dark:bg-[#3D3D3D] text-gray-800 dark:text-white";
    }
  };

  const getTaskColor = () => {
    switch (status) {
      case "To Do":
        return "bg-white dark:bg-[#2D2D2D]";
      case "In Progress":
        return "bg-amber-50 dark:bg-[#463623]";
      case "Done":
        return "bg-green-50 dark:bg-[#1F3D2E]";
      default:
        return "bg-white dark:bg-[#3D3D3D]";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "To Do":
        return "⚪";
      case "In Progress":
        return "🟡";
      case "Done":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case "To Do":
        return "border-gray-300 dark:border-gray-700";
      case "In Progress":
        return "border-amber-300 dark:border-gray-700";
      case "Done":
        return "border-green-300 dark:border-gray-700";
      default:
        return "border-gray-300 dark:border-gray-700";
    }
  };

  const getCountBadgeColor = () => {
    switch (status) {
      case "To Do":
        return "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
      case "In Progress":
        return "bg-amber-300 dark:bg-gray-800 text-amber-800 dark:text-gray-300";
      case "Done":
        return "bg-green-300 dark:bg-gray-800 text-green-800 dark:text-gray-300";
      default:
        return "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  const getHoverColor = () => {
    switch (status) {
      case "To Do":
        return "hover:bg-gray-50 dark:hover:bg-[#3D3D3D]";
      case "In Progress":
        return "hover:bg-amber-100 dark:hover:bg-[#90692F]";
      case "Done":
        return "hover:bg-green-100 dark:hover:bg-[#245E41]";
      default:
        return "hover:bg-gray-50 dark:hover:bg-[#3D3D3D]";
    }
  };

  return (
    <div
      className={`flex-1 min-w-80 h-[calc(100vh-9.1rem)] xl:max-h-[50vh] ${getColumnColor()} rounded-lg border ${getBorderColor()} ${
        isOver ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30" : ""
      } transition-all duration-200 flex flex-col`}
    >
      <div className="p-4 rounded-t-lg border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div
            className={`flex items-center gap-1 ${getHeaderColor()} rounded px-2`}
          >
            <span className="text-lg">{getStatusIcon()}</span>
            <h2 className="font-extrabold text-lg">{title}</h2>
          </div>
          <span
            className={`${getCountBadgeColor()} px-3 py-1 rounded-lg text-sm font-bold`}
          >
            {tasks.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 p-4 ${
          tasks.length === 0
            ? "flex items-center justify-center"
            : "overflow-y-auto"
        }`}
      >
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Plus size={24} className="text-gray-400" />
            </div>
            <p>No tasks yet</p>
          </div>
        ) : (
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={onTaskUpdate}
                onDelete={onTaskDelete}
                columnId={status}
                bg={getTaskColor()}
              />
            ))}
          </SortableContext>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <button
          onClick={() => onTaskCreate(status)}
          className={`w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-white ${getHoverColor()} transition-all duration-200 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white hover:font-bold`}
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Column;
