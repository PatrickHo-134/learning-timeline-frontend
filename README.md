# Learning Timeline - Frontend

The **Learning Timeline App** is a full-stack web application designed to help users create, organize, and archive learning notes, promoting efficient self-paced learning and personal development. The project is built using modern web technologies like **React.js** and **Redux** on the frontend, and it communicates with a backend API developed with **Python** and **Django**.

This repository contains the **frontend** part of the project, which consumes the API provided by the [Learning Timeline API](https://github.com/PatrickHo-134/learning-timeline-api). The frontend is responsible for delivering a seamless and responsive user experience, handling user interactions, rendering learning notes, collections, and labels, and managing state with Redux for efficient data flow across the application.

Key features include:

- **Creating and managing learning notes:** Users can create detailed learning notes with a rich text editor, including adding labels and categorizing notes into collections.
- **Label management:** Users can assign multiple labels to notes, search through existing labels, and even create new ones to help categorize their learning material.
- **Collections:** Notes can be grouped into collections, allowing users to better organize and archive their content based on topics, courses, or other personal preferences.
- **Archiving functionality:** Notes and collections can be archived, allowing users to preserve their progress and maintain focus on their current learning tasks.

You can explore the live demo of the end product by visiting this link: [Learning Timeline App](https://learning-timeline-1010897e960e.herokuapp.com/).

## Features

The Learning Timeline App comes with a variety of features designed to enhance the process of learning, organizing, and self-paced study. Below are the key features offered by the frontend:

### 1. Learning Notes Management
- Users can create, view, edit, and delete rich-text learning notes.
- Notes include a title, content, and the ability to assign multiple labels for better organization.
- Notes can be archived, preserving them for future reference while keeping the active workspace clutter-free.

### 2. Labeling System
- Add and manage labels to categorize learning notes, allowing for easy filtering and searching.
- Users can search for existing labels or create new ones on-the-fly while adding or editing a note.
- Label colors can be customized, helping users visually organize their content.
- Label editing allows users to rename or change the color of existing labels.
- Deleting a label will automatically remove it from all notes associated with it.

### 3. Collections
- Notes can be organized into collections, allowing users to group related learning material by topic, course, or any custom category.
- Users can create, rename, and delete collections as needed.
- Notes can be moved between collections, giving users flexible control over how they organize their content.
- Archiving a collection will automatically archive all the learning notes within that collection.

### 4. Rich-Text Editor
- The app comes with a feature-rich editor, allowing users to format their notes with text styling, links, lists, and even tables.
- The editor also supports embedding images and other rich media to enhance learning material.

### 5. Responsive Design
- The application is fully responsive and optimized for various screen sizes, including mobile, tablet, and desktop devices.
- The layout dynamically adapts to different devices, ensuring a smooth and intuitive user experience on any platform.

### 6. Pagination and Infinite Scrolling
- The list of learning notes is fetched in pages, improving loading performance and making it easier to browse through notes.
- Infinite scrolling is implemented, so as the user scrolls down, more notes are fetched automatically from the backend.

### 7. User Authentication
- Fully integrated with the backend authentication system to provide a secure environment for users to manage their notes.
- Users must log in to access their learning notes, collections, and other personal data.

### 8. Notifications (Future feature)
- The app provides push notifications for reminders, such as reviewing notes at scheduled intervals, ensuring users stay on top of their learning progress.

### 9. Search and Filtering
- Users can search for learning notes based on title, content, labels, or collections.
- Advanced filtering options allow users to sort their notes by different criteria, such as creation date, last updated, or labels.

## Prerequisites
- Node.js (v14.x or higher) and npm (or yarn) installed

## Setup and Installation
Follow the steps below to set up and run the Learning Timeline App frontend locally:

### 1. Clone the repository
Start by cloning the frontend repository from GitHub to your local machine using Git:

```
git clone https://github.com/PatrickHo-134/learning-timeline-frontend.git
```

Navigate into the project directory:

```
cd learning-timeline-frontend
```

### 2. Install dependencies
Before running the application, you need to install the required dependencies using npm or yarn.

If you're using npm, run:

```
npm install
```

Alternatively, if you're using yarn, run:

```
yarn install
```

This command will install all necessary packages listed in the package.json file.

### 3. Set up environment variables
The project requires certain environment variables to function correctly.

- Create a `.env` file in the root of the project directory.
- Add the necessary environment variables in the `.env` file. For example:
```
REACT_APP_API_URL=http://localhost:8000
```

Here, `REACT_APP_API_URL` should point to your backend API's base URL.

### 4. Start the development server
Once the dependencies are installed and the environment variables are set, you can start the development server. This will allow you to view the application in your browser.

If you're using npm, run:

```
npm start
```

If you're using yarn, run:

```
yarn start
```

After running the command, the app should automatically open in your default web browser at:

```
http://localhost:3000
```

If it doesn’t open automatically, you can manually access it by typing the URL into your browser.

### 5. Run backend server
Make sure the backend server (the Learning Timeline API) is running, so the frontend can communicate with it for fetching and saving learning notes. You can find the setup instructions for the backend [here](https://github.com/PatrickHo-134/learning-timeline-api).

4.6. Building for Production
When you are ready to deploy the frontend app for production, you can create an optimized build by running:

```
npm run build
```

Or with yarn:
```
yarn build
```
This will generate a build directory with the optimized and minified files ready for deployment.

With these steps completed, the frontend should be fully operational on your local machine and ready for development or further customization.


## Contribution

We welcome contributions to the Learning Timeline App! If you have any ideas, bug fixes, or improvements, feel free to contribute.

To contribute, follow these steps:

### 1. Fork the repository
Fork the repository to create your own copy by clicking the "Fork" button at the top right of the repository page.

### 2. Clone your fork
Clone your fork to your local machine:
```
git clone https://github.com/<your-username>/learning-timeline-frontend.git
```

### 3. Create a new branch
Create a branch for your changes. Use a descriptive name:
```
git checkout -b feature/your-feature-name
```

### 4. Make your changes
Add your feature or fix the bug. Ensure that your changes are aligned with the project’s goals and code style.

### 5. Commit your changes
Once you're satisfied with your changes, commit them:
```
git add .
git commit -m "Add feature: description of feature"
```

### 6. Push to your fork
Push your changes to your forked repository:
```
git push origin feature/your-feature-name
```

### 7.Create a Pull Request
Navigate to the original repository on GitHub and click on the "New Pull Request" button. Provide a clear description of the changes in the PR and reference any related issues.

## Contribution Guidelines
- Ensure your code follows the existing style and conventions.
- Write clear, concise commit messages.
- Make sure all new and existing tests pass.
- Keep pull requests small and focused.
- Always link to the issue you're solving in your PR description (if applicable).

We appreciate all contributions, whether they are large or small, and thank you for helping make this project better!

## License
This project is licensed under the MIT License.
