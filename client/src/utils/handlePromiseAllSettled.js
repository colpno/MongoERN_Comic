export default function handlePromiseAllSettled(promiseResult = [], showErrorFunction = null) {
  const fulfilledResults = [];
  const rejectedResults = [];

  for (let i = 0; i < promiseResult.length; i++) {
    const result = promiseResult[i];

    if (result.value) {
      fulfilledResults.push(result.value);
    } else {
      rejectedResults.push(result.reason);
    }
  }

  if (typeof showErrorFunction === "function") {
    for (let i = 0; i < rejectedResults.length; i++) {
      const result = rejectedResults[i];
      showErrorFunction(result, "error");
    }
  }

  return { fulfilledResults, rejectedResults };
}
