# Mini Trello Front

This project is a simple Trello-like board built with React, Tailwind CSS, Apollo Client and react-beautiful-dnd.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js & npm](https://nodejs.org/en/)

### Installation & Running Locally

1. Clone the repository:

```bash
git clone https://github.com/Serg-Kochkin/mini-trello-front.git
cd trello-clone
```

2. Install project dependencies:

```
npm install
```

3. Start the development server:

```
npm start
```

After running the above command, open your browser and navigate to http://localhost:3000.

## How It Works (Frontend)

### View

The main component that has a logic to view a UI part.

### Board

The Board component that displays a series of Columns. Each list represents a collection of cards, similar to Trello.

### Columns

These are columns that hold a set of cards. Examples include "To Do", "In Progress", and "Done".

### Cards

Represent individual tasks. Users can drag and drop cards within a list or between different Columns.

### Drag & Drop

Implemented using react-beautiful-dnd, this feature allows users to drag cards between and within Columns smoothly with intuitive animations.

### Apollo Client

Apollo Client is a state management library that enables to management of both local and remote data with GraphQL.
