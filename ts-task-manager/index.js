"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var inquirer_1 = require("inquirer");
var FILE_PATH = "tasks.json";
var loadTasks = function () {
    if (!fs_1.default.existsSync(FILE_PATH))
        return [];
    return JSON.parse(fs_1.default.readFileSync(FILE_PATH, "utf-8"));
};
var saveTasks = function (tasks) {
    fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};
var mainMenu = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tasks, action, text, id_1, filteredTasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tasks = loadTasks();
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: "list",
                            name: "action",
                            message: "เลือกสิ่งที่คุณต้องการทำ:",
                            choices: ["เพิ่มงาน", "ดูงานทั้งหมด", "ลบงาน", "ออก"],
                        },
                    ])];
            case 1:
                action = (_a.sent()).action;
                if (!(action === "เพิ่มงาน")) return [3 /*break*/, 3];
                return [4 /*yield*/, inquirer_1.default.prompt([
                        { type: "input", name: "text", message: "ป้อนชื่องาน:" },
                    ])];
            case 2:
                text = (_a.sent()).text;
                tasks.push({ id: tasks.length + 1, text: text, done: false });
                saveTasks(tasks);
                console.log("เพิ่มงานเรียบร้อย!");
                _a.label = 3;
            case 3:
                if (action === "ดูงานทั้งหมด") {
                    if (tasks.length === 0) {
                        console.log("ไม่มีงานในรายการ!");
                    }
                    else {
                        console.log("รายการงาน:");
                        tasks.forEach(function (task) { return console.log("".concat(task.id, ". ").concat(task.text)); });
                    }
                }
                if (!(action === "ลบงาน")) return [3 /*break*/, 5];
                if (tasks.length === 0) {
                    console.log("ไม่มีงานให้ลบ!");
                    return [2 /*return*/, mainMenu()];
                }
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: "input",
                            name: "id",
                            message: "ป้อนหมายเลขงานที่ต้องการลบ:",
                            validate: function (input) {
                                var num = Number(input);
                                if (isNaN(num) || !tasks.some(function (task) { return task.id === num; })) {
                                    return "กรุณาป้อนหมายเลขที่ถูกต้อง!";
                                }
                                return true;
                            },
                        },
                    ])];
            case 4:
                id_1 = (_a.sent()).id;
                filteredTasks = tasks.filter(function (task) { return task.id !== Number(id_1); });
                saveTasks(filteredTasks);
                console.log("ลบงานเรียบร้อย!");
                mainMenu();
                _a.label = 5;
            case 5:
                if (action !== "ออก")
                    mainMenu();
                return [2 /*return*/];
        }
    });
}); };
mainMenu();
