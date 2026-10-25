# React Projects, 2nd Edition (Roy Derks) — Chapter 3

**Catalog #265:** Building a dynamic project management board

Verbatim extract from the Packt PDF (indices 86–117).

Source file: E:\Books\Other\React Projects Build advanced cross-platform projects with React and React Native to become a professional developer, 2nd Ed (Roy Derks) (z-lib.org).pdf

Official code: https://github.com/PacktPublishing/React-Projects-Second-Edition/tree/main/Chapter03



---

## PDF page index 86

70     Building a Dynamic Project Management Board
The following topics will be covered in this chapter:
•	 Handling the data flow
•	 Working with custom Hooks
•	 Using HTML5 web APIs
•	 Styling React with styled-components
Project overview
In this chapter, we will create a dynamic project management board that has reusable 
React components and styling using Create React App and styled-components. The 
application will feature a dynamic drag and drop interface that uses the HTML5 Drag and 
Drop API.
The build time is 1.5–2 hours.
Getting started
The project that we'll create in this chapter builds upon an initial version that you can 
find on GitHub: https://github.com/PacktPublishing/React-Projects-
Second-Edition/tree/main/Chapter03-initial. The complete source 
code for this application can also be found on GitHub: https://github.com/
PacktPublishing/React-Projects-Second-Edition/tree/main/
Chapter03.
After downloading the initial application from GitHub, we can start by moving into 
its root directory and running the npm install command. This will install the core 
packages from Create React App (react, react-dom, and react-scripts). After the 
installation, we can start the application by executing the npm start command and visit 
the project in the browser by visiting http://localhost:3000. 
As shown in the following screenshot, the application has a basic header with a title and is 
divided into four columns. These columns are the lanes for the project management board 
and will contain the individual tasks once we've connected the project to the data file.


---

## PDF page index 87

Getting started     71
Figure 3.1 – The initial application
If we look at the project's structure, we'll see that it's structured in the same way as the 
projects in the previous chapters. The entry point of the application is the src/index.
js file, which renders a component called App, which holds two other components called 
Header and Board. The first one is the actual header of the application, while the Board 
component holds the four columns we can see in the application. These columns are 
represented by the Lane component.
In this application, you can see that we've further split up the components into separate 
directories. Every component in either the components or pages directory now has its 
own subdirectory:
chapter-3-initial
  |- /node_modules
  |- /public
  |- /src
    |- /components
       |- /Header
          |- Header.css
          |- Header.js
       |- /Lane
          |- Lane.css
          |- Lane.js


---

## PDF page index 88

72     Building a Dynamic Project Management Board
    |- /pages
       |- /Board
          |- Board.js
          |- Board.css
    |- App.js
    |- App.css
    |- index.js
    |- index.css
package.json
Creating a project management board 
application
In this section, we'll create a project management board PWA that uses custom Hooks for 
data fetching and the HTML5 Drag and Drop API to make it dynamic. We're going to use 
a boilerplate application that is set up with Create React App, which we can find in the 
GitHub repository for this chapter.
Handling the data flow
With the initial version of the application in place, the next step is to fetch the initial data 
for the project management board and handle its flow through the components. For this, 
we will create a custom Hook for data fetching that can be reused in other components.
The first part of this section will show us how to load data from a data source using React 
life cycle methods and display this in React components.
Loading and displaying the data
Loading and displaying data that is retrieved from a data source is something we did in 
the previous chapter. The data used in this chapter is coming from a mock REST API, 
created with My JSON Server from Typicode. Using a file called db.json, which is 
placed in the repository for this book, we can automatically create REST endpoints.


---

## PDF page index 89

Creating a project management board application     73
Figure 3.2 – Using My JSON Server 
Using My JSON Server, the https://my-json-server.typicode.com/
PacktPublishing/React-Projects-Second-Edition/tasks endpoint 
returns a list of tasks, which we'll load into our project management board in this section. 
The response is an array consisting of objects that contain information about our tasks 
defined in the id, title, body, and lane fields. 
This section will explore this further. Follow these steps to get started:
1.	 We will start by fetching the project data from the data file. To do this, we need to 
add the necessary functions to the Board component. We need these to access the 
React life cycles using Hooks, which we already did in the earlier chapters:
+ import { useState, useEffect } from 'react';
  import Lane from '../../components/Lane/Lane';
  import './Board.css';
  // ...
  function Board() {
+   const [loading, setLoading] = useState(false);


---

## PDF page index 90

74     Building a Dynamic Project Management Board
+   const [tasks, setTasks] = useState([]);
+   const [error, setError] = useState('');
+   useEffect(() => {
+     async function fetchData() {
+       try {
+         const tasks = await fetch(
              `https://my-json-server.typicode.com/
              PacktPublishing/React-Projects-Second-
              Edition/tasks`,
        );
+         const result = await tasks.json();
+         if (result) {
+           setTasks(result);
+           setLoading(false);
+         }
+       } catch (e) {
+         setLoading(false);
+         setError(e.message);
+       }
+     }
+     fetchData();
+   }, []);
   return (
     // ...
In the useEffect Hook, the data is fetched inside a try..catch statement. This 
statement catches any errors that are being returned from the data fetching process 
and replaces the error state with this message.
2.	 Now, we can distribute the tasks over the corresponding lanes:
    // ...
    return (


---

## PDF page index 91

Creating a project management board application     75
      <div className='Board-wrapper'>
        {lanes.map((lane) => (
          <Lane
            key={lane.id}
            title={lane.title}
+           loading={loading}
+           error={error}
+           tasks={tasks.filter((task) => 
              task.lane === lane.id)}
          />
        ))}
      </div>
    );
  }
  
  export default Board;
In the return statement, you can see a function that iterates over the lanes 
constant and that these values are passed as props to the Lane component. Also, 
something special is going on when we pass the tasks to the components since the 
filter function is being used to only return tasks from the tasks state that match 
the lane ID. 
3.	 Next, we need to make some changes to the Lane component so that it will use the 
data that we fetched from the REST API to display the tasks for us:
+ import Task from '../Task/Task';
  import './Lane.css';
- function Lane({ title }) {
+ function Lane({ title, loading, error, tasks }) {
    return (
      <div className='Lane-wrapper'>
        <h2>{title}</h2>
+       {loading || error ? (
+         <span>{error || 'Loading...'}</span>
+       ) : (
+         tasks.map((task) => (


---

## PDF page index 92

76     Building a Dynamic Project Management Board
+            <Task
+              key={task.id}
+              id={task.id}
+              title={task.title}
+              body={task.body}
+            />
+         ))
+       )}
      </div>
    );
  }
  export default Lane;
The Lane component now takes three other props, which are tasks, loading, 
and error, where tasks contains the array of tasks from the REST API, 
loading indicates whether the loading message should be displayed, and 
error contains the error message when there is one. We can see that inside the 
map function to iterate over the tasks, the Task component that displays the 
information will be rendered. 
4.	 To create this task, we need to create a directory called Task in the components 
directory and place a new file for the Task component inside. This new file is called 
Task.js:
import './Task.css';
function Task({ title, body }) {
  return (
    <div className='Task-wrapper'>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}
export default Task;


---

## PDF page index 93

Creating a project management board application     77
5.	 This component takes its styling from another file that we need to create inside the 
Task directory, which is called Task.css and has the following contents:
.Task-wrapper {
  background: darkGray;
  padding: 20px;
  border-radius: 20px;
  margin: 0% 5% 5% 5%;
}
.Task-wrapper h3 {
  width: 100%;
  margin: 0;
}
If we visit our application in a web browser at http://localhost:3000, we will see 
the following:
Figure 3.3 – Our application with data from the mock REST API


---

## PDF page index 94

78     Building a Dynamic Project Management Board
Fetching data from a data source is logic that can be reused throughout our application. In 
the next section, we will explore how this logic can be reused across multiple components 
by creating a custom Hook.
Working with custom Hooks
Hooks are a way to use React features for creating local state or to watch for updates in 
that state using life cycles. But Hooks are also a way to reuse logic that you create for your 
own React application. This is a pattern that is popular among a lot of libraries that create 
functionalities for React, such as react-router.
Note
Before React introduced Hooks themselves, it was a popular pattern to create 
Higher-Order Components (HOCs) to reuse logic. HOCs are advanced 
features in React that focus on the reusability of components. The React 
documentation described them as follows: "A higher-order component is a 
function that takes a component and returns a new component."
In the first part of this section, we'll create our first custom Hook, which uses logic to 
retrieve data from the data source that we created in the previous section.
Creating custom Hooks
We already saw that we can reuse components in React, but the next step is to reuse 
logic that you have inside these components. To explain what this means in practice, let's 
create an example. Our project has a Board component, which fetches the REST API 
and renders all the lanes and tasks. There is logic in this component in the form of a local 
state created with the useState Hook, data fetching inside a useEffect Hook, and 
information about how each Lane component is being rendered. How will we handle a 
situation where we just want to show a board without lanes and only tasks? Do we just 
send different props from the Board component? Sure, that's possible, but, in React, that's 
what custom Hooks are used for.
A Board component without lanes wouldn't map over all the lanes and render the 
corresponding lane with the tasks as a prop. Instead, it would map over all the tasks and 
render them directly. Although the rendered components are different, the logic to set the 
initial state, fetch the data, and render the component(s) can be reused. The custom Hook 
should be able to use the local state and execute data fetching from any component that 
it's used in.


---

## PDF page index 95

Working with custom Hooks     79
To create the custom Hook, create a new file called useDataFetching.js inside a new 
directory called hooks in the src directory. Now, follow these steps:
1.	 Import the useState and useEffect Hooks from React and create a new 
function for the Hook, which becomes the default export. This function will take 
one parameter called dataSource. Since this Hook will use the life cycles for data 
fetching, let's call this custom Hook useDataFetching and have it return an 
empty array:
import { useState, useEffect } from 'react';
function useDataFetching(dataSource) {
  return [];
}
export default useDataFetching;
2.	 Inside this function, add the useState Hooks to create a local state for loading, 
error, and data, which has almost the same structure as our local state inside the 
Board component:
  import { useState, useEffect } from 'react';
  function useDataFetching(dataSource) {
+   const [loading, setLoading] = useState(false);
+   const [data, setData] = useState([]);
+   const [error, setError] = useState('');
    return [];
  }
 
  export default useDataFetching;


---

## PDF page index 96

80     Building a Dynamic Project Management Board
3.	 Next, we need to use the useEffect hook, which is where the data fetching will be 
done. The dataSource parameter is used as the location to fetch from. Also, notice 
that the constant names are now more generic and no longer specify a single use:
  import { useState, useEffect } from 'react';
  function useDataFetching(dataSource) {
    // ...
-   return [];
+   useEffect(() => {
+     async function fetchData() {
+       try {
+         const data = await fetch(dataSource);
+         const result = await data.json();
+         if (result) {
+           setData(result);
+           setLoading(false);
+         }
+       } catch (e) {
+         setLoading(false);
+         setError(e.message);
+       }
+     }
+     fetchData();
+   }, [dataSource]);
+   return [loading, error, data];
  }
  export default useDataFetching;


---

## PDF page index 97

Working with custom Hooks     81
This adds the method to do data fetching, and in the return statement, we're returning 
the data, loading, and error state. 
Congratulations! You've created your very first Hook! However, it still needs to be added 
to a component that supports data fetching. Therefore, we need to refactor our Board 
component to use this custom Hook for data fetching instead:
1.	 Import the custom Hook from the src/hooks/useDataFetching.js file and 
delete the imports of the React Hooks:
- import { useState, useEffect } from 'react';
+ import useDataFetching from 
    '../../hooks/useDataFetching';
  import Lane from '../../components/Lane/Lane';
  import './Board.css';
  // ...
2.	 Subsequently, we can delete the usage of the useState and useEffect Hooks in 
the Board component:
  // ...
  function Board() {
-   const [loading, setLoading] = useState(false);
-   const [tasks, setTasks] = useState([]);
-   const [error, setError] = useState('');
-   useEffect(() => {
-     async function fetchData() {
-       try {
-         const tasks = await fetch(
          `https://my-json-server.typicode.com/
           PacktPublishing/React-Projects-Second-
           Edition/tasks`,
        );
-         const result = await tasks.json();


---

## PDF page index 98

82     Building a Dynamic Project Management Board
-         if (result) {
-           setTasks(result);
-           setLoading(false);
-         }
-       } catch (e) {
-         setLoading(false);
-         setError(e.message);
-       }
-     }
-     fetchData();
-   }, []);
   return (
     // ...
3.	 Instead, use the imported custom Hook to handle our data fetching. The Hook 
returns the loading, error, and tasks state as before, but the data state is 
renamed tasks to fit the needs of our component:
  import useDataFetching 
    from '../../hooks/useDataFetching';
  import Lane from '../../components/Lane/Lane';
  import './Board.css';
  function Board() {
+   const [loading, error, tasks] =
      useDataFetching(`https://my-json-server.
      typicode.com/PacktPublishing/React-Projects-
      Second-Edition/tasks`);
   return (
     // ...
In the next section, we'll learn how to reuse a custom Hook by importing it from a 
different component.


---

## PDF page index 99

Working with custom Hooks     83
Reusing a custom Hook
With the very first custom Hook in place, it's time to think of other components that 
could do data fetching, such as a component that is displaying only tasks. The process to 
create this component consists of two steps: creating the actual component and using the 
custom Hook for data fetching. Let's get started:
1.	 Inside the directory pages, we need to create a new file called Backlog.js in a 
new directory called Backlog. In this file, we can place the following code to create 
the component, import the custom Hook, and import the CSS for styling:
import Task from '../../components/Task/Task';
import useDataFetching from 
  '../../hooks/useDataFetching';
import './Backlog.css';
function Backlog() {
  const [loading, error, tasks] = useDataFetching(
    'https://my-json-server.typicode.com/
     PacktPublishing/React-Projects-Second-Edition/
     tasks',
  );
  return (
    <div></div>
  );
}
export default Backlog;
2.	 The return statement is now returning an empty div element, so we need to add 
the code to render the tasks here:
  // ...
  return (
-   <div>
+   <div className='Backlog-wrapper'>
+     <h2>Backlog</h2>


---

## PDF page index 100

84     Building a Dynamic Project Management Board
+     <div className='Tasks-wrapper'>
+       {loading || error ? (
+         <span>{error || 'Loading...'}</span>
+       ) : (
+         tasks.map((task) => (
+           <Task
+             key={task.id}
+             title={task.title}
+             body={task.body}
+           />
+         ))
+       )}
+     </div>
    </div>
  );
}
export default Backlog;
3.	 This component imports the Backlog.css file for styling, and we've also added 
classes to the elements in this file. But we also need to create and add some basic 
styling rules to Backlog.css:
.Backlog-wrapper {
  display: flex;
  flex-direction: column;
  margin: 5%;
}
.Backlog-wrapper h2 {
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid darkGray;
}


---

## PDF page index 101

Working with custom Hooks     85
.Tasks-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5%;
}
4.	 In the App component, we can import this component to render it below the 
Board component:
  import './App.css';
  import Board from './pages/Board/Board';
  import Header from './components/Header/Header';
+ import Backlog from './pages/Backlog/Backlog';
  function App() {
    return (
      <div className='App'>
        <Header />
        <Board />
+       <Backlog />
      </div>
    );
  }
  export default App;
This will render the new Backlog component below our board with all the different 
tasks. These tasks are the same ones as in the Board component, as the same REST API 
endpoint is used. Also, you can set up react-router for this project to render the 
Backlog component on a different page instead.
All the tasks that are displayed in the lanes are only in one part of our application, since 
we want to be able to drag and drop these tasks into different lanes. We'll learn how to do 
this in the next section, where we'll add dynamic functionalities to the board.


---

## PDF page index 102

86     Building a Dynamic Project Management Board
Making the board dynamic
One of the things that usually give project management boards great user interaction is 
the ability to drag and drop tasks from one lane into another. This is something that can 
easily be accomplished using the HTML5 Drag and Drop API, which is available in every 
modern browser, including IE11.
The HTML5 Drag and Drop API makes it possible for us to drag and drop elements 
across our project management board. To make this possible, it uses drag events. 
onDragStart, onDragOver, and onDrop will be used for this application. These 
events should be placed on both the Lane and the Task components. 
In the file for the Board component, let's add the functions that respond to the drop 
events, which need to be sent to the Lane and Task components. Let's get started:
1.	 Start by adding the event handler function for the onDragStart event, 
which fires when the dragging operation is started, to the Board component. This 
function needs to be passed to the Lane component, where it can be passed on to 
the Task component. This function sets an ID for the task that is being dragged to 
the dataTransfer object of the element, which is used by the browser to identify 
the drag element:
  // ...
+ function onDragStart(e, id) {
+   e.dataTransfer.setData('id', id);
+ }
  function Board() {
    const [loading, error, tasks] = useDataFetching(
      'https://my-json-server.typicode.com/
       PacktPublishing/React-Projects-Second-Edition/
       tasks',
    );
    return (
      <div className='Board-wrapper'>
        {lanes.map((lane) => (
          <Lane
            key={lane.id}
            title={lane.title}


---

## PDF page index 103

Working with custom Hooks     87
            loading={loading}
            error={error}
            tasks={tasks.filter((task) => 
                   task.lane === lane.id)}
+           onDragStart={onDragStart}
          />
        ))}
      </div>
    );
  }
  export default Board;
2.	 In the Lane component, we need to pass this event handler function to the 
Task component:
  // ...
- function Lane({ title, loading, error, tasks }) {
+ function Lane({ title, loading, error, tasks, 
    onDragStart }) {
    return (
      <div className='Lane-wrapper'>
        <h2>{title}</h2>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          tasks.map((task) => (
            <Task
              key={task.id}
              title={task.title}
              body={task.body}
+             onDragStart={onDragStart}
            />
          ))
        )}
      </div>


---

## PDF page index 104

88     Building a Dynamic Project Management Board
    );
  }
  export default Lane;
3.	 Now, we can invoke this function in the Task component, where we also need 
to add the draggable attribute to the div element with the class name Task-
wrapper. Here, we send the element and the task ID as a parameter to the event 
handler:
  import './Task.css';
- function Task({ title, body }) { 
+ function Task({ id, title, body, onDragStart }) {
    return (
      <div
        className='Task-wrapper'
+       draggable
+       onDragStart={(e) => onDragStart(e, id)}
      >
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    );
  }
  export default Task;
After making these changes, we should be able to see that each task can be dragged 
around. But don't drop them anywhere yet – the other drop events and event handlers that 
update the state should be added as well. Dragging a task from one lane to another can be 
done by clicking on a task without releasing the mouse and dragging it to another lane, as 
shown in the following screenshot:


---

## PDF page index 105

Working with custom Hooks     89
Figure 3.4 – The interactive project management board
With the onDragStart event implemented, the onDragOver and onDrop events can 
be implemented as well. Let's get started:
1.	 By default, it's impossible to drop elements into another element – for example, a 
Task component into a Lane component. This can be prevented by calling the 
preventDefault method for the onDragOver event:
  // ...
  function onDragStart(e, id) {
    e.dataTransfer.setData('id', id);
  }
+ function onDragOver(e) {
+   e.preventDefault();
+ };


---

## PDF page index 106

90     Building a Dynamic Project Management Board
  function Board() {
    const [loading, error, tasks] = useDataFetching(
      'https://my-json-server.typicode.com/
       PacktPublishing/React-Projects-Second-Edition/
       tasks',
    );
    return (
      <div className='Board-wrapper'>
        {lanes.map((lane) => (
          <Lane
            key={lane.id}
            title={lane.title}
            loading={loading}
            error={error}
            tasks={tasks.filter((task) => 
                   task.lane === lane.id)}
            onDragStart={onDragStart}
+           onDragOver={onDragOver}
          />
        ))}
      </div>
    );
  }
  export default Board;
2.	 This function needs to be imported and placed as an event handler on the div 
element with the class name Lane-wrapper in the Lane component:
  // ...
- function Lane({ title, loading, error, tasks, 
    onDragStart }) {
+ function Lane({ title, loading, error, tasks, 
    onDragStart, onDragOver }) {
    return (


---

## PDF page index 107

Working with custom Hooks     91
-     <div className='Lane-wrapper'>
+     <div className='Lane-wrapper' 
       onDragOver={onDragOver}>
        <h2>{title}</h2>
        // ...
3.	 The onDrop event is where things get interesting, since this event makes it possible 
for us to mutate the state after we've finished the drag operation. Before we can  
add this event handler, we need to create a new local state variable called tasks 
in the Board component. This state variable is overwritten when the data is being 
fetched from the useDataFetching Hook and is used to display the tasks from 
the Lane components:
+ import { useEffect, useState } from 'react';
  import Lane from '../../components/Lane/Lane';
  import useDataFetching from
    '../../hooks/useDataFetching';
  import './Board.css';
  // ...
  function Board() {
    const [
      loading, 
      error, 
-     tasks
+     data] = useDataFetching(
        'https://my-json-server.typicode.com/
         PacktPublishing/React-Projects-Second-Edition/
         tasks',
  );
+   const [tasks, setTasks] = useState([]);
+   useEffect(() => {
+     setTasks(data);


---

## PDF page index 108

92     Building a Dynamic Project Management Board
+   }, [data]);
  // ...
  return (
    // ...
4.	 The new event handler function can now be created, and when it's invoked, we can 
call the setTasks function from the useState Hook for the tasks state:
  // ...
  function Board() {
    // ...
+   function onDrop(e, laneId) {
+     const id = e.dataTransfer.getData('id');
+     const updatedTasks = tasks.filter((task) => {
+       if (task.id.toString() === id) {
+         task.lane = laneId;
+       }
+       return task;
+     });
+     setTasks(updatedTasks);
+   }
    return (
      // ...
5.	 Also, this event handler function should be passed as a prop to the Task 
component:
    // ...
    Return (
      <div className='Board-wrapper'>
        {lanes.map((lane) => (
          <Lane


---

## PDF page index 109

Working with custom Hooks     93
            key={lane.id}
+           laneId={lane.id}
            title={lane.title}
            loading={loading}
            error={error}
            tasks={tasks.filter((task) => 
                   task.lane === lane.id)}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
+           onDrop={onDrop}
          />
        ))}
      </div>
    );
  }
  export default Board;
This onDrop event handler function takes an element and the ID of the lane as 
a parameter because it needs the ID of the dragged element and the new lane it 
should be placed in. With this information, the function uses a filter function 
to find the task that needs to be moved and changes the ID of the lane. This 
new information will replace the current object for the task in the state with the 
setState function. 
6.	 Since the onDrop event gets fired from the Lane component, it is passed as a prop 
to this component. Also, the ID of the lane is added as a prop because this needs to 
be passed to the onDrop event handler function from the Lane component:
  import Task from '../Task/Task';
  import './Lane.css';
  function Lane({
+   laneId,
    title,
    loading,
    error,
    tasks,


---

## PDF page index 110

94     Building a Dynamic Project Management Board
    onDragStart,
    onDragOver,
+   onDrop,
  }) {
    return (
      <div
        className='Lane-wrapper'
        onDragOver={onDragOver}
+       onDrop={(e) => onDrop(e, laneId)}
      >
      // ...
With this, we're able to drag and drop tasks onto other lanes in our board – something 
that you can also do for the Backlog component – or even make this logic reusable with 
another custom Hook. But instead, we'll be looking at how to make the styling for our 
component more flexible and reusable by using the styled-components library in the 
next section.
Styling in React with styled-components
So far, we've been using CSS files to add styling to our React components. However, this 
forces us to import these files across different components, which makes our code less 
reusable. Therefore, we'll add the styled-components package to the project, which 
allows us to write CSS inside JavaScript (so-called CSS-in-JS) and create components.
By doing this, we'll get more flexibility out of styling our components, be able to prevent 
the duplication or overlapping of styles due to classNames, and add dynamic styling 
to components with ease. All of this can be done using the same syntax we used for CSS, 
right inside our React components.
The first step is installing styled-components using npm:
npm install styled-components
Note
If you look at the official documentation of styled-components, you will 
notice that they strongly advise you to use the Babel plugin for this package 
as well. But since you're using Create React App to initialize your project, you 
don't need to add this plugin, as all the compilation that your application needs 
has already been taken care of by react-scripts.


---

## PDF page index 111

Styling in React with styled-components     95
After installing styled-components, let's try to delete the CSS file from one of 
our components. A good start will be the Task component since this is a very small 
component with limited functionality:
1.	 Start by importing the styled-components package and creating a new styled 
component called TaskWrapper. This component extends a div element and 
takes the CSS rules we already have for the Task-wrapper class name in Task.
css. Also, we no longer have to import this file, since all the styling is now being 
done inside this JavaScript file:
+ import styled from 'styled-components';
- import './Task.css';
+ const TaskWrapper = styled.div`
+   background: darkGray;
+   padding: 20px;
+   border-radius: 20px;
+   margin: 0% 5% 5% 5%;
+   h3 {
+     width: 100%;
+     margin: 0;
+   }
+ `;
  function Task({ id, title, body, onDragStart }) {
    return (
-     <div className="Task-wrapper"
+     <TaskWrapper 
        draggable 
        onDragStart={(e) => onDragStart(e, id)}
      >
        <h3>{title}</h3>
        <p>{body}</p>
-     </div>
+     </TaskWrapper>
  );


---

## PDF page index 112

96     Building a Dynamic Project Management Board
}
export default Task;
2.	 In the preceding code block, we've added the styling of the h3 element in the styled 
component for TaskWrapper, but we can also do this inside a specific styled 
component as well:
  import styled from 'styled-components';
  
  // ...
-   h3 {
-     width: 100%;
-     margin: 0;
-   }
- `;
+ const Title = styled.h3`
+   width: 100%;
+   margin: 0;
+ `;
  function Task({ id, title, body, onDragStart }) {
    return (
      <TaskWrapper 
        draggable 
        onDragStart={(e) => onDragStart(e, id)}
      >
-       <h3>{title}</h3>
+       <Title>{title}</Title>
        <p>{body}</p>
      </TaskWrapper>
  );
}
export default Task;


---

## PDF page index 113

Styling in React with styled-components     97
3.	 We can also do this for the other components in our project, starting with the Lane 
component, for which we first need to create the styled components that use the 
same styling as those in the Lane.css file:
+ import styled from 'styled-components';
  import Task from '../Task/Task';
- import './Lane.css';
+ const LaneWrapper = styled.div`
+   text-align: left;
+   padding: 0;
+   background: lightGray;
+   border-radius: 20px;
+   min-height: 50vh;
+   width: 20vw;
+   @media (max-width: 768px) {
+     margin-bottom: 5%;
+   }
+ `;
+ const Title = styled.h2`
+   width: 100%;
+   padding-bottom: 10px;
+   text-align: center;
+   border-bottom: 1px solid darkGray;
+ `;
  function Lane({
    // ...
4.	 Replace the existing div and h3 elements with these new components:
  // ...
  function Lane({
    laneId,
    title,


---

## PDF page index 114

98     Building a Dynamic Project Management Board
    loading,
    error,
    tasks,
    onDragStart,
    onDragOver,
    onDrop,
  }) {
    return (
-     <div className="Lane-wrapper"    
+     <LaneWrapper 
        onDragOver={onDragOver} 
        onDrop={(e) => onDrop(e, laneId)}
      >
-       <h3>{title}</h3>
+       <Title>{title}</Title>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          // ...
        )}
-     </div>
+     </LaneWrapper>
    );
  }
  export default Lane;
If we visit our project in the browser after running npm start again, we'll see that 
our application still looks the same after deleting the CSS files for the Ticket and Lane 
component. You can, of course, also do the same thing for the other components in  
the project.


---

## PDF page index 115

Styling in React with styled-components     99
Let's proceed and convert another component to use styled-components instead of 
CSS – for example, the component in the src/App.js file. This one is using the src/
App.css file to style the div element that wraps all the components in our application:
- import './App.css';
+ import styled from 'styled-components';
  import Board from './pages/Board/Board';
  import Header from './components/Header/Header';
  import Backlog from './pages/Backlog/Backlog';
+ const AppWrapper = styled.div`
+   text-align: center;
+ `;
  function App() {
    return (
-     <div className='App'>
+     <AppWrapper>
        <Header />
        <Board />
        <Backlog />
-     </div>
+     </AppWrapper>
    );
  }
  export default App;
After making these changes, you can delete the src/App.css file as we're no longer 
using it to style the App component. 


---

## PDF page index 116

100     Building a Dynamic Project Management Board
Another possibility with styled-components is creating a global style for our 
application, which is currently done in src/index.css. This file is imported in src/
index.js and therefore loaded into every page of the application, as it is the entry 
to our React application. But the App component in src/App.js also wraps all our 
components, in which we can copy the styling rules from src/index.css and use them 
to create a GlobalStyle component:
- import styled from 'styled-components'; 
+ import styled, { createGlobalStyle } from 
    'styled-components';
  import Board from './pages/Board/Board';
  import Header from './components/Header/Header';
  import Backlog from './pages/Backlog/Backlog';
+ const GlobalStyle = createGlobalStyle`
+   body {
+     margin: 0;
+     font-family: -apple-system, BlinkMacSystemFont, 
        'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
        'Cantarell', 'Fira Sans', 'Droid Sans', 
        'Helvetica Neue', sans-serif;
+     -webkit-font-smoothing: antialiased;
+     -moz-osx-font-smoothing: grayscale;
+   }
+ `;
  const AppWrapper = styled.div`
    // ...
This global style that we just created must be added to the return statement for the App 
component, above the AppWrapper component. As we can only return a single element or 
component from the return statement, we need to wrap the contents into another element. 
If we wanted to apply styling to this element, we could do this with a div element. As we 
don't want that in this scenario, we'll be using a React fragment instead. With a fragment, we 
can wrap elements and components without rendering anything in the browser:
  // ...
  function App() {


---

## PDF page index 117

Styling in React with styled-components     101
    return (
+     <>
+       <GlobalStyle />
        <AppWrapper>
          <Header />
          <Board />
          <Backlog />
        </AppWrapper>
+     </>
    );
  }
  export default App;
Note
The <> notation is shorthand for <React.Fragment>; you can use both 
notations in React. For the <React.Fragment> notation, you can also 
import Fragment from React to write <Fragment>.
Finally, you can delete the src/index.css file and the line in src/index.js that 
imports this file into our application:
  import React from 'react'; 
  import ReactDOM from 'react-dom/client';
- import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  const root = ReactDOM.createRoot(
    document.getElementById('root'));
    // ...
With these final additions, we've styled large parts of our application with styled-
components instead of CSS. By writing the styling rules directly in the components, we 
can reduce the number of files in the project and also make it easier to find what styling is 
applied to our elements.
