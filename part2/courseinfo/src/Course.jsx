const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p className="total-sum"> Number of exercises {sum}</p>;

const Part = ({ part }) => <p>
  {part.name} {part.exercises}
</p>;

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  );
};

export const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((acc, part) => acc + part.exercises, 0)} />
    </>
  );
};
