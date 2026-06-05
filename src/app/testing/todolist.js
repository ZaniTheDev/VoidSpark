import { ArrowUpIcon, Target } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const taskList = [
  {
    id: 1,
    name: "whatever",
    state: false,
  },
];

export default function todoList() {
  const [text, setText] = useState("");
  const [task, setTask] = useState([...task]);

  console.log(task);
  const changeText = (e) => {
    setText(e.target.value);
  };

  const addtask = () => {
    setTask([...taskList]);
  };

  console.log("render");
  return (
    <>
      <div className="flex items-center gap-2 justify-center min-h-screen bg-black">
        <Button variant="outline">Add Task</Button>
        <Input
          className="w-40 bg-white"
          placeholder="enter your task"
          value={text}
          onChange={changeText}
        ></Input>

        <Card className="w-3xl">
          <CardHeader>
            <CardTitle>See your todo lists</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{text}</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
