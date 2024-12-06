import { useReducer } from "react";
import "./styles.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const defaultDeposit = 150;
const defaultWithdraw = 50;
const defaultLoan = 5000;

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isActive: true,
        balance: 500,
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + defaultDeposit,
      };

    case "withdraw":
      return {
        ...state,
        balance: state.balance - defaultWithdraw,
      };

    case "requestLoan":
      return {
        ...state,
        loan: state.loan + defaultLoan,
        balance: state.balance + defaultLoan,
      };

    case "payLoan":
      return {
        ...state,
        loan: state.balance > state.loan ? 0 : state.loan,
        balance: state.balance > state.loan ? state.balance - state.loan : 0,
      };

    case "closeAccount":
      return {
        ...state,
        isActive: state.balance === 0 && state.loan === 0 ? false : true,
      };

    default:
      return;
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive ? true : false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit" });
          }}
          disabled={isActive ? false : true}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw" });
          }}
          disabled={isActive ? false : true}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan" });
          }}
          disabled={isActive ? (loan > 0 ? true : false) : true}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={isActive ? false : true}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={isActive ? false : true}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
