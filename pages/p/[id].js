import fetch from 'isomorphic-unfetch';
import Link from 'next/link'

const Objective = props => (
  <>
    <h1>{props.objective.title}</h1>
    <ul>
        <li>Created: {props.objective.created}</li>
        <li>Type: {props.objective.type}</li>
        <li>Deadline: {props.objective.deadline}</li>
        <li>Status: {props.objective.status}</li>
        <li>Related to Role: {props.objective.role}</li>
        <li>Related to Department: {props.objective.department || 'N/A'}</li>
    </ul>
    <h2>Description</h2>
    <p>{props.objective.description.replace(/<[/]?[pb]>/g, '')}</p>
    {props.objective.avatar ? <img src={props.objective.avatar} /> : null}
    <Link href="/"><a>BACK</a></Link>
  </>
);

Objective.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3001/objectives/${id}`);
  const objective = await res.json();

  console.log(`Fetched show: ${objective.title}`);

  return { objective };
};

export default Objective;