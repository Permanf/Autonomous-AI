export const extractTasks = (
    text,
    completedTasks
  ) => {
    return extractArray(text)
      .filter(realTasksFilter)
      .filter((task) => !(completedTasks || []).includes(task));
  };
  
  export const extractArray = (inputStr) => {
    // Match an outer array of strings (including nested arrays)
    const regex = /(\[(?:\s*"(?:[^"\\]|\\.)*"\s*,?)+\s*\])/;
    const match = inputStr.match(regex);
    console.log(match)  
    if (match && match[0]) {
      try {
        // Parse the matched string to get the array
        return JSON.parse(match[0]) ;
      } catch (error) {
        console.error("Error parsing the matched array:", error);
      }
    }
  
    console.warn("Error, could not extract array from inputString:", inputStr);
    return [];
  };
  
  // Model will return tasks such as "No tasks added". We should filter these
  export const realTasksFilter = (input) => {
    const noTaskRegex =
      /^No( (new|further|additional|extra|other))? tasks? (is )?(required|needed|added|created|inputted).*$/i;
    const taskCompleteRegex =
      /^Task (complete|completed|finished|done|over|success).*/i;
    const doNothingRegex = /^(\s*|Do nothing(\s.*)?)$/i;
  
    return (
      !noTaskRegex.test(input) &&
      !taskCompleteRegex.test(input) &&
      !doNothingRegex.test(input)
    );
  };
  