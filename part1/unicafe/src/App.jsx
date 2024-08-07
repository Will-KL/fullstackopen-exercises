import { useState  }  from 'react';
import './App.css';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const StatisticLine = ({ text, value, className }) => (
  <tr className={className}>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  let total = good + neutral + bad;
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <thead>
          <tr>
            <StatisticLine className="statistic-line" text="good" value={good} />
            <StatisticLine className="statistic-line" text="neutral" value={neutral} />
            <StatisticLine className="statistic-line" text="bad" value={bad} />
            <StatisticLine className="statistic-line" text="total" value={total} />
            <StatisticLine className="statistic-line" text="average" value={(good-bad)/total} />
            <StatisticLine className="statistic-line" text="positive" value={good/total} />
          </tr>

        </thead>
      </table>
    </div>
  )
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )};

  export default App;