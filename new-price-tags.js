var link = document.createElement('link');
// link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Lugrasimo&display=swap';
// link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet'
link.href = 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"'
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


let globalTable = null
// let globalHeightTbody = null

const changeableElements = {
  'colorDesing': [],
  'colorText': [],
  'colorPrice': [],
  'newTags': [],
  'newRows': []
}

const defaultSettings = {
  'colorDesing': '#447e4d',
  'colorText': '#36c44d',
  'colorPrice': '#ff0531',
  'heightTag': '140',
  'nuberOfTdinRow': 4
}

const clickHandler = () => {
  if ("#/admin/inventory/price-tags" === window.location.hash) {
    const table = document.querySelector("#price-tags");
    if (table) {
      globalTable = table
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
            createNewTags(dataTags, tbody, defaultSettings['nuberOfTdinRow']);
            replacePrintButtons(true)
            // globalHeightTbody = tbody.clientHeight
          } else {
            alert("Sačekajte učitavanje cena!");
          }
        } else {
          newMainButton.innerHTML = "NOVE CENE";

          for (let key in changeableElements) {
            changeableElements[key] = []
          }

          allRows.forEach((row) => {
            if (row.classList.contains('newTableRow'))
              row.remove()
            else
              row.style.display = "table-row";
          });
          oldTableSettings.style.display = "flex";
          document.querySelector(".newSettingsBar").remove();
          replacePrintButtons(false)
          // tbody.style.height = 'max-content'
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
  table.classList.add('newTableBody')
  let currentRow;
  dataTags.forEach((tag, index) => {
    if (index % n === 0) {
      currentRow = document.createElement('tr');
      changeableElements['newRows'].push(currentRow)
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
  td.style.height = defaultSettings['heightTag'] + 'px'
  changeableElements['newTags'].push(td)

  const tagContainer = document.createElement('div')
  // tagContainer.style.fontFamily = "Caveat"
  // tagContainer.style.fontFamily = 'Lugrasimo'
  // tagContainer.style.fontFamily = 'Montserrat'
  tagContainer.className = 'newTagContainer newPrintingElement'

  const desingTop = document.createElement('div')
  desingTop.className = "newDesing desingTop newPrintingElement"
  desingTop.style.backgroundColor = defaultSettings['colorDesing']
  changeableElements['colorDesing'].push(desingTop)
  tagContainer.appendChild(desingTop)

  const newTagInfoDiv = document.createElement('div')
  newTagInfoDiv.className = 'newTagInfoDiv newPrintingElement'
  tagContainer.appendChild(newTagInfoDiv)

  const newTagName = document.createElement('div')
  newTagName.className = 'newTagName newPrintingElement'
  newTagName.innerHTML = tag.name
  newTagName.style.color = defaultSettings['colorText']
  changeableElements['colorText'].push(newTagName)
  newTagInfoDiv.appendChild(newTagName)

  const newTagPrice = document.createElement('div')
  newTagPrice.className = 'newTagPrice newPrintingElement'
  newTagPrice.style.color = defaultSettings['colorPrice']
  changeableElements['colorPrice'].push(newTagPrice)
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
  desingBottom.style.backgroundColor = defaultSettings['colorDesing']
  changeableElements['colorDesing'].push(desingBottom)
  tagContainer.appendChild(desingBottom)

  const newLogoTag = document.createElement('img')
  newLogoTag.className = 'newLogoTag newPrintingElement'
  newLogoTag.src = chrome.runtime.getURL('logo.png')

  tagContainer.appendChild(newLogoTag)

  if (tag.code) {
    const newTagCode = document.createElement('div')
    newTagCode.className = 'newTagCode newPrintingElement'
    newTagCode.innerHTML = tag.code
    tagContainer.appendChild(newTagCode)
  }

  td.appendChild(tagContainer)

  return td
}

const createNewTableSettings = (oldTableSettings) => {
  const parentElement = oldTableSettings.parentNode;

  const newTableSettingsDiv = document.createElement("div");
  newTableSettingsDiv.classList.add("newSettingsBar");

  const picker1Props = {
    text: "Dizajn",
    color: defaultSettings['colorDesing']
  }
  const colorPicker1 = createColorPicker(picker1Props)
  newTableSettingsDiv.appendChild(colorPicker1)


  const picker2Props = {
    text: "Text",
    color: defaultSettings['colorText']
  }
  const colorPicker2 = createColorPicker(picker2Props)
  newTableSettingsDiv.appendChild(colorPicker2)

  const picker3Props = {
    text: 'Cena',
    color: defaultSettings['colorPrice']
  }
  const colorPicker3 = createColorPicker(picker3Props)
  newTableSettingsDiv.appendChild(colorPicker3)

  const slider1Props = {
    text: 'Visina',
    min: 116,
    max: 260,
    step: 2,
    value: defaultSettings['heightTag'],
    onInput: changeHeight
  }
  const sliderRange1 = createRangeSlider(slider1Props)
  newTableSettingsDiv.appendChild(sliderRange1)

  const slider2Props = {
    text: 'Širina',
    min: 2,
    max: 6,
    step: 1,
    value: defaultSettings['nuberOfTdinRow'],
    onInput: changeWidth
  }
  const sliderRange2 = createRangeSlider(slider2Props)
  newTableSettingsDiv.appendChild(sliderRange2)


  parentElement.insertAdjacentElement("afterbegin", newTableSettingsDiv);
};

const createColorPicker = (props) => {
  const newClassName = props.text === 'Dizajn' ? 'Desing' :
    props.text === 'Text' ? 'Text' :
      props.text === 'Cena' ? 'Price' : null

  const colorPickerContainer = document.createElement('div')
  colorPickerContainer.classList.add('newColorPickerDiv')

  const label = document.createElement('label')
  label.classList.add('newColorLabel')
  label.setAttribute("for", "favcolor");
  label.textContent = props.text;

  const input = document.createElement("input");
  input.classList.add('newColorInput')
  input.classList.add('newColor' + newClassName)
  input.setAttribute("type", "color");
  input.setAttribute("id", "favcolor");
  input.setAttribute("value", props.color);
  input.addEventListener('input', changeColor)

  colorPickerContainer.appendChild(label)
  colorPickerContainer.appendChild(input)

  return colorPickerContainer;
}

const changeColor = (e) => {
  const className = e.target.classList[1].substring(8)
  const key = "color" + className.charAt(0).toUpperCase() + className.slice(1);

  if (key.includes('Desing')) {
    changeableElements[key].forEach((element) => {
      element.style.backgroundColor = e.target.value
    })
  } else {
    changeableElements[key].forEach((element) => {
      element.style.color = e.target.value
    })
  }
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
  input.setAttribute("min", props.min);
  input.setAttribute("max", props.max);
  input.setAttribute("value", props.value);
  input.setAttribute('step', props.step)
  input.setAttribute("id", "sliderRange");

  const newEvent = props.text === 'Visina' ? 'input' : 'change'
  input.addEventListener(newEvent, props.onInput)

  input.classList.add("newSliderInput");

  sliderRangeContainer.appendChild(label)
  sliderRangeContainer.appendChild(input)

  return sliderRangeContainer
}

const changeHeight = (e) => {
  // Try set height of tbody, not of all tag
  const height = e.target.value
  changeableElements['newTags'].forEach((element) => {
    element.style.height = height + 'px'
  })
  // const tbody = globalTable.querySelector('tbody')
  // const mul = height / 140
  // const value = globalHeightTbody * mul
  // tbody.style.height = value + 'px'
}

const changeWidth = (e) => {
  const newWidth = e.target.value;
  const currentWidth = changeableElements['newRows'][0].childElementCount

  const tbody = globalTable.firstChild
  changeableElements['newRows'].forEach(row => {
    row.remove()
  })

  changeableElements['newRows'] = []

  let newRow
  changeableElements['newTags'].forEach((td, index) => {
    if (index % newWidth === 0) {
      newRow = document.createElement('tr')
      newRow.className = "newTableRow newPrintingElement"
      changeableElements['newRows'].push(newRow)
      tbody.appendChild(newRow)
    }

    td.style.width = `${100 / newWidth}% !important`;
    newRow.appendChild(td)
  })
  //*//*//
  ////// MAYBE A BETTER WAY.
  //*//*//
  // if (newWidth < currentWidth) {
  //   const diffrence = currentWidth - newWidth
  //   const elementsToMove = []
  //   changeableElements['newRows'].forEach((row, index) => {

  //     const tdElements = Array.from(row.children)

  //     const tdsToMove = tdElements.splice(-Math.min(diffrence + index, currentWidth))

  //     elementsToMove.push(...tdsToMove)

  //     tdsToMove.forEach(td => {
  //       row.removeChild(td)
  //     })

  //     const numOfTdsToAdd = Math.min(index, newWidth)

  //     for (let i = 0; i < numOfTdsToAdd; i++) {
  //       row.insertBefore(elementsToMove[i], row.firstChild)
  //     }

  //     elementsToMove.splice(0, numOfTdsToAdd)
  //   })

  //   if (elementsToMove.length) {
  //     const tbody = globalTable.firstChild
  //     let newRow

  //     elementsToMove.forEach((td, index) => {
  //       if (index % newWidth === 0) {
  //         newRow = document.createElement('tr')
  //         newRow.className = "newTableRow newPrintingElement"
  //         tbody.appendChild(newRow)
  //       }
  //       newRow.appendChild(td)
  //       console.log(newRow);
  //     })
  //   }
  // } else if (newWidth > currentWidth) {
  //   console.log(newWidth);
  // }
  //*//*//
  ////// MAYBE A BETTER WAY.
  //*//*//
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
  window.print()
}

const newMainButton = document.createElement("button");
newMainButton.innerHTML = "NOVE CENE";
newMainButton.classList.add('newMainButton')
newMainButton.onclick = clickHandler;

const clickListener = window.addEventListener("click", showButton, true);