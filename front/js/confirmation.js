const str = document.location.href;
const url = new URL(str);
const idUrl = url.searchParams.get("id");

document.getElementById('orderId').innerText = idUrl;

// créer fonction