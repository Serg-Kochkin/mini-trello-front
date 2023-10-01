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
git clone https://github.com/yourusername/trello-clone.git
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

### Board

The main view is a board that displays a series of lists. Each list represents a collection of tasks/cards, similar to Trello.

### Lists & Cards

Lists: These are columns that hold a set of cards. Examples include "To Do", "In Progress", and "Done".

### Cards: Represent individual tasks. Users can drag and drop cards within a list or between different lists.

### Drag & Drop

Implemented using react-beautiful-dnd, this feature allows users to drag cards between and within lists smoothly with intuitive animations.

### Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

### Issues

If you find a bug or think something could be improved, please submit an issue.

### License

This project is open source and available under the MIT License.
