import "./Help.css";

export default function Help() {
  return (
    <section className="Help-wrapper" aria-labelledby="help-heading">
      <h2 id="help-heading">Help</h2>
      <h3>About this app</h3>
      <p>
        A dynamic <strong>project management board</strong> with kanban lanes and
        HTML5 drag-and-drop. Tasks load from a JSON API bundled with the app so
        you can try the board without signing in.
      </p>
      <h3>How to use it</h3>
      <ul>
        <li>
          The <strong>board</strong> shows four lanes: To Do, In Progress,
          Review, and Done.
        </li>
        <li>
          <strong>Drag a task card</strong> from one lane and drop it on another
          to change its status. Changes stay in the browser until you refresh.
        </li>
        <li>
          Scroll to the <strong>Backlog</strong> section to see the full task
          list with titles and descriptions.
        </li>
        <li>
          Refresh the page to reset lanes to the original data from the API.
        </li>
      </ul>
    </section>
  );
}
