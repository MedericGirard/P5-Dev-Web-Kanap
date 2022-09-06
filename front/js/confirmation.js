const str = document.location.href;
const url = new URL(str);
const idUrl = url.searchParams.get("id");

function displayId() {
  document.getElementById("orderId").innerText = idUrl;
}

displayId();
