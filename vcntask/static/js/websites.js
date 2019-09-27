/* global axios */

document.getElementById('urlSubmit').onclick = () => {
  const url = document.getElementById('newUrl').value;
  const message = document.getElementById('message');
  message.style.display = 'block';
  message.innerHTML = 'Submitting...';
  console.log(`new Url: ${url}`);
  axios
    .get('/savewebshot', {
      params: { url },
    })
    .then(response => {
      console.log(response);
      location.reload();
    });
};

window.onload = async () => {
  axios.get('/listurls/').then(response => {
    const urls = response.data.urls;
    const table = document.getElementById('websitesTable');
    urls.forEach(url => {
      let newRow = table.insertRow();
      newRow.innerHTML =
        `<td>${url.name || ''}</td>` +
        `<td>${url.title || ''}</td>` +
        `<td>${url.description || ''}</td>` +
        `<td><img src=${url.path} /></td>`;
    });
  });
};
