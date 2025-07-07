import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Tags from "../components/ui/Tags";

export default function BlogPage() {
    const blog = {
        title: "React: A JavaScript Library for Building User Interfaces",
        createdAt: "06/07/2025",
        author: "Bakshidevs",
        excerpt: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of their applications efficiently. React's virtual DOM and component-based architecture make it a popular choice for modern web development.",
        tags: ["JavaScript", "React", "Web Development"],
        slug: "react-js-library",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: `
# React: A JavaScript Library for Building User Interfaces

## Table of Contents

1. [Introduction](#introduction)  
2. [What is React?](#what-is-react)  
3. [Why Use React?](#why-use-react)  
4. [React vs Other Frameworks](#react-vs-other-frameworks)  
5. [Core Concepts in React](#core-concepts-in-react)  
   - JSX  
   - Components  
   - Props  
   - State  
   - Lifecycle Methods  
6. [Hooks: A Modern Take](#hooks-a-modern-take)  
7. [State Management in React](#state-management-in-react)  
8. [Routing in React](#routing-in-react)  
9. [Styling in React](#styling-in-react)  
10. [React Developer Tools](#react-developer-tools)  
11. [Common Mistakes to Avoid](#common-mistakes-to-avoid)  
12. [Best Practices](#best-practices)  
13. [React Ecosystem](#react-ecosystem)  
14. [Conclusion](#conclusion)

## Introduction

In the world of modern web development, one name reigns supreme — **React**. Whether you’re building a simple portfolio site or a complex enterprise-grade web app, React is often the go-to choice. Developed and maintained by Facebook, React has become one of the most popular JavaScript libraries for building **interactive user interfaces**.

But what makes React so powerful, and why do developers across the world swear by it? In this post, we’ll dive deep into the heart of React, understand its core concepts, see how it compares to other tools, and discover why it’s a must-learn for any serious frontend developer.

## What is React?

> _“React is a JavaScript library for building user interfaces.”_ — React Docs

React is **not a framework**, unlike Angular or Vue. Instead, it focuses on the **view layer** of an application — the part users interact with. It allows developers to build **reusable UI components**, manage state efficiently, and render dynamic data with ease.

React was **released by Facebook in 2013** and is now open-source with a massive global community contributing to its development and growth.

## Why Use React?

Here are some solid reasons why React is so widely adopted:

- **Component-Based Architecture**  
- **Virtual DOM**  
- **Declarative Syntax**  
- **Rich Ecosystem**  
- **Strong Community and Support**

## React vs Other Frameworks

| Feature               | React               | Angular            | Vue                 |
|----------------------|---------------------|---------------------|----------------------|
| Type                 | Library             | Framework          | Framework           |
| Language             | JavaScript (JSX)    | TypeScript         | JavaScript          |
| Learning Curve       | Moderate            | Steep              | Easy to Moderate    |
| DOM                  | Virtual DOM         | Real DOM           | Virtual DOM         |
| State Management     | External Libraries  | Built-in (RxJS)    | Vuex (official)     |
| Popularity           | ⭐⭐⭐⭐⭐               | ⭐⭐⭐                | ⭐⭐⭐⭐               |

## Core Concepts in React

### JSX (JavaScript XML)

~~~jsx
const element = <h1>Hello, world!</h1>;
~~~

### Components

~~~jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
~~~

### Props

~~~jsx
<Welcome name="Bakshi" />
~~~

### State

~~~jsx
const [count, setCount] = useState(0);
~~~

### Lifecycle Methods

Use hooks like \`useEffect()\`.

## Hooks: A Modern Take

~~~jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return <p>Timer: {count}</p>;
}
~~~

## State Management in React

- **Lifting State Up**
- **Context API**
- **Redux, Zustand, Recoil, MobX**

## Routing in React

~~~jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
~~~

## Styling in React

~~~jsx
function Button() {
  return <button className="bg-blue-500 text-white px-4 py-2 rounded">Click Me</button>;
}
~~~

## React Developer Tools

Inspect component tree, props, state, and profile performance.

## Common Mistakes to Avoid

- Direct DOM manipulation
- Mutating state directly
- Not using keys in lists
- Too much prop drilling

## Best Practices

- Keep components small and focused
- Use functional components and hooks
- Name components with PascalCase
- Organize your file structure

## React Ecosystem

| Tool | Purpose |
|------|---------|
| React Router | Routing |
| Redux, Zustand | State Management |
| Formik, React Hook Form | Form Handling |
| Tailwind, Styled-components | Styling |
| Framer Motion | Animations |
| React Query | Data Fetching |
| Jest, React Testing Library | Testing |

## Conclusion

React has redefined how we build web applications. Its declarative, component-driven approach makes UI development scalable, maintainable, and delightful. Whether you're a beginner just dipping your toes or a seasoned developer building high-performance SPAs, React has something for everyone.

> In the wise words of the React team: _“Learn once, write anywhere.”_

Happy coding! ⚛️
`,
        readingTime: "5 min read",
        isFeatured: true,
        isPublished: true,
        isDraft: false,
        isArchived: false,
    }
    return (
        <div className="my-12 w-full">
            <img aria-label="blog-thumbani" className="h-56 w-full object-center object-cover" src={blog.image} alt={blog.title} />
            <div aria-label="blog-body" className="w-2/3 mx-auto my-12">
                <h2 className="font-bold text-3xl">{blog.title}</h2>
                <p className="text-secondary/60 dark:text-primary/60 text-sm mt-2">
                    {new Date(blog.createdAt).toLocaleDateString()} by {blog.author} - {blog.readingTime}
                </p>
                <p className="text-secondary/60 dark:text-primary/60 mt-4">{blog.excerpt}</p>
                <div className="mt-6 prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {blog.content}
                    </ReactMarkdown>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {blog.tags.map((tag, index) => (
                        <Tags key={index} tag={tag} />
                    ))}
                </div>
            </div>
        </div>
    )
}
