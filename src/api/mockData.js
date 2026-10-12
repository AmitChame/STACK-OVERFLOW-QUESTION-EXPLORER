// Mock dataset maintaining 100% compatibility with FA1 sample questions
// enriched with realistic Stack Overflow metadata (HTML bodies, tags, authors, answers, timestamps)

export const MOCK_QUESTIONS = [
  {
    id: 1,
    question_id: 1,
    title: "What is React?",
    category: "React",
    tags: ["reactjs", "javascript", "frontend", "ui"],
    score: 12,
    votes: 12,
    answer_count: 4,
    answers: 4,
    view_count: 3420,
    creation_date: 1672531199,
    last_activity_date: 1696118400,
    is_answered: true,
    owner: {
      display_name: "Amit Chame",
      reputation: 1540,
      profile_image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
    },
    body: "<p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'.</p><p>Key concepts include JSX, virtual DOM, and unidirectional data flow.</p>",
    description: "React is a JavaScript library used to build user interfaces using components.",
    link: "https://stackoverflow.com/questions/1/what-is-react",
    mockAnswers: [
      {
        answer_id: 101,
        is_accepted: true,
        score: 25,
        creation_date: 1672534799,
        owner: {
          display_name: "Dan Abramov Fan",
          reputation: 12500,
          profile_image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
        },
        body: "<p>React was created by Jordan Walke at Meta (Facebook). Its core superpower is the <strong>Virtual DOM</strong> diffing algorithm and component-based reusability.</p><code>function App() { return &lt;h1&gt;Hello React&lt;/h1&gt;; }</code>"
      },
      {
        answer_id: 102,
        is_accepted: false,
        score: 9,
        creation_date: 1672621199,
        owner: {
          display_name: "FrontendPro",
          reputation: 4320
        },
        body: "<p>Unlike Angular or Vue which provide full framework solutions, React focuses strictly on the View layer in the MVC pattern.</p>"
      }
    ]
  },
  {
    id: 2,
    question_id: 2,
    title: "What is a JSX in React?",
    category: "React",
    tags: ["reactjs", "jsx", "javascript"],
    score: 8,
    votes: 8,
    answer_count: 3,
    answers: 3,
    view_count: 1850,
    creation_date: 1675209600,
    last_activity_date: 1698796800,
    is_answered: true,
    owner: {
      display_name: "Priya Sharma",
      reputation: 820
    },
    body: "<p>JSX stands for JavaScript XML. It is a syntax extension to JavaScript recommended by React for describing what the UI should look like.</p><p>Is JSX required to use React?</p>",
    description: "JSX is a syntax that lets us write HTML like code inside JavaScript files.",
    link: "https://stackoverflow.com/questions/2/what-is-jsx",
    mockAnswers: [
      {
        answer_id: 201,
        is_accepted: true,
        score: 18,
        creation_date: 1675213200,
        owner: {
          display_name: "ReactGuru",
          reputation: 8900
        },
        body: "<p>No, JSX is not strictly required, but it makes React code much more readable. Under the hood, Babel compiles JSX down to <code>React.createElement()</code> calls.</p>"
      }
    ]
  },
  {
    id: 3,
    question_id: 3,
    title: "What is the difference between let and var?",
    category: "JavaScript",
    tags: ["javascript", "ecmascript-6", "scope", "variables"],
    score: 15,
    votes: 15,
    answer_count: 6,
    answers: 6,
    view_count: 8200,
    creation_date: 1669852800,
    last_activity_date: 1700000000,
    is_answered: true,
    owner: {
      display_name: "Rahul Verma",
      reputation: 3400
    },
    body: "<p>I often see tutorials switching between <code>var</code> and <code>let</code>. What are the fundamental differences in terms of hoisting, scope, and re-declaration?</p>",
    description: "var is function scoped while let is block scoped. let was introduced in ES6.",
    link: "https://stackoverflow.com/questions/3/difference-between-let-and-var",
    mockAnswers: [
      {
        answer_id: 301,
        is_accepted: true,
        score: 45,
        creation_date: 1669856400,
        owner: {
          display_name: "EcmaExpert",
          reputation: 28400
        },
        body: "<p>Three major differences:</p><ul><li><strong>Scope:</strong> <code>var</code> is function-scoped; <code>let</code> is block-scoped (enclosed in <code>{}</code>).</li><li><strong>Hoisting:</strong> <code>var</code> variables are hoisted and initialized with <code>undefined</code>; <code>let</code> is hoisted into the Temporal Dead Zone (TDZ).</li><li><strong>Re-declaration:</strong> <code>var</code> can be re-declared in the same scope; <code>let</code> throws a SyntaxError.</li></ul>"
      }
    ]
  },
  {
    id: 4,
    question_id: 4,
    title: "What is an array in JavaScript?",
    category: "JavaScript",
    tags: ["javascript", "arrays", "data-structures"],
    score: 10,
    votes: 10,
    answer_count: 5,
    answers: 5,
    view_count: 2900,
    creation_date: 1677628800,
    last_activity_date: 1699000000,
    is_answered: true,
    owner: {
      display_name: "Sneha Patil",
      reputation: 910
    },
    body: "<p>How do JavaScript arrays differ from arrays in statically typed languages like C++ or Java?</p>",
    description: "An array is a special variable that can hold more than one value at a time.",
    link: "https://stackoverflow.com/questions/4/what-is-an-array-in-javascript",
    mockAnswers: [
      {
        answer_id: 401,
        is_accepted: true,
        score: 14,
        creation_date: 1677632400,
        owner: {
          display_name: "JSNinja",
          reputation: 6700
        },
        body: "<p>In JavaScript, arrays are resizable and can contain a mix of different data types. Internally, JS arrays are objects with integer keys and a special <code>length</code> property.</p>"
      }
    ]
  },
  {
    id: 5,
    question_id: 5,
    title: "What are Python lists?",
    category: "Python",
    tags: ["python", "list", "data-structures"],
    score: 9,
    votes: 9,
    answer_count: 2,
    answers: 2,
    view_count: 2150,
    creation_date: 1680307200,
    last_activity_date: 1697500000,
    is_answered: true,
    owner: {
      display_name: "Karan Joshi",
      reputation: 560
    },
    body: "<p>What is a Python list and how is it different from a tuple?</p>",
    description: "A list in Python is used to store multiple items in a single variable.",
    link: "https://stackoverflow.com/questions/5/what-are-python-lists",
    mockAnswers: [
      {
        answer_id: 501,
        is_accepted: true,
        score: 16,
        creation_date: 1680310800,
        owner: {
          display_name: "PyCoder",
          reputation: 11200
        },
        body: "<p>Python lists are mutable, ordered collections defined with square brackets <code>[1, 2, 3]</code>. Unlike tuples, you can append, insert, remove, or modify items in place.</p>"
      }
    ]
  },
  {
    id: 6,
    question_id: 6,
    title: "How does a for loop work in Python?",
    category: "Python",
    tags: ["python", "loops", "iteration"],
    score: 7,
    votes: 7,
    answer_count: 3,
    answers: 3,
    view_count: 1980,
    creation_date: 1682899200,
    last_activity_date: 1698200000,
    is_answered: true,
    owner: {
      display_name: "Neha Kulkarni",
      reputation: 780
    },
    body: "<p>Can someone explain how iteration works behind the scenes in a Python for loop?</p>",
    description: "A for loop is used to repeat a block of code for each item in a sequence.",
    link: "https://stackoverflow.com/questions/6/for-loop-python",
    mockAnswers: [
      {
        answer_id: 601,
        is_accepted: true,
        score: 11,
        creation_date: 1682902800,
        owner: {
          display_name: "GuidoFan",
          reputation: 9500
        },
        body: "<p>Python for loops operate on <em>iterables</em> using the iterator protocol. Python calls <code>iter()</code> to obtain an iterator, then repeatedly calls <code>next()</code> until <code>StopIteration</code> is raised.</p>"
      }
    ]
  },
  {
    id: 7,
    question_id: 7,
    title: "What is useState in React?",
    category: "React",
    tags: ["reactjs", "react-hooks", "state-management"],
    score: 11,
    votes: 11,
    answer_count: 4,
    answers: 4,
    view_count: 4100,
    creation_date: 1685577600,
    last_activity_date: 1699900000,
    is_answered: true,
    owner: {
      display_name: "Aditya Deshmukh",
      reputation: 1920
    },
    body: "<p>How does the useState hook manage component re-renders when updating state values?</p>",
    description: "useState is a React hook that lets us add state to a functional component.",
    link: "https://stackoverflow.com/questions/7/what-is-usestate-in-react",
    mockAnswers: [
      {
        answer_id: 701,
        is_accepted: true,
        score: 22,
        creation_date: 1685581200,
        owner: {
          display_name: "HookMaster",
          reputation: 14200
        },
        body: "<p><code>useState</code> returns a pair: the current state value and a state updater function. When you call the updater, React schedules a re-render of the component with the new state value.</p><code>const [count, setCount] = useState(0);</code>"
      }
    ]
  },
  {
    id: 8,
    question_id: 8,
    title: "What is a function in JavaScript?",
    category: "JavaScript",
    tags: ["javascript", "functions", "closures"],
    score: 6,
    votes: 6,
    answer_count: 2,
    answers: 2,
    view_count: 1450,
    creation_date: 1688169600,
    last_activity_date: 1696000000,
    is_answered: true,
    owner: {
      display_name: "Vikram Shinde",
      reputation: 490
    },
    body: "<p>What is the difference between function declarations, function expressions, and arrow functions in JavaScript?</p>",
    description: "A function is a block of code designed to perform a particular task.",
    link: "https://stackoverflow.com/questions/8/javascript-functions",
    mockAnswers: [
      {
        answer_id: 801,
        is_accepted: true,
        score: 13,
        creation_date: 1688173200,
        owner: {
          display_name: "SeniorDev",
          reputation: 7300
        },
        body: "<p>Function declarations are hoisted with their definitions. Arrow functions do not bind their own <code>this</code>, <code>arguments</code>, or <code>super</code>, making them ideal for callbacks.</p>"
      }
    ]
  },
  {
    id: 9,
    question_id: 9,
    title: "How do React useEffect cleanup functions prevent memory leaks?",
    category: "React",
    tags: ["reactjs", "react-hooks", "use-effect", "lifecycle"],
    score: 24,
    votes: 24,
    answer_count: 5,
    answers: 5,
    view_count: 5120,
    creation_date: 1690848000,
    last_activity_date: 1702000000,
    is_answered: true,
    owner: {
      display_name: "Anita Rao",
      reputation: 2890
    },
    body: "<p>When subscribing to WebSockets, intervals, or event listeners in a <code>useEffect</code> hook, why is returning a cleanup function essential?</p>",
    description: "Cleanup functions in useEffect cancel subscriptions and clear timers before component unmount or next execution.",
    link: "https://stackoverflow.com/questions/9/useeffect-cleanup",
    mockAnswers: [
      {
        answer_id: 901,
        is_accepted: true,
        score: 31,
        creation_date: 1690851600,
        owner: {
          display_name: "Dan Abramov Fan",
          reputation: 12500
        },
        body: "<p>React executes the returned cleanup function when the component unmounts AND before re-running the effect on dependency change. This prevents dangling timers and stale event listeners.</p>"
      }
    ]
  },
  {
    id: 10,
    question_id: 10,
    title: "How does Node.js asynchronous event loop handle I/O operations?",
    category: "JavaScript",
    tags: ["node.js", "javascript", "event-loop", "asynchronous"],
    score: 38,
    votes: 38,
    answer_count: 7,
    answers: 7,
    view_count: 9400,
    creation_date: 1693526400,
    last_activity_date: 1703500000,
    is_answered: true,
    owner: {
      display_name: "DevBackend",
      reputation: 8100
    },
    body: "<p>Node.js is single threaded for JavaScript execution. How does libuv offload heavy file read or database I/O without blocking the thread?</p>",
    description: "Libuv provides a multi-threaded worker pool to handle non-blocking asynchronous system tasks.",
    link: "https://stackoverflow.com/questions/10/nodejs-event-loop",
    mockAnswers: [
      {
        answer_id: 1001,
        is_accepted: true,
        score: 52,
        creation_date: 1693530000,
        owner: {
          display_name: "NodeContributor",
          reputation: 34000
        },
        body: "<p>Node.js uses the <strong>libuv</strong> library, which utilizes OS kernel asynchronous primitives (epoll, kqueue) and a background thread pool (default 4 threads) to process I/O asynchronously and emit events back to the event loop phases (timers, pending callbacks, poll, check, close).</p>"
      }
    ]
  }
];

export const POPULAR_TAGS = [
  "All",
  "javascript",
  "reactjs",
  "python",
  "html",
  "css",
  "node.js",
  "typescript"
];
