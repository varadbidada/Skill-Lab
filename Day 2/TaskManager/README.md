# Task Manager — Web Lab Mini Project

A small responsive task manager built with plain HTML, CSS, and JavaScript.

## Features
- Add tasks
- Mark tasks as completed
- Delete individual tasks
- Filter All / Active / Completed
- Clear completed tasks
- Save tasks in the browser with `localStorage`
- Responsive layout for mobile and desktop

## Run it
1. Extract the folder if you downloaded the ZIP.
2. Open `index.html` in a browser.
3. Add a task and try the filters.

For the most predictable browser behavior, open the folder in VS Code and use the Live Server extension.

## Files
- `index.html` — page structure
- `style.css` — appearance and responsive layout
- `script.js` — task state, DOM rendering, events, and localStorage

## How it works
1. The form's `submit` event calls `addTask()`.
2. Tasks are stored in a JavaScript array.
3. `renderTasks()` rebuilds the visible list and updates the counters.
4. `saveTasks()` uses `JSON.stringify()` to store the array.
5. `loadTasks()` uses `JSON.parse()` to restore saved tasks.

## Challenge ideas
- Add a due date and priority
- Sort tasks by newest first / oldest first
- Add an edit task feature
- Add a search field
- Add a confirmation before deleting
- Replace localStorage with a real API and backend

Note: this project uses browser-local storage, not a remote API or database. Tasks stay in the current browser on the current device.
