import { useState } from "react";
import {
  Edit2,
  Trash2,
  Calendar,
  AlertCircle,
  Clock,
  Check,
  X,
  ListChecks,
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, onEdit, onDelete, isDragging, bg }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task._id,
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const handleSave = () => {
    onEdit(task._id, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task._id);
  };
  //^ Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  const isOverdue = task.due_date && new Date(task.due_date) < new Date();
  const isCurrentlyDragging = isDragging || isSortableDragging;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${bg} rounded-lg border border-gray-300 dark:border-gray-700 p-4 mb-3 transition-all duration-200 touch-manipulation ${
        isCurrentlyDragging
          ? "opacity-50 shadow-lg z-50"
          : "hover:shadow-md hover:shadow-gray-300/50 dark:hover:shadow-gray-900/30"
      } ${!isEditing ? "cursor-grab active:cursor-grabbing" : ""}`}
      {...attributes}
      {...(!isEditing ? listeners : {})}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:dark:bg-[#191919] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Task title"
            autoFocus
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:dark:bg-[#191919] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Task description"
            rows={3}
          />
          <input
            type="date"
            value={formatDateForInput(editedTask.due_date)}
            onChange={(e) =>
              setEditedTask({ ...editedTask, due_date: e.target.value })
            }
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#191919] text-gray-900 dark:text-white dark:placeholder-gray-500 :text [color-scheme:light] dark:[color-scheme:dark]"
          />
          <select
            value={editedTask.priority || "medium"}
            onChange={(e) =>
              setEditedTask({ ...editedTask, priority: e.target.value })
            }
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:dark:bg-[#191919] text-gray-900 dark:text-white"
          >
            <option value="Low💤">Low Priority</option>
            <option value="Medium⌛">Medium Priority</option>
            <option value="High🔥">High Priority</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 hover:bg-green-600 text-white font-bold rounded-md bg-green-700 transition-colors"
            >
              <Check size={18} /> Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1 hover:bg-gray-600 dark:hover:bg-red-700 text-white font-bold rounded-md bg-gray-500 dark:bg-gray-700 transition-colors"
            >
              <X size={18} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-start gap-2 flex-1">
              <ListChecks className="dark:text-white" />
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                {task.title}
              </h3>
            </div>
            <div className="flex gap-1 ml-2">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors touch-none"
                style={{ cursor: "pointer" }}
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors touch-none"
                style={{ cursor: "pointer" }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
              {task.description}
            </p>
          )}

          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-3">
              {task.due_date && (
                <div className="flex items-center gap-1 text-gray-700 dark:text-white">
                  <Calendar size={12} />
                  {new Date(task.due_date).toLocaleDateString()}
                  {isOverdue && <AlertCircle size={12} />}
                </div>
              )}
              {task.priority && (
                <div
                  className={`px-2 py-1 rounded text-xs font-bold text-black dark:text-white ${
                    task.priority === "High🔥"
                      ? "bg-red-500/50 dark:bg-[#7F4140]"
                      : task.priority === "Medium⌛"
                      ? "bg-yellow-500/50 dark:bg-[#95713A]"
                      : "bg-blue-400/50 dark:bg-[#32576D]"
                  }`}
                >
                  {task.priority}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
