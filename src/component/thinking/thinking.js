const Thinking = ({ messages }) => {
  console.log(messages);
  return (
    <>
      {messages?.map((item, index) => {
        if (item.type === "action") {
          return (
            <div
              key={index}
              className="flex flex-col border-b border-neutral-700 py-4 pt-0"
            >
              <span className="text-violet-700 text-xs sm:text-sm">
                {item.type === "action" ? item.task : "Other"}
              </span>
              <p className="text-sm sm:text-base">{item.value}</p>
            </div>
          );
        }
        if (item.type === "think") {
          return (
            <div
              key={index}
              className="flex flex-col border-b border-neutral-700 py-4 pt-0"
            >
              <span className="text-violet-700 text-xs sm:text-sm">
                thinking
              </span>
              <p className="text-sm sm:text-base">Thinking about tasks</p>
            </div>
          );
        }
        if (item.type === "criticism") {
          return (
            <div
              key={index}
              className="flex flex-col border-b border-neutral-700 py-4 pt-0"
            >
              <span className="text-violet-700 text-xs sm:text-sm">
                🖍️ Crticisim:
              </span>
              <p className="text-sm sm:text-base">{item.value}</p>
            </div>
          );
        }
        if (item.type === "task") {
          return (
            <div
              key={index}
              className="flex flex-col border-b border-neutral-700 py-4 pt-0"
            >
              <span className="text-violet-700 text-xs sm:text-sm">
                🖍️ Task:
              </span>
              <p className="text-sm sm:text-base">{item.value}</p>
            </div>
          );
        }
      })}

      {/* <div className="flex flex-col border-b border-neutral-700 py-4">
        <span className="text-violet-700 text-xs sm:text-sm">
          ⭐️ Reasoning:
        </span>
        <p className="text-sm sm:text-base">
          Finding an upcoming event will help me come up with a relevant and
          exciting recipe.
        </p>
      </div>
      <div className="flex flex-col border-b border-neutral-700 py-4">
        <span className="text-violet-700 text-xs sm:text-sm">
          🖍️ Crticisim:
        </span>
        <p className="text-sm sm:text-base">
          {`NEXT ACTION: COMMAND = google  ARGUMENTS = { 'input': 'upcoming events'}`}
        </p>
      </div>
      <div className="flex flex-col border-b border-neutral-700 py-4">
        <span className="text-violet-700 text-xs sm:text-sm">⚙️ System:</span>
        <p className="text-sm sm:text-base">
          [ "https://www.eventfinda.co.nz/whatson/events/new-zealand",
          ttps://www.sparkarena.co.nz/coming-events/"
          "https://heartofthecity.co.nz/auckland-events" wh
          "https://premier.ticketek.co.nz/" "https://www.ticketmaster.co.nz/"
          "http ://www.Lovetaupo.com/en/See-do/events/,
          https://natlib.govt.nz/events,
          https://poriruacity.govt.nz/discover-porirua /events/" ]
        </p>
      </div> */}
    </>
  );
};

export default Thinking;
