//Traitement de la date pour la rendre plus lisible
export const dateParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  return date.toString();
};
