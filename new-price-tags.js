const buttonStyle = {
  position: "absolute",
  top: "12px",
  right: "30%",
  zIndex: "9999",
  backgroundColor: "#1565c0",
  width: "140px",
  height: "40px",
  borderColor: "rgb(28, 30, 40)",
  borderWidth: "2px",
  borderStyle: "solid",
  fontSize: "14px",
  fontWeight: "700",
  color: "white",
  borderRadius: "10px",
  display: "none",
};

const showButton = () => {
  if ("#/admin/inventory/price-tags" === window.location.hash) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};

const clickHandler = () => {
  const table = document.querySelector("#price-tags");
  if (table) {
    const tbody = table.querySelector("tbody");
    const allRows = tbody.querySelectorAll("tr");
    if (allRows.length > 0) {
      if (button.innerHTML === "NOVE CENE") {
        const allOldTags = [];
        allRows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          cells.forEach((cell) => {
            if (cell.textContent.trim() !== "") {
              allOldTags.push(cell);
            }
          });
          row.style.display = "none";
          button.innerHTML = "STARE CENE";
        });
        if (allOldTags.length > 0) {
          const dataTags = collectingData(allOldTags);
          console.log(dataTags);
        } else {
          alert("Sačekajte učitavanje cena!");
        }
      } else {
        button.innerHTML = "NOVE CENE";
        allRows.forEach((row) => {
          row.style.display = "table-row";
        });
      }
    } else {
      alert("Sačekajte učitavanje cena!");
    }
  } else {
    alert("Sačekajte učitavanje cena!");
  }
};

const collectingData = (oldTags) => {
  const dataTags = [];
  oldTags.forEach((tag) => {
    const divs = tag.querySelectorAll("div > div");

    const dataTag = {
      tagName: divs[1].innerHTML,
      tagPrice: divs[4].innerHTML,
      tagCode: null,
    };

    const tagCodeSpan = divs[divs.length - 2].querySelector("span");
    if (tagCodeSpan) {
      dataTag.tagCode = tagCodeSpan.innerHTML;
    }
    dataTags.push(dataTag);
  });
  return dataTags;
};

const button = document.createElement("button");
button.innerHTML = "NOVE CENE";
button.onclick = clickHandler;
Object.assign(button.style, buttonStyle);
document.body.appendChild(button);

// adding a button if the url matches
const clickListener = window.addEventListener("click", showButton, true);
