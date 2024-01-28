export default function handlePromiseAllSettled(promiseResult = []) {
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

  return { fulfilledResults, rejectedResults };
}
