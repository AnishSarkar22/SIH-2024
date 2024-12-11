import React from "react";

function Blog4() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4 sm:text-3xl lg:text-4xl sm:mb-6 text-center sm:text-left">
        Understanding JavaScript Closures
      </h1>

      <img
        src="../images/1_RSXwyxfqWYXi5UB1_vVprQ.png"
        alt="Codementor Review"
        className="w-3/4 h-100 object-cover mb-6 rounded-lg mx-auto sm:w-4/5 lg:w-3/4 sm:mb-6"
      />

      <article className="prose prose-sm sm:prose lg:prose-lg max-w-none">
        <p className="text-gray-700 mb-6 sm:mb-6 text-sm sm:text-base lg:text-lg">
          Closures are a fundamental yet often misunderstood concept in
          JavaScript. They are not only essential for writing efficient code but
          also provide powerful tools for creating more flexible and robust
          applications. In this blog, we’ll explore what closures are, how they
          work, and their real-world applications in JavaScript.
        </p>

        <h2 className="text-2xl font-semibold mb-4 sm:text-2xl lg:text-3xl sm:mb-4">
          What Are Closures?
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-4 text-sm sm:text-base lg:text-lg">
          In JavaScript, a closure is created when a function "remembers" the
          variables from its outer scope even after the outer function has
          finished executing.
        </p>
        <p className="text-gray-700 mb-4 sm:mb-4 text-sm sm:text-base lg:text-lg">
          <b>Formal Definition:</b> A closure is the combination of a function
          and its lexical environment within which that function was declared.
        </p>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`function outerFunction() {
  let outerVariable = "I'm from the outer scope";

  function innerFunction() {
    console.log(outerVariable); // Accessing a variable from the outer function
  }

  return innerFunction;
}

const closureFunction = outerFunction();
closureFunction(); // Output: "I'm from the outer scope"`}
          </code>
        </pre>
        <p className="text-gray-700 mb-6 sm:mb-4 text-sm sm:text-base lg:text-lg">
          In this example:
          <ul className="list-disc ml-4 sm:ml-6 space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <li className="text-sm sm:text-base lg:text-lg text-gray-700">
              <b>innerFunction</b> is a closure.
            </li>
            <li className="text-sm sm:text-base lg:text-lg text-gray-700">
              Even though <b>outerFunction</b> has finished executing,{" "}
              <b>innerFunction</b> retains access to <b>outerVariable</b>.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mb-4 sm:text-2xl lg:text-3xl sm:mb-4">
          How Closures Work
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-4 text-sm sm:text-base lg:text-lg">
          Closures leverage <b>lexical scoping</b>, meaning that functions are
          executed using the scope they were defined in, not the scope they are
          called in.
        </p>
        <p className="text-gray-700 mb-6 sm:mb-4 text-sm sm:text-base lg:text-lg">
          To better understand this, consider the following:
          <ul className="list-disc ml-4 sm:ml-6 space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <li className="text-sm sm:text-base lg:text-lg text-gray-700">
              When a function is defined, it captures references to the
              variables in its outer scope.
            </li>
            <li className="text-sm sm:text-base lg:text-lg text-gray-700">
              These references are preserved as long as the function exists,
              even if the outer function has returned.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mb-4 sm:text-2xl lg:text-3xl sm:mb-4">
          Applications of Closures
        </h2>
        <p className="text-gray-700 mb-6 sm:mb-4 text-sm sm:text-base lg:text-lg">
          Closures are widely used in real-world JavaScript programming. Here
          are some practical applications:
        </p>

        <h3 className="text-lg font-semibold mb-4 sm:text-xl lg:text-2xl sm:mb-4">
          1. Data Privacy
        </h3>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`function createCounter() {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount()); // 1
console.log(counter.decrement()); // 0`}
          </code>
        </pre>

        <h3 className="text-2xl font-semibold mb-4 sm:text-2xl lg:text-3xl sm:mb-4">
          2. Callbacks and Asynchronous Programming
        </h3>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`function fetchData(url) {
  const timestamp = Date.now(); // Captured in the closure

  setTimeout(() => {
    console.log(\`Fetched data from \${url} at \${timestamp}\`);
  }, 2000);
}

fetchData("https://example.com");`}
          </code>
        </pre>

        <h3 className="text-2xl font-semibold mb-4 sm:text-2xl lg:text-3xl sm:mb-4">
          3. Function Factories
        </h3>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15`}
          </code>
        </pre>

        <h3 className="text-2xl font-semibold mb-4 sm:text-2xl lg:text-3xl sm:mb-4">
          4. Event Handlers
        </h3>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`function handleClick(elementId) {
  let count = 0;

  document.getElementById(elementId).addEventListener("click", () => {
    count++;
    console.log(\`Button clicked \${count} times\`);
  });
}

handleClick("myButton");`}
          </code>
        </pre>

        <h3 className="text-2xl font-semibold mb-4 sm:text-2xl lg:text-3xl sm:mb-4">
          5. Memoization
        </h3>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}

const factorial = memoize(function (n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
});

console.log(factorial(5)); // 120
console.log(factorial(5)); // Cached result: 120`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold mb-4 sm:text-2xl lg:text-3xl sm:mb-4">
          Common Pitfalls
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-4 text-sm sm:text-base lg:text-lg">
          While closures are powerful, they can lead to issues if not used
          carefully:
          <ul className="list-disc ml-4 sm:ml-6 space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <li className="text-sm sm:text-base lg:text-lg text-gray-700">
              <b>Memory Leaks:</b> Retaining references to large objects
              unnecessarily can cause memory leaks.
            </li>
            <li className="text-sm sm:text-base lg:text-lg text-gray-700">
              <b>Unintended Behavior:</b> Closures might produce unexpected
              results in loops if the variable is not properly scoped.
            </li>
          </ul>
        </p>
        <pre className="bg-gray-100 p-2 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <code>
            {`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 3, 3, 3 (not 0, 1, 2)`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold mb-4 sm:text-2xl lg:text-3xl sm:mb-4">
          Final Thoughts
        </h2>
        <p className="text-gray-700 mb-6 sm:mb-4 text-sm sm:text-base lg:text-lg">
          Closures are an essential tool in any JavaScript developer's arsenal.
          Understanding how they work and how to use them effectively can
          elevate your coding skills and open up new possibilities for building
          efficient, maintainable applications.
        </p>
      </article>
    </div>
  );
}

export default Blog4;
