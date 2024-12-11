import React from "react";

function Blog5() {
  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        A Beginner's Guide to React
      </h1>

      <img
        src="../images/react-logo.png"
        alt="Codementor Review"
        className="w-full sm:w-4/5 lg:w-3/4 h-auto object-cover mb-4 sm:mb-6 rounded-lg mx-auto"
      />

      <article className="prose prose-sm sm:prose lg:prose-lg max-w-none">
        {/* Main content paragraphs */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          React is one of the most popular JavaScript libraries for building
          user interfaces, developed and maintained by Facebook. If you're
          starting your journey with React, you're entering a world of
          efficient, component-based development that simplifies the process of
          creating dynamic and interactive web applications.
        </p>

        {/* Section headings */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
          What is React?
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          React is a JavaScript library used to create fast, interactive, and
          reusable UI components. It follows the{" "}
          <b>component-based architecture</b>, allowing developers to build
          encapsulated pieces of UI and manage the state of an application
          efficiently.
        </p>

        <h3 className="text-lg font-semibold mb-4 sm:text-xl lg:text-2xl sm:mb-4">
          Why React?
        </h3>
        <ul className="list-disc ml-4 sm:ml-6 space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <li className="text-sm sm:text-base lg:text-lg text-gray-700">
            <b>Reusable Components:</b> Write components once and reuse them
            across your application.
          </li>
          <li className="text-sm sm:text-base lg:text-lg text-gray-700">
            <b>Virtual DOM:</b> React uses a virtual DOM to improve performance
            by minimizing direct manipulation of the browser's DOM.
          </li>
          <li className="text-sm sm:text-base lg:text-lg text-gray-700">
            <b>One-Way Data Binding:</b> Ensures that the data flow is
            predictable and easier to debug.
          </li>
          <li className="text-sm sm:text-base lg:text-lg text-gray-700">
            <b>Rich Ecosystem:</b> React's ecosystem includes libraries like
            Redux, React Router, and many more to enhance development.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
          Key Concepts
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          Before diving into code, let’s go over some core React concepts:
        </p>

        <h3 className="text-lg font-semibold mb-4 sm:text-xl lg:text-2xl sm:mb-4">
          1. Components
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          A React application is made up of components. These components can be
          functional or class-based.
        </p>

        {/* Code blocks */}
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`function Welcome() {
  return <h1>Hello, React!</h1>;
}`}
          </code>
        </pre>

        <h3 className="text-lg font-semibold mb-4 sm:text-xl lg:text-2xl sm:mb-4">
          2. JSX (JavaScript XML)
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          JSX is a syntax extension that allows you to write HTML-like code
          within JavaScript.
        </p>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>{`const element = <h1>Welcome to React!</h1>;`}</code>
        </pre>

        <h3 className="text-lg font-semibold mb-4 sm:text-xl lg:text-2xl sm:mb-4">
          3. Props
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          Props (short for properties) are used to pass data from a parent
          component to a child component.
        </p>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}`}
          </code>
        </pre>

        <h3 className="text-lg font-semibold mb-4 sm:text-xl lg:text-2xl sm:mb-4">
          4. State
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          State is a built-in React object used to store data that affects the
          rendering of components.
        </p>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
          </code>
        </pre>

        <h3 className="text-lg font-semibold mb-4 sm:text-xl lg:text-2xl sm:mb-4">
          5. Lifecycle Methods
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          Lifecycle methods like <code>componentDidMount</code> or hooks like{" "}
          <code>useEffect</code> allow you to control a component's behavior
          during different stages of its lifecycle.
        </p>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
          Setting Up Your First React App
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          React can be set up in a variety of ways, but the easiest method is
          using <b>Create React App</b>.
        </p>
        <ol className="list-decimal ml-6 mb-6 sm:ml-6 space-y-2 sm:space-y-3 sm:mb-6">
          <li className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2">
            <b>Install Node.js:</b> Ensure you have Node.js installed from{" "}
            <a
              href="https://nodejs.org/"
              className="text-blue-500"
              target="_blank"
              rel="noreferrer"
            >
              Node.js official website
            </a>
            .
          </li>
          <li className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2">
            <b>Create a React App:</b> Run{" "}
            <code>npx create-react-app my-first-react-app</code> in your
            terminal.
          </li>
          <li className="text-sm sm:text-base lg:text-lg text-gray-700">
            <b>Start the Development Server:</b> Navigate to your project folder
            and start the server with <code>npm start</code>.
          </li>
        </ol>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
          Building Your First React Component
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          Once your React app is set up, let’s create a simple `HelloWorld`
          component.
        </p>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`// HelloWorld.js
import React from 'react';

function HelloWorld() {
  return <h1>Hello, World!</h1>;
}

export default HelloWorld;

// App.js
import HelloWorld from './HelloWorld';

function App() {
  return (
    <div>
      <HelloWorld />
    </div>
  );
}

export default App;`}
          </code>
        </pre>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
          Tips for Beginners
        </h2>
        <ul className="list-disc ml-4 sm:ml-6 space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <li className="text-sm sm:text-base lg:text-lg text-gray-700">
            Understand JavaScript fundamentals like ES6 features.
          </li>
          <li className="text-sm sm:text-base lg:text-lg text-gray-700">
            Start small, focusing on components, state, and props.
          </li>
          <li className="text-sm sm:text-base lg:text-lg text-gray-700">
            Use the{" "}
            <a
              href="https://reactjs.org/"
              className="text-blue-500"
              target="_blank"
              rel="noreferrer"
            >
              official React documentation
            </a>{" "}
            as a guide.
          </li>
          <li className="text-sm sm:text-base lg:text-lg text-gray-700">
            Practice building small projects like a to-do list or weather app.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
          Final Thoughts
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
          React is a fantastic tool for building modern web applications. By
          understanding its core concepts and practicing regularly, you’ll be
          well on your way to mastering React.
        </p>
      </article>
    </div>
  );
}

export default Blog5;
