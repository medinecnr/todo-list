"use client"; 
import { useState, useEffect } from "react"; 
import { Button, Card, Input, Badge, Modal } from "@nextui-org/react"; 
import { ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";  

export default function Home() {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);  
  const [taskText, setTaskText] = useState(""); 
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all"); 
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);  
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();  

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");  
    if (storedTasks) {  
      setTasks(JSON.parse(storedTasks));  
    }
  }, []);  
  useEffect(() => {
    if (tasks.length > 0) {  
      localStorage.setItem("tasks", JSON.stringify(tasks)); 
    }
  }, [tasks]);  

  const addTask = () => {
    if (taskText.trim()) { 
      const newTask = { id: Date.now(), text: taskText, completed: false }; 
      setTasks((prevTasks) => [...prevTasks, newTask]);  
      setTaskText("");  
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task 
      )
    );
  };

  const deleteTask = () => {
    if (taskToDelete !== null) {  
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setTaskToDelete(null); 
      onClose();
    }
  };

  const filteredTasks =
    filter === "all"
      ? tasks  
      : tasks.filter((task) => (filter === "completed" ? task.completed : !task.completed));

  return (
    <div className="p-6">
      <h1 className="text-6xl font-bold text-center py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text shadow-lg rounded-xl">
        TODO LIST
      </h1>

      <div className="flex gap-4 mt-10">
        <Input
          placeholder="Enter a task" 
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}  
          className="flex-grow"
        />
        <Button onClick={addTask} size="lg" className="bg-pink-400">
          Add Task
        </Button>
      </div>

      <div className="flex justify-between mt-6">
        <Badge color="primary">{filteredTasks.length} items left</Badge> 
        <div className="flex gap-4">
          <Button
            onClick={() => setFilter("all")}
            color={filter === "all" ? "primary" : "secondary"}  
            size="sm"
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("active")}
            color={filter === "active" ? "primary" : "secondary"}
            size="sm"
          >
            Active
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            color={filter === "completed" ? "primary" : "secondary"}
            size="sm"
          >
            Completed
          </Button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="flex justify-between p-4">
            <div
              className={`flex-grow flex justify-center items-center cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </div>
            <div className="flex justify-center items-center mt-2 gap-2 ">
              <Button
                color="success"
                size="sm"
                onClick={() => toggleTask(task.id)}  
              >
                ✔
              </Button>
              <Button
                onPress={() => {
                  setTaskToDelete(task.id);
                  onOpen();  
                }}
                size="sm"
              >
                🗑
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this task?</p>  
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>Cancel</Button>
            <Button color="danger" onPress={deleteTask}>Delete</Button>  
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
