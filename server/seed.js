const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

// Helper to generate questions to save manual typing space, 
// but for quality, I will list diverse questions.
// Target: 20+ questions per category to support "20 questions" request safely.

const questions = [
    // ==================== FRONTEND - FRESHER (21) ====================
    { text: "Which method is used to update state in a functional React component?", role: "Frontend", difficulty: "Fresher", options: ["this.setState", "updateState", "useState", "setState"], correctAnswer: "useState" },
    { text: "What does CSS stand for?", role: "Frontend", difficulty: "Fresher", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correctAnswer: "Cascading Style Sheets" },
    { text: "Which HTML tag is used to create a hyperlink?", role: "Frontend", difficulty: "Fresher", options: ["<a>", "<link>", "<href>", "<url>"], correctAnswer: "<a>" },
    { text: "Which symbol maps to the ID selector in CSS?", role: "Frontend", difficulty: "Fresher", options: ["#", ".", "*", "%"], correctAnswer: "#" },
    { text: "Which React hook is used for side effects?", role: "Frontend", difficulty: "Fresher", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: "useEffect" },
    { text: "What is the default display value of a <div>?", role: "Frontend", difficulty: "Fresher", options: ["block", "inline", "inline-block", "flex"], correctAnswer: "block" },
    { text: "Which property controls text color?", role: "Frontend", difficulty: "Fresher", options: ["color", "text-color", "font-color", "style-color"], correctAnswer: "color" },
    { text: "How do you select an element by class in CSS?", role: "Frontend", difficulty: "Fresher", options: [".classname", "#classname", "classname", "*classname"], correctAnswer: ".classname" },
    { text: "HTML stands for?", role: "Frontend", difficulty: "Fresher", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None"], correctAnswer: "Hyper Text Markup Language" },
    { text: "Which tag is used for the largest heading?", role: "Frontend", difficulty: "Fresher", options: ["<h1>", "<h6>", "<head>", "<heading>"], correctAnswer: "<h1>" },
    { text: "What runs JavaScript in a browser?", role: "Frontend", difficulty: "Fresher", options: ["JavaScript Engine", "Java Compiler", "Python Interpreter", "C++ Engine"], correctAnswer: "JavaScript Engine" },
    { text: "Which CSS property changes font size?", role: "Frontend", difficulty: "Fresher", options: ["font-size", "text-size", "font-height", "size"], correctAnswer: "font-size" },
    { text: "How do you commment in CSS?", role: "Frontend", difficulty: "Fresher", options: ["/* comment */", "// comment", "<!-- comment -->", "' comment"], correctAnswer: "/* comment */" },
    { text: "What is the correct HTML element for inserting a line break?", role: "Frontend", difficulty: "Fresher", options: ["<br>", "<lb>", "<break>", "<newline>"], correctAnswer: "<br>" },
    { text: "Which attribute specifies the URL of an image?", role: "Frontend", difficulty: "Fresher", options: ["src", "href", "link", "url"], correctAnswer: "src" },
    { text: "Which tag is used to define a list item?", role: "Frontend", difficulty: "Fresher", options: ["<li>", "<ul>", "<ol>", "<list>"], correctAnswer: "<li>" },
    { text: "What is the correct HTML for adding a background color?", role: "Frontend", difficulty: "Fresher", options: ["<body style='background-color:yellow;'>", "<background>yellow</background>", "<body bg='yellow'>", "None"], correctAnswer: "<body style='background-color:yellow;'>" },
    { text: "Which HTML element is used to specify a footer for a document or section?", role: "Frontend", difficulty: "Fresher", options: ["<footer>", "<bottom>", "<section>", "<end>"], correctAnswer: "<footer>" },
    { text: "What does the 'alt' attribute do in <img>?", role: "Frontend", difficulty: "Fresher", options: ["Provides alternative text", "Makes image bold", "Links image", "None"], correctAnswer: "Provides alternative text" },
    { text: "What is the purpose of the <head> tag?", role: "Frontend", difficulty: "Fresher", options: ["Contains metadata/links", "Contains body content", "Contains scripts only", "None"], correctAnswer: "Contains metadata/links" },
    { text: "Which standard form input type is used for email?", role: "Frontend", difficulty: "Fresher", options: ["type='email'", "type='text'", "type='mail'", "type='address'"], correctAnswer: "type='email'" },


    // ==================== FRONTEND - INTERMEDIATE (21) ====================
    { text: "What is the purpose of React.memo?", role: "Frontend", difficulty: "Intermediate", options: ["To prevent unnecessary re-renders", "To memoize state", "To cache API calls", "To memoize functions"], correctAnswer: "To prevent unnecessary re-renders" },
    { text: "Difference between '==' and '==='?", role: "Frontend", difficulty: "Intermediate", options: ["Loose vs Strict equality", "Value vs Reference", "None", "Assignment vs Comparison"], correctAnswer: "Loose vs Strict equality" },
    { text: "Which serves as the entry point of a React application?", role: "Frontend", difficulty: "Intermediate", options: ["index.js / main.jsx", "App.js", "style.css", "public/index.html"], correctAnswer: "index.js / main.jsx" },
    { text: "What is Prop Drilling?", role: "Frontend", difficulty: "Intermediate", options: ["Passing props through multiple levels", "Drilling holes in props", "Deleting props", "Creating props"], correctAnswer: "Passing props through multiple levels" },
    { text: "What is a Higher-Order Component?", role: "Frontend", difficulty: "Intermediate", options: ["A function that takes a component and returns a new component", "A parent component", "A redux store", "A style sheet"], correctAnswer: "A function that takes a component and returns a new component" },
    { text: "What does `useRef` return?", role: "Frontend", difficulty: "Intermediate", options: ["A mutable ref object", "A state value", "A function", "A dom element only"], correctAnswer: "A mutable ref object" },
    { text: "What is the Context API used for?", role: "Frontend", difficulty: "Intermediate", options: ["Global state management", "Routing", "Styling", "API requests"], correctAnswer: "Global state management" },
    { text: "Which lifecycle method runs after the first render?", role: "Frontend", difficulty: "Intermediate", options: ["componentDidMount", "componentWillMount", "componentDidUpdate", "render"], correctAnswer: "componentDidMount" },
    { text: "What is the virtual DOM?", role: "Frontend", difficulty: "Intermediate", options: ["Lightweight copy of DOM", "Real DOM", "Shadow DOM", "Browser"], correctAnswer: "Lightweight copy of DOM" },
    { text: "How to prevent default form submission?", role: "Frontend", difficulty: "Intermediate", options: ["e.preventDefault()", "e.stop()", "return false", "e.stopPropagation()"], correctAnswer: "e.preventDefault()" },
    { text: "What is CSS Grid?", role: "Frontend", difficulty: "Intermediate", options: ["2D layout system", "1D layout system", "Float based", "Table based"], correctAnswer: "2D layout system" },
    { text: "What is Flexbox?", role: "Frontend", difficulty: "Intermediate", options: ["1D layout system", "2D layout system", "Grid", "Table"], correctAnswer: "1D layout system" },
    { text: "What is the use of `map()` in React?", role: "Frontend", difficulty: "Intermediate", options: ["To render a list of elements", "To map locations", "To find index", "To loop object"], correctAnswer: "To render a list of elements" },
    { text: "What are React Fragments?", role: "Frontend", difficulty: "Intermediate", options: ["Wrapper without adding DOM node", "Code snippets", "Errors", "Memory leaks"], correctAnswer: "Wrapper without adding DOM node" },
    { text: "Controlled vs Uncontrolled components?", role: "Frontend", difficulty: "Intermediate", options: ["State managed by React vs DOM", "Fast vs Slow", "New vs Old", "None"], correctAnswer: "State managed by React vs DOM" },
    { text: "What is the purpose of `key` prop?", role: "Frontend", difficulty: "Intermediate", options: ["Identify changed items", "Unlock component", "Access password", "Sort items"], correctAnswer: "Identify changed items" },
    { text: "What is a Pure Component?", role: "Frontend", difficulty: "Intermediate", options: ["Renders same output for same props/state", "A simple component", "No state component", "None"], correctAnswer: "Renders same output for same props/state" },
    { text: "Difference between `rem` and `em`?", role: "Frontend", difficulty: "Intermediate", options: ["Root relative vs Parent relative", "Same", "Pixel vs Percent", "None"], correctAnswer: "Root relative vs Parent relative" },
    { text: "What is z-index?", role: "Frontend", difficulty: "Intermediate", options: ["Stack order of elements", "Zoom level", "Zero index", "Zone"], correctAnswer: "Stack order of elements" },
    { text: "What is `box-sizing: border-box`?", role: "Frontend", difficulty: "Intermediate", options: ["Includes padding/border in width", "Excludes padding", "Default box model", "None"], correctAnswer: "Includes padding/border in width" },
    { text: "What is the Callback Hell?", role: "Frontend", difficulty: "Intermediate", options: ["Nested callbacks making code unreadable", "Phone calls", "Errors", "Loops"], correctAnswer: "Nested callbacks making code unreadable" },


    // ==================== FRONTEND - ADVANCED (21) ====================
    { text: "What is Hydration?", role: "Frontend", difficulty: "Advanced", options: ["Attaching listeners to SSR HTML", "Watering components", "Loading API", "Compiling"], correctAnswer: "Attaching listeners to SSR HTML" },
    { text: "Explain Event Bubbling.", role: "Frontend", difficulty: "Advanced", options: ["Event propagates from target up to root", "Event goes down to target", "Event stays on target", "None"], correctAnswer: "Event propagates from target up to root" },
    { text: "What is a Closure?", role: "Frontend", difficulty: "Advanced", options: ["Function bundled with lexical environment", "A closed tag", "End of loop", "Error"], correctAnswer: "Function bundled with lexical environment" },
    { text: "What is the Critical Rendering Path?", role: "Frontend", difficulty: "Advanced", options: ["Browser steps to paint pixels", "Path to server", "Redux flow", "Router path"], correctAnswer: "Browser steps to paint pixels" },
    { text: "What is Tree Shaking?", role: "Frontend", difficulty: "Advanced", options: ["Removing unused code", "Shaking the DOM", "Refreshing page", "Updating state"], correctAnswer: "Removing unused code" },
    { text: "What are Micro-Frontends?", role: "Frontend", difficulty: "Advanced", options: ["Architecture splitting frontend into deployable pieces", "Small components", "Mobile views", "Tiny icons"], correctAnswer: "Architecture splitting frontend into deployable pieces" },
    { text: "What is Repaint vs Reflow?", role: "Frontend", difficulty: "Advanced", options: ["Visual update vs Layout calculation", "Same thing", "Server vs Client", "Color vs ID"], correctAnswer: "Visual update vs Layout calculation" },
    { text: "What is a Service Worker?", role: "Frontend", difficulty: "Advanced", options: ["Script running in background", "A handyman", "Server process", "API worker"], correctAnswer: "Script running in background" },
    { text: "What is Lazy Loading?", role: "Frontend", difficulty: "Advanced", options: ["Loading resources only when needed", "Being lazy", "Slow loading", "Loading all at start"], correctAnswer: "Loading resources only when needed" },
    { text: "What is WebAssembly?", role: "Frontend", difficulty: "Advanced", options: ["Binary instruction format for stack-based VM", "A web framework", "Assembly language", "JS library"], correctAnswer: "Binary instruction format for stack-based VM" },
    { text: "React Fiber is...?", role: "Frontend", difficulty: "Advanced", options: ["Reconciliation engine", "A material", "New Component", "CSS tool"], correctAnswer: "Reconciliation engine" },
    { text: "What is Strict Mode in React?", role: "Frontend", difficulty: "Advanced", options: ["Highlights potential problems", "Enforces Typescript", "Disables errors", "Faster mode"], correctAnswer: "Highlights potential problems" },
    { text: "What is Server Side Rendering (SSR)?", role: "Frontend", difficulty: "Advanced", options: ["Rendering initial HTML on server", "Rendering on client", "Database rendering", "None"], correctAnswer: "Rendering initial HTML on server" },
    { text: "What is a Promise?", role: "Frontend", difficulty: "Advanced", options: ["Object representing future completion of async op", "Guarantee", "Function", "Loop"], correctAnswer: "Object representing future completion of async op" },
    { text: "What is Throttling?", role: "Frontend", difficulty: "Advanced", options: ["Limiting function execution rate", "Stopping function", "Speeding up", "None"], correctAnswer: "Limiting function execution rate" },
    { text: "What is Debouncing?", role: "Frontend", difficulty: "Advanced", options: ["Delaying execution until silence", "Bouncing ball", "Removing errors", "None"], correctAnswer: "Delaying execution until silence" },
    { text: "What is the difference between specificty 0,1,0 and 0,0,1?", role: "Frontend", difficulty: "Advanced", options: ["Class > Tag", "Tag > Class", "ID > Class", "None"], correctAnswer: "Class > Tag" },
    { text: "What is ARIA?", role: "Frontend", difficulty: "Advanced", options: ["Accessible Rich Internet Applications", "Audio Area", "Array", "None"], correctAnswer: "Accessible Rich Internet Applications" },
    { text: "What is a Web Component?", role: "Frontend", difficulty: "Advanced", options: ["Encapsulated custom HTML element", "React component", "Div", "None"], correctAnswer: "Encapsulated custom HTML element" },
    { text: "Benefit of localStorage?", role: "Frontend", difficulty: "Advanced", options: ["Persists after browser close", "Excpires on close", "Sent to server", "Secure"], correctAnswer: "Persists after browser close" },
    { text: "What is CORS issues in Frontend?", role: "Frontend", difficulty: "Advanced", options: ["Browser blocking cross-origin requests", "Server blocking", "Network error", "None"], correctAnswer: "Browser blocking cross-origin requests" },


    // ==================== BACKEND - FRESHER (20) ====================
    { text: "Not a Node.js framework?", role: "Backend", difficulty: "Fresher", options: ["Django", "Express", "Koa", "NestJS"], correctAnswer: "Django" },
    { text: "Default MongoDB port?", role: "Backend", difficulty: "Fresher", options: ["27017", "3306", "5432", "8080"], correctAnswer: "27017" },
    { text: "Module for file paths?", role: "Backend", difficulty: "Fresher", options: ["path", "fs", "os", "http"], correctAnswer: "path" },
    { text: "NPM stands for?", role: "Backend", difficulty: "Fresher", options: ["Node Package Manager", "New Prog Manager", "Net Packet Mgr", "None"], correctAnswer: "Node Package Manager" },
    { text: "SQL command to get data?", role: "Backend", difficulty: "Fresher", options: ["SELECT", "GET", "FETCH", "PULL"], correctAnswer: "SELECT" },
    { text: "Which symbol denotes a variable in SQL?", role: "Backend", difficulty: "Fresher", options: ["@", "$", "#", "&"], correctAnswer: "@" },
    { text: "Node.js is...", role: "Backend", difficulty: "Fresher", options: ["Runtime environment", "Language", "Frameowrk", "Database"], correctAnswer: "Runtime environment" },
    { text: "CommonJS import syntax?", role: "Backend", difficulty: "Fresher", options: ["require()", "import", "include", "fetch"], correctAnswer: "require()" },
    { text: "What is Express.js?", role: "Backend", difficulty: "Fresher", options: ["Web framework for Node", "Database", "Browser", "Language"], correctAnswer: "Web framework for Node" },
    { text: "REST stands for?", role: "Backend", difficulty: "Fresher", options: ["Representational State Transfer", "Rest State Transfer", "Real State Transfer", "None"], correctAnswer: "Representational State Transfer" },
    { text: "JSON stands for?", role: "Backend", difficulty: "Fresher", options: ["JavaScript Object Notation", "Java Object", "JS Online", "None"], correctAnswer: "JavaScript Object Notation" },
    { text: "HTTP 200 means?", role: "Backend", difficulty: "Fresher", options: ["OK", "Error", "Not Found", "Created"], correctAnswer: "OK" },
    { text: "HTTP 404 means?", role: "Backend", difficulty: "Fresher", options: ["Not Found", "OK", "Server Error", "Forbidden"], correctAnswer: "Not Found" },
    { text: "HTTP 500 means?", role: "Backend", difficulty: "Fresher", options: ["Internal Server Error", "OK", "Not Found", "Bad Request"], correctAnswer: "Internal Server Error" },
    { text: "To install a package?", role: "Backend", difficulty: "Fresher", options: ["npm install", "npm get", "npm add", "npm create"], correctAnswer: "npm install" },
    { text: "Which flag saves to package.json?", role: "Backend", difficulty: "Fresher", options: ["--save (or default now)", "-s", "-p", "-j"], correctAnswer: "--save (or default now)" },
    { text: "What is 'fs' module?", role: "Backend", difficulty: "Fresher", options: ["File System", "File Server", "Fast Server", "None"], correctAnswer: "File System" },
    { text: "What is a callback?", role: "Backend", difficulty: "Fresher", options: ["Function passed as argument", "Phone call", "Return value", "Loop"], correctAnswer: "Function passed as argument" },
    { text: "How to initialize a Node project?", role: "Backend", difficulty: "Fresher", options: ["npm init", "node init", "npm start", "node start"], correctAnswer: "npm init" },
    { text: "HTTP code for Created?", role: "Backend", difficulty: "Fresher", options: ["201", "200", "202", "301"], correctAnswer: "201" },


    // ==================== BACKEND - INTERMEDIATE (20) ====================
    { text: "What is Middleware?", role: "Backend", difficulty: "Intermediate", options: ["Func with access to req/res", "Hardware", "Database", "Frontend"], correctAnswer: "Func with access to req/res" },
    { text: "ACID properties?", role: "Backend", difficulty: "Intermediate", options: ["Atomicity, Consistency, Isolation, Durability", "Access, Code, ID, Data", "Automated, Consistent, Iso, Dual", "None"], correctAnswer: "Atomicity, Consistency, Isolation, Durability" },
    { text: "SQL vs NoSQL?", role: "Backend", difficulty: "Intermediate", options: ["Relational vs Document/Key-Value", "Old vs New", "Slow vs Fast", "None"], correctAnswer: "Relational vs Document/Key-Value" },
    { text: "What is Database Normalization?", role: "Backend", difficulty: "Intermediate", options: ["Organizing data to reduce redundancy", "Deleting data", "Making data normal", "Backing up"], correctAnswer: "Organizing data to reduce redundancy" },
    { text: "What is a Foreign Key?", role: "Backend", difficulty: "Intermediate", options: ["Link between tables", "A password", "A primary key", "An API key"], correctAnswer: "Link between tables" },
    { text: "Explain `process.nextTick`", role: "Backend", difficulty: "Intermediate", options: ["Executes callback after current op repeats", "Next second", "Next minute", "Never"], correctAnswer: "Executes callback after current op repeats" },
    { text: "What is JWT used for?", role: "Backend", difficulty: "Intermediate", options: ["Stateless Auth", "Database", "Encryption", "Routing"], correctAnswer: "Stateless Auth" },
    { text: "Difference PUT vs PATCH", role: "Backend", difficulty: "Intermediate", options: ["Replace vs Partial Update", "Same", "Create vs Delete", "None"], correctAnswer: "Replace vs Partial Update" },
    { text: "What is CORS?", role: "Backend", difficulty: "Intermediate", options: ["Cross-Origin Resource Sharing", "Code Origin", "Computer OS", "None"], correctAnswer: "Cross-Origin Resource Sharing" },
    { text: "What are Streams in Node?", role: "Backend", difficulty: "Intermediate", options: ["Handling data chunks", "Rivers", "Videos", "Arrays"], correctAnswer: "Handling data chunks" },
    { text: "Primary Key MUST be...", role: "Backend", difficulty: "Intermediate", options: ["Unique and Not Null", "Null", "Duplicate", "String"], correctAnswer: "Unique and Not Null" },
    { text: "What is Mongoose?", role: "Backend", difficulty: "Intermediate", options: ["ODM for MongoDB", "Database", "Server", "Animal"], correctAnswer: "ODM for MongoDB" },
    { text: "What is an Index in DB?", role: "Backend", difficulty: "Intermediate", options: ["Data structure to speed up retrieval", "Table of contents", "Primary key", "List"], correctAnswer: "Data structure to speed up retrieval" },
    { text: "Node is single or multi threaded?", role: "Backend", difficulty: "Intermediate", options: ["Single threaded", "Multi threaded", "No threads", "Quad"], correctAnswer: "Single threaded" },
    { text: "What is Libuv?", role: "Backend", difficulty: "Intermediate", options: ["Library for async I/O in Node", "Validation lib", "Video lib", "None"], correctAnswer: "Library for async I/O in Node" },
    { text: "What are Environment Variables?", role: "Backend", difficulty: "Intermediate", options: ["Config values outside code", "Global vars", "Local vars", "None"], correctAnswer: "Config values outside code" },
    { text: "What is Clustering?", role: "Backend", difficulty: "Intermediate", options: ["Using multi-core systems", "Grouping code", "CSS layout", "None"], correctAnswer: "Using multi-core systems" },
    { text: "Difference between `dependencies` and `devDependencies`?", role: "Backend", difficulty: "Intermediate", options: ["Prod vs Dev only tools", "Same", "Frontend vs Backend", "None"], correctAnswer: "Prod vs Dev only tools" },
    { text: "What is a Buffer?", role: "Backend", difficulty: "Intermediate", options: ["Temporary memory for raw data", "Loading bar", "Cache", "File"], correctAnswer: "Temporary memory for raw data" },
    { text: "What is Semantic Versioning?", role: "Backend", difficulty: "Intermediate", options: ["Major.Minor.Patch", "Name.Date", "V1.2", "None"], correctAnswer: "Major.Minor.Patch" },


    // ==================== BACKEND - ADVANCED (20) ====================
    { text: "Node.js Event Loop phases?", role: "Backend", difficulty: "Advanced", options: ["Timers, Pending, Idle, Poll, Check, Close", "Start, Run, Stop", "Init, Main, End", "None"], correctAnswer: "Timers, Pending, Idle, Poll, Check, Close" },
    { text: "What is CAP Theorem?", role: "Backend", difficulty: "Advanced", options: ["Consistency, Availability, Partition Tolerance", "Code App Perf", "None", "Computer Algo Process"], correctAnswer: "Consistency, Availability, Partition Tolerance" },
    { text: "Sharding in MongoDB?", role: "Backend", difficulty: "Advanced", options: ["Distributing data across machines", "Replication", "Backup", "Indexing"], correctAnswer: "Distributing data across machines" },
    { text: "Horizontal vs Vertical Scaling?", role: "Backend", difficulty: "Advanced", options: ["More nodes vs More power", "More power vs More nodes", "Same", "None"], correctAnswer: "More nodes vs More power" },
    { text: "What is a Reverse Proxy?", role: "Backend", difficulty: "Advanced", options: ["Server forwarding client requests to backend", "Client proxy", "Database proxy", "None"], correctAnswer: "Server forwarding client requests to backend" },
    { text: "Redis is used for...", role: "Backend", difficulty: "Advanced", options: ["Caching / Message Broker", "Persistent storage only", "Hosting HTML", "None"], correctAnswer: "Caching / Message Broker" },
    { text: "What is a Race Condition?", role: "Backend", difficulty: "Advanced", options: ["Timing dependent bug", "Fast code", "Competition", "None"], correctAnswer: "Timing dependent bug" },
    { text: "What is Database Indexing trade-off?", role: "Backend", difficulty: "Advanced", options: ["Speeds reads, slows writes", "Speeds writes, slows reads", "No trade-off", "Uses less space"], correctAnswer: "Speeds reads, slows writes" },
    { text: "What is gRPC?", role: "Backend", difficulty: "Advanced", options: ["RPC framework using Protobufs", "REST API", "Graph API", "None"], correctAnswer: "RPC framework using Protobufs" },
    { text: "What is Cluster module in Node?", role: "Backend", difficulty: "Advanced", options: ["Multi-core processing", "Database cluster", "Aggregating data", "None"], correctAnswer: "Multi-core processing" },
    { text: "Explain Backpressure.", role: "Backend", difficulty: "Advanced", options: ["Data buildup control in streams", "High server load", "Database pressure", "None"], correctAnswer: "Data buildup control in streams" },
    { text: "What is CQRS?", role: "Backend", difficulty: "Advanced", options: ["Command Query Responsibility Segregation", "Code Query RS", "Common Query RS", "None"], correctAnswer: "Command Query Responsibility Segregation" },
    { text: "Event Sourcing?", role: "Backend", difficulty: "Advanced", options: ["Storing state changes as events", "Sourcing events", "Finding events", "None"], correctAnswer: "Storing state changes as events" },
    { text: "What is a Message Queue?", role: "Backend", difficulty: "Advanced", options: ["Async communication buffer", "Chat app", "Database", "Email"], correctAnswer: "Async communication buffer" },
    { text: "What is Distributed Tracing?", role: "Backend", difficulty: "Advanced", options: ["Tracking requests across services", "Drawing lines", "Map tracing", "None"], correctAnswer: "Tracking requests across services" },
    { text: "Circuit Breaker pattern?", role: "Backend", difficulty: "Advanced", options: ["Prevent cascading failures", "Safety switch", "Power off", "None"], correctAnswer: "Prevent cascading failures" },
    { text: "Idempotency means?", role: "Backend", difficulty: "Advanced", options: ["Same result for multiple identical requests", "Fast", "Secure", "Unique"], correctAnswer: "Same result for multiple identical requests" },
    { text: "What is Database Replication?", role: "Backend", difficulty: "Advanced", options: ["Copying data to multiple servers", "Copy paste", "Backups", "None"], correctAnswer: "Copying data to multiple servers" },
    { text: "Benefits of Microservices?", role: "Backend", difficulty: "Advanced", options: ["Scalability, specialized teams", "Simple", "Cheap", "Fast dev"], correctAnswer: "Scalability, specialized teams" },
    { text: "Drawbacks of Microservices?", role: "Backend", difficulty: "Advanced", options: ["Complexity, network latency", "Expensive", "Slow", "None"], correctAnswer: "Complexity, network latency" },


    // ==================== FULL STACK - FRESHER (21) ====================
    { text: "Which method creates resources?", role: "Full Stack", difficulty: "Fresher", options: ["POST", "GET", "PUT", "DELETE"], correctAnswer: "POST" },
    { text: "Frontend vs Backend?", role: "Full Stack", difficulty: "Fresher", options: ["Client-side vs Server-side", "HTML vs CSS", "Slow vs Fast", "None"], correctAnswer: "Client-side vs Server-side" },
    { text: "Git init does what?", role: "Full Stack", difficulty: "Fresher", options: ["Initializes repo", "Deletes repo", "Commits", "Pushes"], correctAnswer: "Initializes repo" },
    { text: "What is an API?", role: "Full Stack", difficulty: "Fresher", options: ["Interface for software communication", "App", "Database", "Server"], correctAnswer: "Interface for software communication" },
    { text: "Full Stack means...", role: "Full Stack", difficulty: "Fresher", options: ["Both Frontend and Backend", "Only DB", "Only UI", "None"], correctAnswer: "Both Frontend and Backend" },
    { text: "CSS connects to HTML via...", role: "Full Stack", difficulty: "Fresher", options: ["<link>", "<script>", "<meta>", "<style-src>"], correctAnswer: "<link>" },
    { text: "JS connects to HTML via...", role: "Full Stack", difficulty: "Fresher", options: ["<script>", "<link>", "<js>", "<code>"], correctAnswer: "<script>" },
    { text: "What is localhost?", role: "Full Stack", difficulty: "Fresher", options: ["Current computer", "Remote server", "ISP", "Router"], correctAnswer: "Current computer" },
    { text: "IP Address stands for?", role: "Full Stack", difficulty: "Fresher", options: ["Internet Protocol", "Internal Protocol", "Internet Provider", "None"], correctAnswer: "Internet Protocol" },
    { text: "DNS stands for?", role: "Full Stack", difficulty: "Fresher", options: ["Domain Name System", "Data Name Service", "Do Not Service", "None"], correctAnswer: "Domain Name System" },
    { text: "URL stands for?", role: "Full Stack", difficulty: "Fresher", options: ["Uniform Resource Locator", "Universal Resource Link", "None", "Link"], correctAnswer: "Uniform Resource Locator" },
    { text: "Browser Engine example?", role: "Full Stack", difficulty: "Fresher", options: ["V8", "Node", "Python", "Java"], correctAnswer: "V8" },
    { text: "What is Git?", role: "Full Stack", difficulty: "Fresher", options: ["Version Control System", "Database", "Language", "Editor"], correctAnswer: "Version Control System" },
    { text: "What is a Pull Request?", role: "Full Stack", difficulty: "Fresher", options: ["Request to merge code", "Download code", "Error", "None"], correctAnswer: "Request to merge code" },
    { text: "JSON vs XML?", role: "Full Stack", difficulty: "Fresher", options: ["Lightweight vs Verbose", "Same", "Old vs New", "None"], correctAnswer: "Lightweight vs Verbose" },
    { text: "What is CLI?", role: "Full Stack", difficulty: "Fresher", options: ["Command Line Interface", "Code Line", "Computer Line", "None"], correctAnswer: "Command Line Interface" },
    { text: "What is a Bug?", role: "Full Stack", difficulty: "Fresher", options: ["Error in code", "Insect", "Feature", "Virus"], correctAnswer: "Error in code" },
    { text: "Agile methodology?", role: "Full Stack", difficulty: "Fresher", options: ["Iterative development", "Slow", "Waterfall", "None"], correctAnswer: "Iterative development" },
    { text: "What is Open Source?", role: "Full Stack", difficulty: "Fresher", options: ["Code publicly execution", "Free beer", "Broken", "None"], correctAnswer: "Code publicly execution" },
    { text: "Code Editor example?", role: "Full Stack", difficulty: "Fresher", options: ["VS Code", "Word", "Excel", "Paint"], correctAnswer: "VS Code" },
    { text: "What is a Framework?", role: "Full Stack", difficulty: "Fresher", options: ["Platform to build software", "Picture frame", "Work", "None"], correctAnswer: "Platform to build software" },


    // ==================== FULL STACK - INTERMEDIATE (21) ====================
    { text: "MVC stands for?", role: "Full Stack", difficulty: "Intermediate", options: ["Model View Controller", "Main View Code", "Model Variable Class", "None"], correctAnswer: "Model View Controller" },
    { text: "What is Authentication vs Authorization?", role: "Full Stack", difficulty: "Intermediate", options: ["Who you are vs What you can do", "Same", "Login vs Logout", "None"], correctAnswer: "Who you are vs What you can do" },
    { text: "Cookies vs LocalStorage?", role: "Full Stack", difficulty: "Intermediate", options: ["Cookies sent with requests, LS is local only", "Same", "LS is smaller", "Cookies are safer"], correctAnswer: "Cookies sent with requests, LS is local only" },
    { text: "What is a JWT?", role: "Full Stack", difficulty: "Intermediate", options: ["Token for auth", "Database", "Password", "User"], correctAnswer: "Token for auth" },
    { text: "Git Merge vs Rebase?", role: "Full Stack", difficulty: "Intermediate", options: ["Combine history vs Rewrite history", "Same", "Commit vs Push", "None"], correctAnswer: "Combine history vs Rewrite history" },
    { text: "What is an ORM?", role: "Full Stack", difficulty: "Intermediate", options: ["Object Relational Mapper", "Object Role Model", "None", "Database"], correctAnswer: "Object Relational Mapper" },
    { text: "What is a 401 status?", role: "Full Stack", difficulty: "Intermediate", options: ["Unauthorized", "Forbidden", "Not Found", "Error"], correctAnswer: "Unauthorized" },
    { text: "What is a 403 status?", role: "Full Stack", difficulty: "Intermediate", options: ["Forbidden", "Unauthorized", "Not Found", "OK"], correctAnswer: "Forbidden" },
    { text: "WebSockets vs HTTP?", role: "Full Stack", difficulty: "Intermediate", options: ["Persist bi-directional vs Request-Response", "Same", "Faster", "Slower"], correctAnswer: "Persist bi-directional vs Request-Response" },
    { text: "What involves CI/CD?", role: "Full Stack", difficulty: "Intermediate", options: ["Automated testing/deploy", "Coding", "Designing", "Meetings"], correctAnswer: "Automated testing/deploy" },
    { text: "SQL Injection is...", role: "Full Stack", difficulty: "Intermediate", options: ["Malicious SQL code execution", "Fast SQL", "Importing SQL", "None"], correctAnswer: "Malicious SQL code execution" },
    { text: "XSS is...", role: "Full Stack", difficulty: "Intermediate", options: ["Cross Site Scripting", "Cross Style Sheets", "None", "XML Style"], correctAnswer: "Cross Site Scripting" },
    { text: "CSRF stands for?", role: "Full Stack", difficulty: "Intermediate", options: ["Cross-Site Request Forgery", "Code Site Ref", "None", "Style Ref"], correctAnswer: "Cross-Site Request Forgery" },
    { text: "What comes first? AuthN or AuthZ?", role: "Full Stack", difficulty: "Intermediate", options: ["AuthN (Authentication)", "AuthZ", "Same time", "None"], correctAnswer: "AuthN (Authentication)" },
    { text: "What is a Monorepo?", role: "Full Stack", difficulty: "Intermediate", options: ["Multiple projects in one repo", "Single project", "Mono audio", "None"], correctAnswer: "Multiple projects in one repo" },
    { text: "Docker vs VM?", role: "Full Stack", difficulty: "Intermediate", options: ["Shared OS vs Separate OS", "Same", "VM lighter", "None"], correctAnswer: "Shared OS vs Separate OS" },
    { text: "What is Babel?", role: "Full Stack", difficulty: "Intermediate", options: ["JS Transpiler", "Tower", "Database", "Framework"], correctAnswer: "JS Transpiler" },
    { text: "Purpose of .env file?", role: "Full Stack", difficulty: "Intermediate", options: ["Store secrets/config", "Store code", "Environment list", "None"], correctAnswer: "Store secrets/config" },
    { text: "What is Linting?", role: "Full Stack", difficulty: "Intermediate", options: ["Static code analysis", "Cleaning screen", "Running code", "None"], correctAnswer: "Static code analysis" },
    { text: "Unit Test vs Integration Test?", role: "Full Stack", difficulty: "Intermediate", options: ["Smallest part vs Combined parts", "Same", "Fast vs Slow", "None"], correctAnswer: "Smallest part vs Combined parts" },
    { text: "What is a Web Server?", role: "Full Stack", difficulty: "Intermediate", options: ["Computer serving web pages", "Spider", "Network", "Client"], correctAnswer: "Computer serving web pages" },


    // ==================== FULL STACK - ADVANCED (21) ====================
    { text: "Microservices vs Monolith?", role: "Full Stack", difficulty: "Advanced", options: ["Distributed vs Unified codebase", "Small vs Big", "New vs Old", "None"], correctAnswer: "Distributed vs Unified codebase" },
    { text: "What is Docker?", role: "Full Stack", difficulty: "Advanced", options: ["Containerization platform", "VM", "OS", "Code editor"], correctAnswer: "Containerization platform" },
    { text: "Kubernetes is used for?", role: "Full Stack", difficulty: "Advanced", options: ["Orchestration of containers", "Building code", "Database", "None"], correctAnswer: "Orchestration of containers" },
    { text: "What is GraphQL?", role: "Full Stack", difficulty: "Advanced", options: ["Query lang for API", "Database", "Graph tool", "None"], correctAnswer: "Query lang for API" },
    { text: "Serverless computing?", role: "Full Stack", difficulty: "Advanced", options: ["Cloud provider manages server alloc", "No servers exist", "Offline", "None"], correctAnswer: "Cloud provider manages server alloc" },
    { text: "What is the N+1 problem?", role: "Full Stack", difficulty: "Advanced", options: ["Performance issue in fetching related data", "Math problem", "Network error", "None"], correctAnswer: "Performance issue in fetching related data" },
    { text: "Explain CDN.", role: "Full Stack", difficulty: "Advanced", options: ["Content Delivery Network - Geo distributed servers", "Central Data Node", "Code Delivery Node", "None"], correctAnswer: "Content Delivery Network - Geo distributed servers" },
    { text: "What is a Load Balancer?", role: "Full Stack", difficulty: "Advanced", options: ["Distributes traffic across servers", "Balances weight", "Measures load", "None"], correctAnswer: "Distributes traffic across servers" },
    { text: "Two-Factor Authentication?", role: "Full Stack", difficulty: "Advanced", options: ["Two proofs of identity", "Two passwords", "Two users", "None"], correctAnswer: "Two proofs of identity" },
    { text: "What is OAuth?", role: "Full Stack", difficulty: "Advanced", options: ["Delegated authorization protocol", "Auth app", "Database", "None"], correctAnswer: "Delegated authorization protocol" },
    { text: "Blue-Green Deployment?", role: "Full Stack", difficulty: "Advanced", options: ["Switching traffic between two identical envs", "Testing colors", "None", "Deploying UI"], correctAnswer: "Switching traffic between two identical envs" },
    { text: "What is Sticky Session?", role: "Full Stack", difficulty: "Advanced", options: ["Routing user to same server", "Session timeout", "None", "Cookie error"], correctAnswer: "Routing user to same server" },
    { text: "Database Indexing Pros/Cons?", role: "Full Stack", difficulty: "Advanced", options: ["Faster reads / Slower writes", "Always faster", "Less space", "None"], correctAnswer: "Faster reads / Slower writes" },
    { text: "Single Point of Failure?", role: "Full Stack", difficulty: "Advanced", options: ["Part of system if failed stops all", "Bug", "Error", "None"], correctAnswer: "Part of system if failed stops all" },
    { text: "What is Scalability?", role: "Full Stack", difficulty: "Advanced", options: ["Ability to handle load increase", "Weighing scale", "Size", "None"], correctAnswer: "Ability to handle load increase" },
    { text: "Long Polling?", role: "Full Stack", difficulty: "Advanced", options: ["Request kept open until data available", "Survey", "Polls", "None"], correctAnswer: "Request kept open until data available" },
    { text: "Man-in-the-middle attack?", role: "Full Stack", difficulty: "Advanced", options: ["Intercepting communications", "Referee", "Server", "None"], correctAnswer: "Intercepting communications" },
    { text: "HTTPS Handshake?", role: "Full Stack", difficulty: "Advanced", options: ["Exchange keys/cert to secure connection", "Greeting", "Login", "None"], correctAnswer: "Exchange keys/cert to secure connection" },
    { text: "What is a Zombie Process?", role: "Full Stack", difficulty: "Advanced", options: ["Process finished but entry remains", "Virus", "Game", "None"], correctAnswer: "Process finished but entry remains" },
    { text: "Infrastructure as Code?", role: "Full Stack", difficulty: "Advanced", options: ["Managing infra via config files", "Coding buildings", "Hard code", "None"], correctAnswer: "Managing infra via config files" },
    { text: "Container Orchestration?", role: "Full Stack", difficulty: "Advanced", options: ["Automating container lifecycle", "Music", "Conducting", "None"], correctAnswer: "Automating container lifecycle" },


    // ==================== HR - FRESHER (21) ====================
    { text: "Greatest strength?", role: "HR", difficulty: "Fresher", options: ["Quick Learner", "Sleeping", "Gaming", "None"], correctAnswer: "Quick Learner" },
    { text: "Greatest weakness?", role: "HR", difficulty: "Fresher", options: ["Focus too much on details", "Lazy", "Late", "None"], correctAnswer: "Focus too much on details" },
    { text: "Why hire you?", role: "HR", difficulty: "Fresher", options: ["Eager to contribute", "I need money", "Please", "No one else"], correctAnswer: "Eager to contribute" },
    { text: "5 years from now?", role: "HR", difficulty: "Fresher", options: ["Grown professionally", "Retired", "Rich", "Unknown"], correctAnswer: "Grown professionally" },
    { text: "Describe yourself.", role: "HR", difficulty: "Fresher", options: ["Motivated and reliable", "Bored", "Tired", "Sad"], correctAnswer: "Motivated and reliable" },
    { text: "Handle pressure?", role: "HR", difficulty: "Fresher", options: ["Organize and prioritize", "Panic", "Quit", "Cry"], correctAnswer: "Organize and prioritize" },
    { text: "Work in teams?", role: "HR", difficulty: "Fresher", options: ["Love it", "Hate it", "No", "Solo only"], correctAnswer: "Love it" },
    { text: "Salary expectations?", role: "HR", difficulty: "Fresher", options: ["Industry standard", "1 Million", "Free", "None"], correctAnswer: "Industry standard" },
    { text: "Know about us?", role: "HR", difficulty: "Fresher", options: ["Researched company values", "Nothing", "Name only", "No"], correctAnswer: "Researched company values" },
    { text: "Questions for us?", role: "HR", difficulty: "Fresher", options: ["Tech stack / Team culture", "No", "Salary only", "Lunch time"], correctAnswer: "Tech stack / Team culture" },
    { text: "Ideal work environment?", role: "HR", difficulty: "Fresher", options: ["Collaborative", "Quiet only", "No boss", "Party"], correctAnswer: "Collaborative" },
    { text: "Hobbies?", role: "HR", difficulty: "Fresher", options: ["Coding/Reading", "Sleeping", "Drinking", "None"], correctAnswer: "Coding/Reading" },
    { text: "Gap in employment?", role: "HR", difficulty: "Fresher", options: ["Upskilling/Learning", "Prison", "None", "Lazy"], correctAnswer: "Upskilling/Learning" },
    { text: "Preferred communication?", role: "HR", difficulty: "Fresher", options: ["Email/Slack", "Yelling", "None", "Carrier pigeon"], correctAnswer: "Email/Slack" },
    { text: "Handling boredome?", role: "HR", difficulty: "Fresher", options: ["Find new tasks", "Sleep", "Leave", "Complain"], correctAnswer: "Find new tasks" },
    { text: "Define success?", role: "HR", difficulty: "Fresher", options: ["Continuous improvement", "Money", "Power", "None"], correctAnswer: "Continuous improvement" },
    { text: "Are you valid to work?", role: "HR", difficulty: "Fresher", options: ["Yes", "No", "Maybe", "Check"], correctAnswer: "Yes" },
    { text: "Willing to relocate?", role: "HR", difficulty: "Fresher", options: ["Open to discussion", "No", "Remote only", "Maybe"], correctAnswer: "Open to discussion" },
    { text: "Start date?", role: "HR", difficulty: "Fresher", options: ["Immediately/Notice period", "Never", "Next year", "Unknown"], correctAnswer: "Immediately/Notice period" },
    { text: "Why this role?", role: "HR", difficulty: "Fresher", options: ["Passion for tech", "Random", "Easy", "Money"], correctAnswer: "Passion for tech" },
    { text: "Team conflict example?", role: "HR", difficulty: "Fresher", options: ["Listened and compromised", "Fought", "Ignored", "Cried"], correctAnswer: "Listened and compromised" },


    // ==================== HR - INTERMEDIATE (21) ====================
    { text: "Conflict resolution?", role: "HR", difficulty: "Intermediate", options: ["Communicate and find solution", "Fight", "Ignore", "Quit"], correctAnswer: "Communicate and find solution" },
    { text: "Example of failure?", role: "HR", difficulty: "Intermediate", options: ["Fixed it and learned", "Denied it", "Blamed others", "Hid it"], correctAnswer: "Fixed it and learned" },
    { text: "Leadership style?", role: "HR", difficulty: "Intermediate", options: ["Supportive/Democratic", "Dictator", "Absent", "Strict"], correctAnswer: "Supportive/Democratic" },
    { text: "Why leaving?", role: "HR", difficulty: "Intermediate", options: ["Growth opportunity", "Hate boss", "Bored", "Fired"], correctAnswer: "Growth opportunity" },
    { text: "Motivated by?", role: "HR", difficulty: "Intermediate", options: ["Impact/Learning", "Money only", "Fear", "Nothing"], correctAnswer: "Impact/Learning" },
    { text: "Disagreement with boss?", role: "HR", difficulty: "Intermediate", options: ["Discuss respectfully", "Shout", "Quit", "Complain"], correctAnswer: "Discuss respectfully" },
    { text: "Time management?", role: "HR", difficulty: "Intermediate", options: ["Prioritization matrix", "Random", "Multitask everything", "None"], correctAnswer: "Prioritization matrix" },
    { text: "Remote work?", role: "HR", difficulty: "Intermediate", options: ["Productive and disciplined", "Lazy", "Sleep", "TV"], correctAnswer: "Productive and disciplined" },
    { text: "Feedback handling?", role: "HR", difficulty: "Intermediate", options: ["Open to improvement", "Defensive", "Angry", "Ignore"], correctAnswer: "Open to improvement" },
    { text: "Complex problem solved?", role: "HR", difficulty: "Intermediate", options: ["Broke it down", "Guessed", "Gave up", "Asked mom"], correctAnswer: "Broke it down" },
    { text: "Describe success.", role: "HR", difficulty: "Intermediate", options: ["Achieving goals/Value add", "Money", "Fame", "Luck"], correctAnswer: "Achieving goals/Value add" },
    { text: "Team conflict?", role: "HR", difficulty: "Intermediate", options: ["Mediated", "Picked sides", "Ignored", "Laughed"], correctAnswer: "Mediated" },
    { text: "Career progression?", role: "HR", difficulty: "Intermediate", options: ["Looking for more responsibility", "None", "Less work", "Same"], correctAnswer: "Looking for more responsibility" },
    { text: "Mentoring juniors?", role: "HR", difficulty: "Intermediate", options: ["Share knowledge", "Ignore", "Mislead", "None"], correctAnswer: "Share knowledge" },
    { text: "Stress management?", role: "HR", difficulty: "Intermediate", options: ["Breaks/Priorities", "Scream", "Quit", "Drink"], correctAnswer: "Breaks/Priorities" },
    { text: "Why not competitor?", role: "HR", difficulty: "Intermediate", options: ["Your mission/culture", "They rejected me", "Random", "None"], correctAnswer: "Your mission/culture" },
    { text: "Ideal manager?", role: "HR", difficulty: "Intermediate", options: ["Empowers team", "Micromanager", "Absent", "Nice"], correctAnswer: "Empowers team" },
    { text: "Work life balance?", role: "HR", difficulty: "Intermediate", options: ["Boundaries are key", "Work only", "Life only", "None"], correctAnswer: "Boundaries are key" },
    { text: "Negative feedback?", role: "HR", difficulty: "Intermediate", options: ["Constructive opportunity", "Hate it", "Ignore", "Cry"], correctAnswer: "Constructive opportunity" },
    { text: "Describe work ethic.", role: "HR", difficulty: "Intermediate", options: ["Reliable and dedicated", "Lazy", "Average", "Bad"], correctAnswer: "Reliable and dedicated" },
    { text: "Most proud achievement?", role: "HR", difficulty: "Intermediate", options: ["Delivered major project", "Lunch", "Waking up", "None"], correctAnswer: "Delivered major project" },


    // ==================== HR - ADVANCED (21) ====================
    { text: "Mentorship experience?", role: "HR", difficulty: "Advanced", options: ["Guided juniors regularly", "None", "I don't care", "No time"], correctAnswer: "Guided juniors regularly" },
    { text: "Strategic decision made?", role: "HR", difficulty: "Advanced", options: ["Chose tech stack for scale", "Lunch menu", "None", "Easy one"], correctAnswer: "Chose tech stack for scale" },
    { text: "Handling underperformance?", role: "HR", difficulty: "Advanced", options: ["Coaching/PIP", "Firing immediately", "Ignoring", "Yelling"], correctAnswer: "Coaching/PIP" },
    { text: "Culture fit?", role: "HR", difficulty: "Advanced", options: ["Align with values", "Don't care", "Just code", "None"], correctAnswer: "Align with values" },
    { text: "Industry trends?", role: "HR", difficulty: "Advanced", options: ["Continuous learning", "I know everything", "Don't follow", "Old tech"], correctAnswer: "Continuous learning" },
    { text: "Delegation?", role: "HR", difficulty: "Advanced", options: ["Trust and verify", "Do it myself", "Dump work", "None"], correctAnswer: "Trust and verify" },
    { text: "Crisis management?", role: "HR", difficulty: "Advanced", options: ["Calm and decisive", "Panic", "Hide", "Blame"], correctAnswer: "Calm and decisive" },
    { text: "Innovation?", role: "HR", difficulty: "Advanced", options: ["Encourage new ideas", "Stick to routine", "No risks", "Copy others"], correctAnswer: "Encourage new ideas" },
    { text: "Diversity?", role: "HR", difficulty: "Advanced", options: ["Crucial for perspective", "Unimportant", "Forced", "None"], correctAnswer: "Crucial for perspective" },
    { text: "Ethical dilemma?", role: "HR", difficulty: "Advanced", options: ["Uphold integrity", "Hide it", "Profit first", "Lie"], correctAnswer: "Uphold integrity" },
    { text: "Vision?", role: "HR", difficulty: "Advanced", options: ["Strategic long-term", "Tomorrow only", "None", "Survival"], correctAnswer: "Strategic long-term" },
    { text: "Why this company?", role: "HR", difficulty: "Advanced", options: ["Mission alignment", "Big name", "Money", "Random"], correctAnswer: "Mission alignment" },
    { text: "Managing up?", role: "HR", difficulty: "Advanced", options: ["Aligning with leadership goals", "Ignoring boss", "Flattery", "None"], correctAnswer: "Aligning with leadership goals" },
    { text: "Resource allocation?", role: "HR", difficulty: "Advanced", options: ["Based on ROI/Priorities", "Random", "Favorites", "None"], correctAnswer: "Based on ROI/Priorities" },
    { text: "Hiring philosophy?", role: "HR", difficulty: "Advanced", options: ["Hire for aptitude/attitude", "Hire cheap", "Hire friends", "None"], correctAnswer: "Hire for aptitude/attitude" },
    { text: "Retaining talent?", role: "HR", difficulty: "Advanced", options: ["Growth/Culture/Comp", "Pizza parties", "Threats", "None"], correctAnswer: "Growth/Culture/Comp" },
    { text: "Cross-functional collaboration?", role: "HR", difficulty: "Advanced", options: ["Breaking silos", "Staying in lane", "Fighting", "None"], correctAnswer: "Breaking silos" },
    { text: "Dealing with uncertainty?", role: "HR", difficulty: "Advanced", options: ["Agile/Flexible approach", "Panic", "Stop work", "None"], correctAnswer: "Agile/Flexible approach" },
    { text: "Public speaking?", role: "HR", difficulty: "Advanced", options: ["Comfortable/Effective", "Terrified", "No", "Mumbling"], correctAnswer: "Comfortable/Effective" },
    { text: "Performance reviews?", role: "HR", difficulty: "Advanced", options: ["Fair and data driven", "Biased", "Skipped", "None"], correctAnswer: "Fair and data driven" },
    { text: "Future of industry?", role: "HR", difficulty: "Advanced", options: ["AI/Automation integration", "Doom", "Same", "Unknown"], correctAnswer: "AI/Automation integration" },

];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        await Question.deleteMany({});
        console.log('Cleared existing questions');

        await Question.insertMany(questions);
        console.log('Seeded questions successfully');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
