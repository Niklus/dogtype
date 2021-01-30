const imagesContainer = document.querySelector(".images");
const dataList = document.querySelector("#dog-list");
const input = document.querySelector("input");
const breedTitle = document.querySelector(".breed");
const dogList = getDogList();

input.addEventListener("change", () => {
  const breed = input.value;
  if (breed) {
    getImages(breed);
    input.value = "";
  }
});

function renderOptions() {
  let options = "";

  dogList.forEach((breed) => {
    if (/\s/.test(breed)) {
      breed = breed.replace(" ", "&nbsp;");
    }
    options += `
    <option value=${breed}></option>  
  `;
  });

  dataList.innerHTML = options;
}

renderOptions();

function getImages(str) {
  let url;

  if (/\s/.test(str)) {
    const [sub, , breed] = str.split(/(\s+)/);
    url = `https://dog.ceo/api/breed/${breed}/${sub}/images`;
  } else {
    url = `https://dog.ceo/api/breed/${str}/images`;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      renderImages(data);
      breedTitle.innerHTML = str;
    });
}

function renderImages(data) {
  let images = "";

  data.message.forEach((imgUrl) => {
    images += `
      <a href=${imgUrl} target="_blank">
        <img src=${imgUrl} alt="dog" loading="lazy"/>
      </a>
    `;
  });

  imagesContainer.innerHTML = images;
}

function init() {
  const breed = dogList[Math.floor(Math.random() * dogList.length)];
  getImages(breed);
}

init();
