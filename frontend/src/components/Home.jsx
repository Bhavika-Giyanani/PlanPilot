import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Header from "./Header";
import Column from "./Column";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskAPI";

const Home = ({ isDarkMode, toggleDarkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("To Do");
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [error, setError] = useState("");

  //^ Drag and Drop Sensors - Updated for mobile compatibility
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error loading tasks:", error);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const getPriorityText = (priority) => {
    if (priority.includes("🔥")) return "High";
    if (priority.includes("⌛")) return "Medium";
    if (priority.includes("💤")) return "Low";
    return priority;
  };

  const getPriorityOrder = (priority) => {
    const priorityText = getPriorityText(priority);
    const priorityMap = {
      High: 1,
      Medium: 2,
      Low: 3,
    };
    return priorityMap[priorityText] || 4;
  };

  //^ Task filter functions based on search and priority
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      filterPriority === "all" ||
      getPriorityText(task.priority) === filterPriority;

    return matchesSearch && matchesPriority;
  });

  const tasksByStatus = {
    "To Do": filteredTasks
      .filter((task) => task.status === "To Do")
      .sort(
        (a, b) => getPriorityOrder(a.priority) - getPriorityOrder(b.priority)
      ),
    "In Progress": filteredTasks
      .filter((task) => task.status === "In Progress")
      .sort(
        (a, b) => getPriorityOrder(a.priority) - getPriorityOrder(b.priority)
      ),
    Done: filteredTasks
      .filter((task) => task.status === "Done")
      .sort(
        (a, b) => getPriorityOrder(a.priority) - getPriorityOrder(b.priority)
      ),
  };

  const handleTaskCreate = async (newTask) => {
    try {
      setError("");
      const statusTasks = tasks.filter(
        (task) => task.status === newTask.status
      );
      const maxPosition =
        statusTasks.length > 0
          ? Math.max(...statusTasks.map((t) => t.position || 0))
          : -1;

      const createdTask = await createTask({
        ...newTask,
        position: maxPosition + 1,
      });
      setTasks([...tasks, createdTask]);
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    }
  };

  const handleTaskUpdate = async (taskId, updatedTask) => {
    try {
      setError("");
      const updated = await updateTask(taskId, updatedTask);
      setTasks(tasks.map((task) => (task._id === taskId ? updated : task)));
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task. Please try again.");
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (reloadError) {
        console.error("Error reloading tasks:", reloadError);
      }
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      setError("");
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
    }
  };

  const openModal = (status) => {
    setModalStatus(status);
    setIsModalOpen(true);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((task) => task._id === active.id);
    setActiveTask(task);
    console.log("Drag started for task:", task);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    console.log("Drag ended - Active:", active?.id, "Over:", over?.id);

    setActiveTask(null);

    if (!over || !active) {
      console.log("No valid drop target");
      return;
    }

    const activeTaskId = active.id;
    const overContainerId = over.id;

    const activeTask = tasks.find((task) => task._id === activeTaskId);

    if (!activeTask) {
      console.log("Active task not found");
      return;
    }

    console.log("Active task found:", activeTask);

    const validStatuses = ["To Do", "In Progress", "Done"];
    let newStatus = activeTask.status;
    let newPosition = activeTask.position;

    //^ Checking for the task dropped on a column (status change)
    if (validStatuses.includes(overContainerId)) {
      newStatus = overContainerId;

      const targetColumnTasks = tasks.filter(
        (task) => task.status === newStatus && task._id !== activeTaskId
      );
      newPosition = targetColumnTasks.length;

      console.log(
        "Dropped on column:",
        newStatus,
        "New position:",
        newPosition
      );
    } else {
      const overTask = tasks.find((task) => task._id === overContainerId);
      if (overTask) {
        newStatus = overTask.status;

        const targetColumnTasks = tasks.filter(
          (task) => task.status === newStatus && task._id !== activeTaskId
        );
        const overTaskIndex = targetColumnTasks.findIndex(
          (task) => task._id === overContainerId
        );
        newPosition =
          overTaskIndex >= 0 ? overTaskIndex : targetColumnTasks.length;

        console.log(
          "Dropped on task:",
          overTask.title,
          "New status:",
          newStatus,
          "New position:",
          newPosition
        );
      }
    }

    //^ update if something changed
    if (
      newStatus === activeTask.status &&
      newPosition === activeTask.position
    ) {
      console.log("No changes needed");
      return;
    }

    try {
      console.log("Updating task:", {
        taskId: activeTaskId,
        currentStatus: activeTask.status,
        newStatus: newStatus,
        newPosition: newPosition,
      });

      setTasks((prevTasks) => {
        const newTasks = prevTasks.map((task) => {
          if (task._id === activeTaskId) {
            return { ...task, status: newStatus, position: newPosition };
          }

          if (task.status === newStatus && task._id !== activeTaskId) {
            const currentPos = task.position || 0;
            if (currentPos >= newPosition) {
              return { ...task, position: currentPos + 1 };
            }
          }

          return task;
        });

        console.log("Updated tasks state:", newTasks);
        return newTasks;
      });

      const taskUpdateData = {
        title: activeTask.title,
        description: activeTask.description,
        due_date: activeTask.due_date,
        priority: activeTask.priority,
        status: newStatus,
        position: newPosition,
      };

      console.log("Task update data:", taskUpdateData);

      const updatedTask = await updateTask(activeTaskId, taskUpdateData);
      console.log("Task updated in database:", updatedTask);

      const affectedTasks = tasks.filter(
        (task) =>
          task.status === newStatus &&
          task._id !== activeTaskId &&
          (task.position || 0) >= newPosition
      );

      console.log(
        "Updating positions for affected tasks:",
        affectedTasks.length
      );

      for (const task of affectedTasks) {
        const updatedPosition = (task.position || 0) + 1;
        await updateTask(task._id, {
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          priority: task.priority,
          status: task.status,
          position: updatedPosition,
        });
        console.log(
          `Updated position for task ${task._id} to ${updatedPosition}`
        );
      }
    } catch (error) {
      console.error("Error updating task during drag:", error);
      setError("Failed to update task. Please try again.");

      try {
        const data = await getTasks();
        setTasks(data);
      } catch (reloadError) {
        console.error("Error reloading tasks:", reloadError);
      }
    }
  };

  const handleDragCancel = () => {
    console.log("Drag cancelled");
    setActiveTask(null);
  };

  const getColumnColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-gradient-to-br from-slate-50 to-gray-100 dark:bg-[#2D2D2D]";
      case "In Progress":
        return "bg-gradient-to-br from-amber-50 to-orange-100 dark:bg-[#463623]";
      case "Done":
        return "bg-gradient-to-br from-emerald-50 to-green-100 dark:bg-[#1F3D2E]";
      default:
        return "bg-gradient-to-br from-slate-50 to-gray-100 dark:bg-[#3D3D3D]";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#191919] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading PlanPilot...
          </p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="min-h-screen bg-gray-200 dark:bg-[#191919] transition-colors duration-300">
        {/* Header */}
        <Header
          authHeader={false}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Error Message */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-500 dark:text-red-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 19.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span className="text-red-700 dark:text-red-400 text-sm font-medium">
                  {error}
                </span>
                <button
                  onClick={() => setError("")}
                  className="ml-auto text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Kanban Board */}
          <div className="w-full overflow-x-auto">
            <div
              className="flex gap-6 xl:justify-center min-w-max xl:min-w-0"
              style={{ touchAction: "none" }}
            >
              {Object.entries(tasksByStatus).map(([status, tasks]) => (
                <div
                  key={status}
                  className={`w-80 flex-shrink-0 ${getColumnColor(
                    status
                  )} rounded-lg transition-all duration-300 ease-in-out`}
                  style={{ touchAction: "none" }}
                >
                  <Column
                    title={status}
                    tasks={tasks}
                    status={status}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDelete={handleTaskDelete}
                    onTaskCreate={openModal}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>

        <DragOverlay>
          {activeTask ? (
            <div className="transform rotate-3 scale-105 transition-all duration-200 ease-out">
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
                isDragging={true}
              />
            </div>
          ) : null}
        </DragOverlay>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleTaskCreate}
          initialStatus={modalStatus}
        />
      </div>
    </DndContext>
  );
};

export default Home;
