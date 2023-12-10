import React from "react";
import TodoList from "./components/ToDoList";

test("TodoList component snapshot", () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper).toMatchSnapshot();
});
