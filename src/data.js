// const questions = [
//   // ==========================================
//   // EASY TIER (Questions 1 - 8)
//   // Points: 10
//   // ==========================================
//   {
//     id: 1,
//     topic: "call, apply, bind",
//     difficulty: "easy",
//     points: 10,
//     question:
//       "What is the primary difference between `call()` and `apply()` in JavaScript?",
//     options: [
//       {
//         id: 0,
//         text: "`apply()` changes the prototype, while `call()` changes the context.",
//       },
//       {
//         id: 1,
//         text: "`apply()` takes an array of arguments, while `call()` takes them individually.",
//       },
//       {
//         id: 2,
//         text: "`call()` takes an array of arguments, while `apply()` takes them individually.",
//       },
//       {
//         id: 3,
//         text: "`call()` returns a new function, while `apply()` executes it immediately.",
//       },
//     ],
//     correctAnswer: 1,
//     hint: "Think of the 'A' in one of the methods as standing for 'Array'.",
//     successMessage: "That's right!",
//     errorMessage: "Not quite. Remember how arguments are passed.",
//     explanation:
//       "Both methods execute a function with a specified `this` context, but `apply` requires arguments to be passed as an array, whereas `call` accepts a comma-separated list.",
//   },
//   {
//     id: 2,
//     topic: "call, apply, bind",
//     difficulty: "easy",
//     points: 10,
//     question: "What does the `bind()` method return?",
//     options: [
//       { id: 0, text: "The result of the executed function." },
//       { id: 1, text: "An array of bound arguments." },
//       { id: 2, text: "A new function with the bound `this` context." },
//       { id: 3, text: "The global `window` object." },
//     ],
//     correctAnswer: 2,
//     hint: "Unlike call and apply, this method doesn't execute immediately.",
//     successMessage: "Spot on!",
//     errorMessage:
//       "Incorrect. Think about what you need to do to run the function later.",
//     explanation:
//       "`bind()` creates and returns a new function that, when called, has its `this` keyword set to the provided value.",
//   },
//   {
//     id: 3,
//     topic: "new",
//     difficulty: "easy",
//     points: 10,
//     question:
//       "Which of the following is the FIRST step that occurs when the `new` keyword is used?",
//     options: [
//       { id: 0, text: "The function executes immediately." },
//       { id: 1, text: "A new empty object is created." },
//       { id: 2, text: "The `this` keyword is bound to the global object." },
//       { id: 3, text: "It returns a newly constructed object." },
//     ],
//     correctAnswer: 1,
//     hint: "Before anything can be attached to `this`, a container needs to exist.",
//     successMessage: "Correct!",
//     errorMessage: "Oops! Look at the lifecycle of object creation.",
//     explanation:
//       "When you use `new`, JavaScript first creates a brand new, empty object before binding `this` to it and executing the constructor function.",
//   },
//   {
//     id: 4,
//     topic: "prototype",
//     difficulty: "easy",
//     points: 10,
//     question: "What is a 'prototype' in JavaScript?",
//     options: [
//       { id: 0, text: "A strict rule for naming variables." },
//       {
//         id: 1,
//         text: "An object from which other objects inherit properties.",
//       },
//       { id: 2, text: "A built-in function to copy arrays." },
//       { id: 3, text: "A method used to loop through objects." },
//     ],
//     correctAnswer: 1,
//     hint: "Think of it as a blueprint or parent for objects.",
//     successMessage: "Great job!",
//     errorMessage: "Not exactly. It has to do with inheritance.",
//     explanation:
//       "JavaScript is a prototype-based language. Every object has a hidden internal property that points to another object, its prototype, from which it inherits methods and properties.",
//   },
//   {
//     id: 5,
//     topic: "prototype",
//     difficulty: "easy",
//     points: 10,
//     question:
//       "How do you access the prototype of an object instance in modern JavaScript?",
//     options: [
//       { id: 0, text: "Object.getPrototype(obj)" },
//       { id: 1, text: "obj.prototype" },
//       { id: 2, text: "Object.getPrototypeOf(obj)" },
//       { id: 3, text: "obj.parent" },
//     ],
//     correctAnswer: 2,
//     hint: "It's a static method on the `Object` constructor.",
//     successMessage: "Exactly!",
//     errorMessage: "Almost. Look for the modern, standard method.",
//     explanation:
//       "`Object.getPrototypeOf()` is the standard way to retrieve the prototype of an object instance. The `.prototype` property only exists on constructor functions, not instances.",
//   },
//   {
//     id: 6,
//     topic: "polyfill",
//     difficulty: "easy",
//     points: 10,
//     question: "What is the primary purpose of a polyfill?",
//     options: [
//       { id: 0, text: "To make CSS animations run faster." },
//       { id: 1, text: "To compress JavaScript code for production." },
//       { id: 2, text: "To provide modern functionality on older browsers." },
//       { id: 3, text: "To secure APIs from cross-site scripting." },
//     ],
//     correctAnswer: 2,
//     hint: "It 'fills in' the gaps left by older technology.",
//     successMessage: "Correct!",
//     errorMessage: "Not quite. Think about browser compatibility.",
//     explanation:
//       "A polyfill is a piece of code (usually JavaScript) used to provide modern features on older browsers that do not natively support it.",
//   },
//   {
//     id: 7,
//     topic: "call, apply, bind",
//     difficulty: "easy",
//     points: 10,
//     question:
//       "Which object's methods are commonly borrowed using `call` or `apply` to handle the `arguments` object?",
//     options: [
//       { id: 0, text: "String" },
//       { id: 1, text: "Math" },
//       { id: 2, text: "Array" },
//       { id: 3, text: "Object" },
//     ],
//     correctAnswer: 2,
//     hint: "The `arguments` object looks like a list, but lacks methods like `.map()` or `.slice()`.",
//     successMessage: "Nailed it!",
//     errorMessage:
//       "Incorrect. What data structure is similar to the `arguments` object?",
//     explanation:
//       "The `arguments` object is array-like but lacks Array methods. Developers often borrow from `Array.prototype` (e.g., `Array.prototype.slice.call(arguments)`) to convert it into a true array.",
//   },
//   {
//     id: 8,
//     topic: "new",
//     difficulty: "easy",
//     points: 10,
//     question:
//       "By convention, how should a constructor function intended to be called with `new` be named?",
//     options: [
//       { id: 0, text: "camelCase" },
//       { id: 1, text: "PascalCase (Capitalized first letter)" },
//       { id: 2, text: "UPPERCASE" },
//       { id: 3, text: "snake_case" },
//     ],
//     correctAnswer: 1,
//     hint: "Look at built-in constructors like `Date`, `Array`, or `Object`.",
//     successMessage: "Good catch!",
//     errorMessage: "Not the standard convention.",
//     explanation:
//       "It is a standard JavaScript convention to capitalize the first letter of a constructor function to visually distinguish it from regular functions.",
//   },

//   // ==========================================
//   // MEDIUM TIER (Questions 9 - 17)
//   // Points: 20
//   // ==========================================
//   {
//     id: 9,
//     topic: "call, apply, bind",
//     difficulty: "medium",
//     points: 20,
//     question:
//       "How can you use `Math.max()` to find the highest number in an array `[1, 5, 3]`?",
//     options: [
//       { id: 0, text: "Math.max([1, 5, 3])" },
//       { id: 1, text: "Math.max.call(null, [1, 5, 3])" },
//       { id: 2, text: "Math.max.apply(null, [1, 5, 3])" },
//       { id: 3, text: "Math.max.bind(null, [1, 5, 3])()" },
//     ],
//     correctAnswer: 2,
//     hint: "Math.max doesn't take an array, it takes spread numbers. Which method unwraps arrays?",
//     successMessage: "Perfectly executed!",
//     errorMessage:
//       "That won't work. `Math.max` expects individual arguments, not an array.",
//     explanation:
//       "`apply` takes an array of arguments and spreads them as individual arguments to the function. `Math.max(1, 5, 3)` is what ends up being executed.",
//   },
//   {
//     id: 10,
//     topic: "call, apply, bind",
//     difficulty: "medium",
//     points: 20,
//     question:
//       "What happens if you try to bind a function that has already been bound using `bind()`?",
//     options: [
//       { id: 0, text: "The new context overwrites the old one." },
//       { id: 1, text: "It throws a TypeError." },
//       {
//         id: 2,
//         text: "The original bound context is retained; the new context is ignored.",
//       },
//       { id: 3, text: "The function becomes unbound." },
//     ],
//     correctAnswer: 2,
//     hint: "Once a function is bound, its context is locked in permanently.",
//     successMessage: "You got it!",
//     errorMessage: "Incorrect. JavaScript is strict about bound contexts.",
//     explanation:
//       "A bound function cannot be re-bound. The original `this` context provided in the first `bind()` call is permanent and cannot be overridden by subsequent `bind()` or `call`/`apply` invocations.",
//   },
//   {
//     id: 11,
//     topic: "new",
//     difficulty: "medium",
//     points: 20,
//     question:
//       "If a constructor function called with `new` explicitly returns an object, what is the result of the `new` expression?",
//     options: [
//       { id: 0, text: "The newly created instance (this)." },
//       { id: 1, text: "The explicitly returned object." },
//       { id: 2, text: "undefined" },
//       { id: 3, text: "It throws a syntax error." },
//     ],
//     correctAnswer: 1,
//     hint: "Returning primitives is ignored, but returning reference types changes things.",
//     successMessage: "Excellent!",
//     errorMessage: "Not quite. Objects take precedence over `this`.",
//     explanation:
//       "If a constructor function returns a non-primitive value (an object, array, function), that object becomes the result of the entire `new` expression, overriding the default behavior of returning `this`.",
//   },
//   {
//     id: 12,
//     topic: "new",
//     difficulty: "medium",
//     points: 20,
//     question:
//       "What happens if you call a constructor function without the `new` keyword?",
//     options: [
//       { id: 0, text: "It behaves exactly the same way." },
//       { id: 1, text: "It throws an error immediately." },
//       {
//         id: 2,
//         text: "`this` refers to the global object (in non-strict mode), and it likely returns `undefined`.",
//       },
//       {
//         id: 3,
//         text: "It automatically instantiates an empty object anyway.",
//       },
//     ],
//     correctAnswer: 2,
//     hint: "Without `new`, it acts as a regular function call.",
//     successMessage: "Spot on!",
//     errorMessage: "Careful! Missing `new` can cause nasty bugs.",
//     explanation:
//       "Without `new`, no new object is created. `this` points to the global object (window) in non-strict mode, polluting the global namespace, and the function will return `undefined` unless explicitly returning something.",
//   },
//   {
//     id: 13,
//     topic: "prototype",
//     difficulty: "medium",
//     points: 20,
//     question: "What does the `__proto__` property point to?",
//     options: [
//       { id: 0, text: "The constructor function itself." },
//       {
//         id: 1,
//         text: "The prototype object of the constructor function that created the instance.",
//       },
//       { id: 2, text: "The global `Object.prototype`." },
//       { id: 3, text: "It is an array of all inherited methods." },
//     ],
//     correctAnswer: 1,
//     hint: "It acts as a reference link back to its creator's blueprint.",
//     successMessage: "Correct! You know your prototypes.",
//     errorMessage: "Incorrect. Think about the prototype chain.",
//     explanation:
//       "The `__proto__` property (dunder proto) is an internal link on an object instance that points to the `.prototype` property of the constructor function that was used to instantiate it.",
//   },
//   {
//     id: 14,
//     topic: "prototype",
//     difficulty: "medium",
//     points: 20,
//     question:
//       "What is the result of `Object.getPrototypeOf(Object.prototype)`?",
//     options: [
//       { id: 0, text: "Object" },
//       { id: 1, text: "Function.prototype" },
//       { id: 2, text: "null" },
//       { id: 3, text: "undefined" },
//     ],
//     correctAnswer: 2,
//     hint: "This represents the absolute end of the prototype chain.",
//     successMessage: "You reached the end of the chain!",
//     errorMessage: "Not quite. What happens when there are no more parents?",
//     explanation:
//       "`Object.prototype` is the top-level object in the JS prototype chain. Because it doesn't inherit from anything else, its prototype is `null`.",
//   },
//   {
//     id: 15,
//     topic: "polyfill",
//     difficulty: "medium",
//     points: 20,
//     question:
//       "What is the standard first step when writing a polyfill for a method like `Array.prototype.includes`?",
//     options: [
//       { id: 0, text: "Delete the existing method." },
//       { id: 1, text: "Check if `Array.prototype.includes` is undefined." },
//       { id: 2, text: "Import Babel to handle it." },
//       { id: 3, text: "Rewrite all Array methods to ensure compatibility." },
//     ],
//     correctAnswer: 1,
//     hint: "You shouldn't fix what isn't broken.",
//     successMessage: "Good programming practice!",
//     errorMessage: "Wait, what if the browser already supports it natively?",
//     explanation:
//       "Before adding a polyfill, you must always check if the method already exists natively (e.g., `if (!Array.prototype.includes)`) to avoid overwriting a faster, native browser implementation.",
//   },
//   {
//     id: 16,
//     topic: "polyfill",
//     difficulty: "medium",
//     points: 20,
//     question: "Which of the following CANNOT be fully polyfilled?",
//     options: [
//       { id: 0, text: "Promises" },
//       { id: 1, text: "Array.prototype.map" },
//       { id: 2, text: "New syntax like Arrow Functions (=>)" },
//       { id: 3, text: "Object.assign" },
//     ],
//     correctAnswer: 2,
//     hint: "Polyfills add missing methods/objects, not core language grammar.",
//     successMessage: "Exactly! Syntax requires compilation.",
//     errorMessage:
//       "Incorrect. Think about what JavaScript can evaluate vs parse.",
//     explanation:
//       "A polyfill can add missing methods or objects, but it cannot change the JavaScript parser to understand new syntax (like arrow functions or `let`/`const`). Syntax changes require a transpiler like Babel.",
//   },
//   {
//     id: 17,
//     topic: "call, apply, bind",
//     difficulty: "medium",
//     points: 20,
//     question:
//       "What will `console.log` output: `const f = () => { console.log(this.name); }; f.call({ name: 'Alice' });` (Assuming global name is undefined)",
//     options: [
//       { id: 0, text: "'Alice'" },
//       { id: 1, text: "undefined" },
//       { id: 2, text: "null" },
//       { id: 3, text: "TypeError" },
//     ],
//     correctAnswer: 1,
//     hint: "Look closely at the type of function being used.",
//     successMessage: "Great job! You caught the arrow function trap.",
//     errorMessage: "Caught ya! Arrow functions handle `this` differently.",
//     explanation:
//       "Arrow functions do not have their own `this` binding; they inherit it from the enclosing lexical scope. Therefore, `call`, `apply`, or `bind` cannot change the `this` context of an arrow function.",
//   },

//   // ==========================================
//   // HARD TIER (Questions 18 - 25)
//   // Points: 30
//   // ==========================================
//   {
//     id: 18,
//     topic: "call, apply, bind",
//     difficulty: "hard",
//     points: 30,
//     question:
//       "When creating a basic polyfill for `bind`, which core concept is primarily used to return the execution for later?",
//     options: [
//       { id: 0, text: "Promises" },
//       { id: 1, text: "Closures" },
//       { id: 2, text: "Generators" },
//       { id: 3, text: "Getters/Setters" },
//     ],
//     correctAnswer: 1,
//     hint: "The returned function must remember the context and arguments passed initially.",
//     successMessage: "Nailed it!",
//     errorMessage:
//       "Not quite. Think about how variables are 'remembered' inside functions.",
//     explanation:
//       "`bind` returns a new function. To remember the original `this` context and any initial arguments, the polyfill relies heavily on closures, capturing those variables in its lexical environment.",
//   },
//   {
//     id: 19,
//     topic: "new",
//     difficulty: "hard",
//     points: 30,
//     question:
//       "If you call `new` on a function that has been bound with `.bind()`, what happens to the bound `this` context?",
//     options: [
//       { id: 0, text: "The `new` operator throws a TypeError." },
//       {
//         id: 1,
//         text: "The bound context is respected; the new object is not created.",
//       },
//       {
//         id: 2,
//         text: "The `new` operator ignores the bound context and creates a new object.",
//       },
//       { id: 3, text: "The new object inherits from the bound context." },
//     ],
//     correctAnswer: 2,
//     hint: "The `new` keyword is extremely forceful in JavaScript.",
//     successMessage: "Correct! `new` overrides `bind`.",
//     errorMessage:
//       "Incorrect. The `new` keyword behaves uniquely with bound functions.",
//     explanation:
//       "The `new` operator has higher precedence and is designed to override a hard binding. If you use `new` on a bound function, the hard-bound `this` is ignored, and a new object is instantiated normally.",
//   },
//   {
//     id: 20,
//     topic: "new",
//     difficulty: "hard",
//     points: 30,
//     question:
//       "Which code snippet best mimics the internal steps of the `new` operator manually?",
//     options: [
//       { id: 0, text: "const obj = {}; fn.call(obj); return obj;" },
//       {
//         id: 1,
//         text: "const obj = Object.create(fn.prototype); const res = fn.call(obj); return res instanceof Object ? res : obj;",
//       },
//       { id: 2, text: "const obj = Object.assign({}, fn); return obj;" },
//       {
//         id: 3,
//         text: "const obj = Object.create(fn); return obj.call(this);",
//       },
//     ],
//     correctAnswer: 1,
//     hint: "It involves Object.create, applying the function, and checking if an object was returned.",
//     successMessage: "Brilliant! That's exactly how `new` works under the hood.",
//     errorMessage:
//       "Not quite complete. Look for the option that handles prototype linking and return overrides.",
//     explanation:
//       "`new` does 3 main things: creates an object linked to the prototype `Object.create(fn.prototype)`, calls the function with that object `fn.call(obj)`, and returns the object (unless the function explicitly returns a different reference type).",
//   },
//   {
//     id: 21,
//     topic: "prototype",
//     difficulty: "hard",
//     points: 30,
//     question:
//       "What is the result of creating an object via `Object.create(null)`?",
//     options: [
//       { id: 0, text: "A standard empty object `{}`." },
//       { id: 1, text: "It throws a TypeError." },
//       {
//         id: 2,
//         text: "An object with absolutely no prototype, not even `Object.prototype`.",
//       },
//       { id: 3, text: "An object whose prototype points to `window`." },
//     ],
//     correctAnswer: 2,
//     hint: "Think of it as an absolute blank slate.",
//     successMessage: "Correct! A true 'dictionary' object.",
//     errorMessage: "Incorrect. Try logging it in the console sometime.",
//     explanation:
//       "`Object.create(null)` creates an entirely blank object. Because it doesn't inherit from `Object.prototype`, it does not have built-in methods like `.toString()` or `.hasOwnProperty()`. It's often used for pure dictionary/map structures.",
//   },
//   {
//     id: 22,
//     topic: "prototype",
//     difficulty: "hard",
//     points: 30,
//     question:
//       "If `obj.hasOwnProperty('name')` is false, but `obj.name` returns 'Alice', where is 'name' located?",
//     options: [
//       { id: 0, text: "In the global scope." },
//       { id: 1, text: "Somewhere up the prototype chain of `obj`." },
//       { id: 2, text: "It's a getter method on `obj`." },
//       { id: 3, text: "It's an undeclared variable." },
//     ],
//     correctAnswer: 1,
//     hint: "hasOwnProperty only checks the immediate object, not its ancestors.",
//     successMessage: "Excellent deduction!",
//     errorMessage: "Not quite. Think about how property lookup works.",
//     explanation:
//       "When you access a property, JavaScript looks at the object itself. If it doesn't find it (`hasOwnProperty` is false), it traverses up the prototype chain until it finds it or reaches `null`.",
//   },
//   {
//     id: 23,
//     topic: "polyfill",
//     difficulty: "hard",
//     points: 30,
//     question:
//       "When writing a polyfill for `Array.prototype.reduce`, what edge case MUST you handle regarding the initial array?",
//     options: [
//       { id: 0, text: "Calling reduce on a Map or Set." },
//       {
//         id: 1,
//         text: "Calling reduce on an empty array with no initial value provided.",
//       },
//       { id: 2, text: "Array containing negative numbers." },
//       { id: 3, text: "Calling reduce with an arrow function." },
//     ],
//     correctAnswer: 1,
//     hint: "What happens natively if you try to reduce an empty list without a starting point?",
//     successMessage: "Spot on! Error handling is crucial in polyfills.",
//     errorMessage:
//       "Incorrect. Think about mathematical or logical impossibilities.",
//     explanation:
//       "A proper `reduce` polyfill must throw a `TypeError` if the array is empty and no `initialValue` is provided, matching the native ECMAScript specification.",
//   },
//   {
//     id: 24,
//     topic: "call, apply, bind",
//     difficulty: "hard",
//     points: 30,
//     question:
//       "How can you implement a custom `.bind()` polyfill that handles currying (partial application)?",
//     options: [
//       { id: 0, text: "By using `eval()` to parse arguments." },
//       {
//         id: 1,
//         text: "By capturing `arguments` in the outer function, and concatenating them with `arguments` in the inner returned function.",
//       },
//       { id: 2, text: "By using `setTimeout` to delay execution." },
//       {
//         id: 3,
//         text: "By modifying the prototype of the `Arguments` object.",
//       },
//     ],
//     correctAnswer: 1,
//     hint: "You need to combine arguments from the initial bind call with arguments from the later execution call.",
//     successMessage: "Correct! That is the essence of partial application.",
//     errorMessage: "Incorrect. Look closely at how closures capture variables.",
//     explanation:
//       "A true `bind` polyfill takes initial arguments `const boundArgs = Array.prototype.slice.call(arguments, 1);` and returns a function that takes later arguments `const laterArgs = Array.prototype.slice.call(arguments);`, applying both: `fn.apply(context, boundArgs.concat(laterArgs))`.",
//   },
//   {
//     id: 25,
//     topic: "prototype",
//     difficulty: "hard",
//     points: 30,
//     question: "What is 'Prototype Shadowing'?",
//     options: [
//       {
//         id: 0,
//         text: "When a subclass hides the methods of a parent class by using private fields.",
//       },
//       {
//         id: 1,
//         text: "When an object has a property with the exact same name as a property on its prototype, causing the object's property to be accessed instead.",
//       },
//       {
//         id: 2,
//         text: "When multiple prototypes reference the exact same memory space.",
//       },
//       {
//         id: 3,
//         text: "When a prototype is removed using the `delete` operator.",
//       },
//     ],
//     correctAnswer: 1,
//     hint: "Think about what happens when an object 'stands in front' of its parent.",
//     successMessage: "You mastered the prototype chain!",
//     errorMessage: "Not quite. It involves naming collisions.",
//     explanation:
//       "Property shadowing occurs when a property is defined on the object itself that shares a name with a property on its prototype chain. JavaScript stops searching as soon as it finds the first match on the object, 'shadowing' the prototype's version.",
//   },
// ];

const questions = [
  {
    id: 1,
    topic: "call, apply, bind",
    difficulty: "easy",
    points: 10,
    question:
      "What is the primary difference between `call()` and `apply()` in JavaScript?",
    options: [
      {
        id: 0,
        text: "`apply()` changes the prototype, while `call()` changes the context.",
      },
      {
        id: 1,
        text: "`apply()` takes an array of arguments, while `call()` takes them individually.",
      },
      {
        id: 2,
        text: "`call()` takes an array of arguments, while `apply()` takes them individually.",
      },
      {
        id: 3,
        text: "`call()` returns a new function, while `apply()` executes it immediately.",
      },
    ],
    correctAnswer: 1,
    hint: "Think of the 'A' in one of the methods as standing for 'Array'.",
    successMessage: "That's right!",
    errorMessage: "Not quite. Remember how arguments are passed.",
    explanation:
      "Both methods execute a function with a specified `this` context, but `apply` requires arguments to be passed as an array, whereas `call` accepts a comma-separated list.",
  },
  {
    id: 2,
    topic: "call, apply, bind",
    difficulty: "easy",
    points: 10,
    question: "What does the `bind()` method return?",
    options: [
      { id: 0, text: "The result of the executed function." },
      { id: 1, text: "An array of bound arguments." },
      { id: 2, text: "A new function with the bound `this` context." },
      { id: 3, text: "The global `window` object." },
    ],
    correctAnswer: 2,
    hint: "Unlike call and apply, this method doesn't execute immediately.",
    successMessage: "Spot on!",
    errorMessage:
      "Incorrect. Think about what you need to do to run the function later.",
    explanation:
      "`bind()` creates and returns a new function that, when called, has its `this` keyword set to the provided value.",
  },
  {
    id: 3,
    topic: "new",
    difficulty: "easy",
    points: 10,
    question:
      "Which of the following is the FIRST step that occurs when the `new` keyword is used?",
    options: [
      { id: 0, text: "The function executes immediately." },
      { id: 1, text: "A new empty object is created." },
      { id: 2, text: "The `this` keyword is bound to the global object." },
      { id: 3, text: "It returns a newly constructed object." },
    ],
    correctAnswer: 1,
    hint: "Before anything can be attached to `this`, a container needs to exist.",
    successMessage: "Correct!",
    errorMessage: "Oops! Look at the lifecycle of object creation.",
    explanation:
      "When you use `new`, JavaScript first creates a brand new, empty object before binding `this` to it and executing the constructor function.",
  },
  {
    id: 4,
    topic: "prototype",
    difficulty: "easy",
    points: 10,
    question: "What is a 'prototype' in JavaScript?",
    options: [
      { id: 0, text: "A strict rule for naming variables." },
      {
        id: 1,
        text: "An object from which other objects inherit properties.",
      },
      { id: 2, text: "A built-in function to copy arrays." },
      { id: 3, text: "A method used to loop through objects." },
    ],
    correctAnswer: 1,
    hint: "Think of it as a blueprint or parent for objects.",
    successMessage: "Great job!",
    errorMessage: "Not exactly. It has to do with inheritance.",
    explanation:
      "JavaScript is a prototype-based language. Every object has a hidden internal property that points to another object, its prototype, from which it inherits methods and properties.",
  },
  {
    id: 5,
    topic: "prototype",
    difficulty: "easy",
    points: 10,
    question:
      "How do you access the prototype of an object instance in modern JavaScript?",
    options: [
      { id: 0, text: "Object.getPrototype(obj)" },
      { id: 1, text: "obj.prototype" },
      { id: 2, text: "Object.getPrototypeOf(obj)" },
      { id: 3, text: "obj.parent" },
    ],
    correctAnswer: 2,
    hint: "It's a static method on the `Object` constructor.",
    successMessage: "Exactly!",
    errorMessage: "Almost. Look for the modern, standard method.",
    explanation:
      "`Object.getPrototypeOf()` is the standard way to retrieve the prototype of an object instance. The `.prototype` property only exists on constructor functions, not instances.",
  },
];

export default questions;
