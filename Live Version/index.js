function getDate() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const day = date.getDate();
  const nameOfMonth = monthNames[date.getMonth()];
  const year = date.getFullYear();
  console.log(`${day} ${nameOfMonth}, ${year}`);
}
getDate();
