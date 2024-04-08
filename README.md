# My React App

This project is a simple React application that uses three contexts: `InputContext`, `CalculationContext`, and `OutputContext`.

## Contexts

- `InputContext`: Stores user information inputted in an input field.
- `CalculationContext`: Responsible for performing calculations and getting the input collated and ready to be sent in a request.
- `OutputContext`: Stores the response from the request.

## Project Structure

The project has the following structure:

```
my-react-app
├── src
│   ├── contexts
│   │   ├── InputContext.tsx
│   │   ├── CalculationContext.tsx
│   │   └── OutputContext.tsx
│   ├── components
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

To set up the project, follow these steps:

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm start` to start the development server.

## Usage

To use the contexts, wrap your components with the corresponding provider components. You can then use the `useContext` hook to access the state and the setter functions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)