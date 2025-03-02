import fs from "fs";
import inquirer from "inquirer";

const FILE_PATH = "tasks.json";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

const loadTasks = (): Task[] => {
  if (!fs.existsSync(FILE_PATH)) return [];
  return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
};
    
const saveTasks = (tasks: Task[]) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

const mainMenu = async () => {
  const tasks = loadTasks();

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "เลือกเมนู:",
      choices: ["เพิ่มงาน", "ดูงานทั้งหมด", "ลบงาน", "ออก"],
    },
  ]);

  if (action === "เพิ่มงาน") {
    const { text } = await inquirer.prompt([
      { type: "input", name: "text", message: "ชื่อเรื่อง:" },
    ]);
    tasks.push({ id: tasks.length + 1, text, done: false });
    saveTasks(tasks);
    console.log("เพิ่มงานแล้ว");
  }

  if (action === "ดูงานทั้งหมด") {
    if (tasks.length === 0) {
      console.log("ไม่มีงาน");
    } else {
      tasks.forEach((task) => console.log(`${task.id}. ${task.text}`));
    }
  }

  if (action === "ลบงาน") {
    if (tasks.length === 0) {
      console.log("ไม่มีงานให้ลบ");
      return mainMenu();
    }

    const { id } = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "หมายเลขงานที่ต้องการลบ:",
        validate: (input) => {
          const num = Number(input);
          if (isNaN(num) || !tasks.some((task) => task.id === num)) {
            return "หมายเลขไม่ถูกต้อง";
          }
          return true;
        },
      },
    ]);

    const filteredTasks = tasks.filter((task) => task.id !== Number(id));
    saveTasks(filteredTasks);
    console.log("ลบงานแล้ว");

    mainMenu();
  }

  if (action !== "ออก") mainMenu();
};

mainMenu();
