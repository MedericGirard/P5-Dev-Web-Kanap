// Fonction qui récupère l'id et l'injecte dans la page
const str = document.location.href;
const url = new URL(str);
const idUrl = url.searchParams.get("id");

function main() {
  document.getElementById("orderId").innerText = idUrl;
}

main();