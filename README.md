<h1>Social Network App</h1>
This is a social network app where users can sign up, create profiles, add friends, and view their friend's profiles. This app is built using React for the frontend and Node.js with Express for the backend. MongoDB is used as the database to store user data.

<h2>Solution and Choices Made</h2>
<h3>Frontend</h3>
<ul>
    <li>For the frontend, I chose to use React because it provides a component-based architecture which makes it easy to build scalable and reusable UI components.</li>
    <li>To manage state, I used React Hooks such as useState and useEffect.</li>
    <li>For routing, I used React Router DOM to handle navigation between different pages in the app.</li>
    <li>To handle user authentication, I used JSON Web Tokens (JWT) and stored the token in local storage upon successful login or signup.</li>
    <li>To make API calls to the backend, I used the axios library.</li>
    </ul>
    <h3>Backend</h3>
    <ul>
    <li>For the backend, I used Node.js with Express framework to handle server-side logic.</li>
    <li>For authentication, I used bcrypt to hash passwords and jsonwebtoken (JWT) to generate and verify tokens.</li>
    <li>I used MongoDB as the database to store user data.</li>
</ul>

<h2>Demo</h2>
Here is a link to a demo video: <a href="#">Link</a>

<h2>Steps to run the code</h2>
<ul>
    <li>Clone the repository: git clone https://github.com/jithin-j/Social-Network-CareStack-.git</li>
    <li>Navigate to the project directory: cd Social-Network-CareStack</li>
    <li>Install dependencies for the frontend: cd frontend && npm install</li>
    <li>Install dependencies for the backend: cd ../backend && npm install</li>
    <li>Start the backend server: nodemon app.js</li>
    <li>In another terminal, start the frontend server: cd ../frontend && npm start</li>
    <li>The app should now be running on http://localhost:3001</li>
</ul>
Note: Make sure to set up a MongoDB database and update the MONGODB_URI variable in the .env file with your database URI.

<h2>Conclusion</h2>
This social network app is a basic implementation of social media functionalities using React, Node.js, and MongoDB. The app can be improved by adding more features such as messaging, notifications, and user search.
