1. What is the difference between var, let, and const?

var, let and const are used to declare variables in JavaScript. The main difference is how they behave in scope and reassignment. var is the older way and it is function scoped, so it can sometimes create problems in large programs. le` is block scoped and it can be changed later but cannot be declared again in the same scope. const is also block scoped but the value cannot be reassigned after it is declared. In modern JavaScript developers mostly use let and const instead of var.

---

2. What is the spread operator (...)?

The spread operator is written using three dots .... It is used to expand elements from an array or properties from an object. It helps to copy or combine arrays and objects in a simple way. The spread operator makes the code cleaner and easier to read compared to older methods.

---

3. What is the difference between map(), filter(), and forEach()?

These are JavaScript array methods used to work with arrays. forEach() is used to loop through each element of an array and perform some action, but it does not return a new array. map() is used when we want to change each element and create a new array with those changes.`filter() is used when we want to select only some elements from an array based on a condition.

---

4. What is an arrow function?

An arrow function is a shorter way to write functions in JavaScript. It was introduced in ES6 to make code simpler and more readable. Arrow functions use the => syntax instead of the traditional function keyword. They are commonly used in modern JavaScript especially with array methods like map, filter, and forEach.

---

5. What are template literals?

Template literals are a way to create strings in JavaScript using backticks instead of normal quotes. They allow variables and expressions to be inserted directly inside the string. This makes it easier to combine text and variables and is very useful when generating dynamic content in JavaScript.
