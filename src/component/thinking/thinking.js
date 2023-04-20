import { Brain } from "tabler-icons-react";

const Thinking = () => {
  return (
    <>
      <div className="flex flex-col border-b border-neutral-700 py-4">
        <span className="text-violet-700 text-sm">🧠 Chef-GPT Thoughts</span>
        <p>
          I will search for upcoming events to find a suitable one for creating
          a unique recipe.
        </p>
      </div>
      <div className="flex flex-col border-b border-neutral-700 py-4">
        <span className="text-violet-700 text-sm">⭐️ Reasoning:</span>
        <p>
          Finding an upcoming event will help me come up with a relevant and
          exciting recipe.
        </p>
      </div>
      <div className="flex flex-col border-b border-neutral-700 py-4">
        <span className="text-violet-700 text-sm">🖍️ Crticisim:</span>
        <p>
          {`NEXT ACTION: COMMAND = google  ARGUMENTS = { 'input': 'upcoming events'}`}
        </p>
      </div>
      <div className="flex flex-col border-b border-neutral-700 py-4">
        <span className="text-violet-700 text-sm">⚙️ System:</span>
        <p>
          [ "https://www.eventfinda.co.nz/whatson/events/new-zealand",
          ttps://www.sparkarena.co.nz/coming-events/"
          "https://heartofthecity.co.nz/auckland-events" wh
          "https://premier.ticketek.co.nz/" "https://www.ticketmaster.co.nz/"
          "http ://www.Lovetaupo.com/en/See-do/events/,
          https://natlib.govt.nz/events,
          https://poriruacity.govt.nz/discover-porirua /events/" ]
        </p>
      </div>
      <div className="flex flex-col border-b border-neutral-700 py-4">
        <span className="text-violet-700 text-sm">🧠 Chef-GPT Thoughts</span>
        <p>
          I will search for upcoming events to find a suitable one for creating
          a unique recipe.
        </p>
      </div>
      <div className="flex flex-col border-b border-neutral-700 py-4">
        <span className="text-violet-700 text-sm">⭐️ Reasoning:</span>
        <p>
          Finding an upcoming event will help me come up with a relevant and
          exciting recipe.
        </p>
      </div>
    </>
  );
};

export default Thinking;
