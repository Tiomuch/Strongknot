async function checkAvailableTable() {
  return new Promise(function(resolve){
    setTimeout(function () {
      resolve(Boolean(Math.round(Math.random())));
    }, 1000);
  });
}

async function askAnn() {
  return new Promise(function(resolve, reject){
    setTimeout(function () {
      const ok = Boolean(Math.round(Math.random()));
      if(ok) {
        resolve(true);
      } else {
        reject('Error msg');
      }
    }, 1000);
  });
}

(async () => {
  const table = await checkAvailableTable();
  const annAgree = await askAnn().catch(err => {
    console.log(err);
  });

  if(table && annAgree){
    console.log('Call to Taxi');
  } else {
    console.log('McD :)');
  }
})();
