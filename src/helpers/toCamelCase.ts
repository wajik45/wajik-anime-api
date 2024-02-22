export default function (string: string) {
  return string
    .split(" ")
    .map((item, index) => {
      if (index === 0) {
        item = item.toLowerCase();
      } else {
        item = item.toLowerCase();

        item = item[0].toUpperCase() + item.slice(1);
      }

      return item;
    })
    .join(" ")
    .replace(/[!@#$%^&*]| /g, "");
}
