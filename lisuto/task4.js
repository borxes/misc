/*
 * Complete the 'calculateQueueTime' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY q
 *  2. INTEGER n
 */

function calculateQueueTime(q, n) {
  // Write your code here

  // sum task queue
  const sumQueue = queue => queue.reduce((acc, cur) => acc + cur, 0);
  // returns the index of the next available for an incoming task
  const getNextDev = queues => {
    let next = 0;
    for (let i = 0; i < n; i++) {
      if (sumQueue(queues[i]) < sumQueue(queues[next])) {
        next = i;
      }
    }
    return next;
  }

  devQueues = [];
  for (let i = 0; i < n; i++) {
    devQueues.push([]);
  }
  q.forEach(task => {
    const next = getNextDev(devQueues);
    devQueues[next].push(task);
  });

  let totals = devQueues.map(queue => sumQueue(queue));
  totals.sort((a, b) => b - a);
  console.log(totals[0]);
}


calculateQueueTime([10, 2, 3, 3], 2);