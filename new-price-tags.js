var link = document.createElement('link');
// link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Lugrasimo&display=swap';
link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet'
link.rel = 'stylesheet';

document.head.appendChild(link)

const showButton = () => {
  if ("#/admin/inventory/price-tags" === window.location.hash) {
    const toolbar = document.querySelector('.v-toolbar__content')
    if (toolbar) {
      toolbar.appendChild(newMainButton);
      newMainButton.style.display = "block";
    }
  } else {
    newMainButton.style.display = "none";
  }
};

const clickHandler = () => {
  if ("#/admin/inventory/price-tags" === window.location.hash) {
    const table = document.querySelector("#price-tags");
    if (table) {
      const tbody = table.querySelector("tbody");
      const allRows = tbody.querySelectorAll("tr");
      const oldTableSettings = document.querySelector(".table-settings");
      if (allRows.length > 0) {
        if (newMainButton.innerHTML === "NOVE CENE") {
          const allOldTags = [];
          allRows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            cells.forEach((cell) => {
              if (cell.textContent.trim() !== "") {
                allOldTags.push(cell);
              }
            });
            row.style.display = "none";
          });
          if (allOldTags.length > 0) {
            newMainButton.innerHTML = "STARE CENE";
            oldTableSettings.style.display = "none";
            const dataTags = collectingData(allOldTags);
            createNewTableSettings(oldTableSettings);
            createNewTags(dataTags, tbody, 3);
            replacePrintButtons(true)
          } else {
            alert("Sačekajte učitavanje cena!");
          }
        } else {
          newMainButton.innerHTML = "NOVE CENE";
          allRows.forEach((row) => {
            if (row.classList.contains('newTableRow'))
              row.remove()
            else
              row.style.display = "table-row";
          });
          oldTableSettings.style.display = "flex";
          document.querySelector(".newSettingsBar").remove();
          replacePrintButtons(false)
        }
      } else {
        alert("Sačekajte učitavanje cena!");
      }
    } else {
      alert("Sačekajte učitavanje cena!");
    }
  }
};

const collectingData = (oldTags) => {
  const dataTags = [];
  oldTags.forEach((tag) => {
    const divs = tag.querySelectorAll("div > div");

    const dataTag = {
      name: divs[1].innerHTML,
      price: divs[4].innerHTML,
      code: null,
    };

    const tagCodeSpan = divs[divs.length - 2].querySelector("span");
    if (tagCodeSpan) {
      dataTag.code = tagCodeSpan.innerHTML;
    }
    dataTags.push(dataTag);
  });
  return dataTags;
};

const createNewTags = (dataTags, table, n) => {
  table.classList.add('newPrintingElement')
  let currentRow;

  dataTags.forEach((tag, index) => {

    if (index % n === 0) {
      currentRow = document.createElement('tr');
      // currentRow.classList.add('newTableRow')
      currentRow.className = "newTableRow newPrintingElement"
      table.appendChild(currentRow)
    }

    const td = createNewTag(tag)
    currentRow.appendChild(td)

  })
};

const createNewTag = (tag) => {
  const td = document.createElement('td')
  td.className = 'newTableData newPrintingElement'

  const tagContainer = document.createElement('div')
  // tagContainer.style.fontFamily = "Caveat"
  // tagContainer.style.fontFamily = 'Lugrasimo'
  tagContainer.style.fontFamily = 'Montserrat'
  tagContainer.className = 'newTagContainer newPrintingElement'

  const desingTop = document.createElement('div')
  desingTop.className = "newDesing desingTop newPrintingElement"
  tagContainer.appendChild(desingTop)

  const newTagInfoDiv = document.createElement('div')
  newTagInfoDiv.className = 'newTagInfoDiv newPrintingElement'
  tagContainer.appendChild(newTagInfoDiv)

  const newTagName = document.createElement('div')
  newTagName.className = 'newTagName newPrintingElement'
  newTagName.innerHTML = tag.name
  newTagInfoDiv.appendChild(newTagName)

  const newTagPrice = document.createElement('div')
  newTagPrice.className = 'newTagPrice newPrintingElement'
  newTagInfoDiv.appendChild(newTagPrice)

  const newPrice1 = document.createElement('div')
  newPrice1.className = 'newPrice1 newPrintingElement'
  newPrice1.innerHTML = tag.price
  newTagPrice.appendChild(newPrice1)

  const newPrice2 = document.createElement('div')
  newPrice2.className = 'newPrice2 newPrintingElement'
  newTagPrice.appendChild(newPrice2)


  const newDecimal = document.createElement('div')
  newDecimal.className = 'newDecimal newPrintingElement'
  newDecimal.innerHTML = '.00'
  newPrice2.appendChild(newDecimal)

  const newValue = document.createElement('div')
  newValue.className = 'newValue newPrintingElement'
  newValue.innerHTML = 'Din'
  newPrice2.appendChild(newValue)

  const desingBottom = document.createElement('div')
  desingBottom.classList = "newDesing desingBottom newPrintingElement"
  tagContainer.appendChild(desingBottom)

  // const newLogoTag = document.createElement('img')
  // newLogoTag.classList.add('newLogoTag')
  // newLogoTag.src = ch
  // tagContainer.appendChild(newLogoTag)

  td.appendChild(tagContainer)

  return td
}

const createNewTableSettings = (oldTableSettings) => {
  const parentElement = oldTableSettings.parentNode;

  const newTableSettingsDiv = document.createElement("div");
  newTableSettingsDiv.classList.add("newSettingsBar");

  const picker1Props = {
    text: "Dizajn",
    color: "#3cb031"
  }
  const colorPicker1 = createColorPicker(picker1Props)
  newTableSettingsDiv.appendChild(colorPicker1)


  const picker2Props = {
    text: "Text",
    color: "#6b1613"
  }
  const colorPicker2 = createColorPicker(picker2Props)
  newTableSettingsDiv.appendChild(colorPicker2)

  const picker3Props = {
    text: 'Pozadina',
    color: "#ffffff"
  }
  const colorPicker3 = createColorPicker(picker3Props)
  newTableSettingsDiv.appendChild(colorPicker3)

  const slider1Props = {
    text: 'Visina',

  }
  const sliderRange1 = createRangeSlider(slider1Props)
  newTableSettingsDiv.appendChild(sliderRange1)

  const slider2Props = {
    text: 'Širina',
    min: 2,
    max: 6,
    value: 3,
    step: 1
  }
  const sliderRange2 = createRangeSlider(slider2Props)
  newTableSettingsDiv.appendChild(sliderRange2)


  parentElement.insertAdjacentElement("afterbegin", newTableSettingsDiv);
};

const createColorPicker = (props) => {
  const colorPickerContainer = document.createElement('div')
  colorPickerContainer.classList.add('newColorPickerDiv')

  const label = document.createElement('label')
  label.classList.add('newColorLabel')
  label.setAttribute("for", "favcolor");
  label.textContent = props.text;

  const input = document.createElement("input");
  input.classList.add('newColorInput')
  input.setAttribute("type", "color");
  input.setAttribute("id", "favcolor");
  input.setAttribute("value", props.color);


  colorPickerContainer.appendChild(label)
  colorPickerContainer.appendChild(input)

  return colorPickerContainer;
}

const createRangeSlider = (props) => {
  const sliderRangeContainer = document.createElement('div')
  sliderRangeContainer.classList.add('newSliderRangeDiv')

  const label = document.createElement('label')
  label.classList.add('newRangeLabel')
  label.setAttribute("for", "sliderRange");
  label.textContent = props.text;

  const input = document.createElement('input')
  input.setAttribute("type", "range");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", "50");
  input.setAttribute('step', "1")
  input.setAttribute("id", "sliderRange");
  input.classList.add("newSliderInput");

  sliderRangeContainer.appendChild(label)
  sliderRangeContainer.appendChild(input)

  return sliderRangeContainer
}

const replacePrintButtons = (x) => {
  const oldNavBar = document.querySelector('.v-card__title')
  const oldPrintButton = oldNavBar.querySelector('.minw100')
  const parentElement = oldPrintButton.parentNode

  if (x) {
    oldPrintButton.style.display = 'none'
    const newButton = document.createElement('button')
    newButton.classList.add('newPrintButton')
    newButton.innerHTML = "ŠTAMPAJ"

    newButton.onclick = newPrintTags

    parentElement.classList.add('newParentOfPrintButton')
    parentElement.prepend(newButton)

  } else {
    const newButton = parentElement.querySelector('.newPrintButton')
    newButton.remove()
    parentElement.classList.remove('newParentOfPrintButton')
    oldPrintButton.style.display = 'inline-block'
  }
}

const newPrintTags = () => {
  // const table = document.querySelector("#price-tags");
  // const newContent = table.cloneNode(true)
  // console.log(newContent);
  window.print()
  // newPrintIFrame.contentDocument.head.appendChild(cssLink)
  // newPrintIFrame.contentDocument.body.appendChild(newContent)
  // newPrintIFrame.contentWindow.print()
}

// const newPrintIFrame = document.createElement('iframe')
// newPrintIFrame.id = 'newPrintFrame'
// newPrintIFrame.className = 'newPrintingElement'

// var cssLink = document.createElement("link");
// cssLink.href = 'style.css'
// // cssLink.href = chrome.runtime.getURL('style.css')
// cssLink.rel = "stylesheet";

// document.body.appendChild(newPrintIFrame)

const newMainButton = document.createElement("button");
newMainButton.innerHTML = "NOVE CENE";
newMainButton.classList.add('newMainButton')
newMainButton.onclick = clickHandler;

const clickListener = window.addEventListener("click", showButton, true);