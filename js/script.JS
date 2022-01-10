//  Check If There's Local Storage Color option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main--color", mainColor);

  //  Remove active Class From All Colors List Items
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");
    //  Add Active Class On Element With Data-color === local Storage Item
    if (element.dataset.color === mainColor) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Random BAckground Option
let backgraoundOption = true;

// Variable To Control The Interval
let backgraoundInterval;

// Check If There's Local Storage Random Background Item
let backgraoundLocalItem = localStorage.getItem("backgground_Option");

// Check If Random Background Local Storage Is Not Empty

if (backgraoundLocalItem !== null) {
  if (backgraoundLocalItem === "true") {
    backgraoundOption = true;
  } else {
    backgraoundOption = false;
  }

  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgraound span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgraoundLocalItem === "true") {
    document.querySelector(".random-backgraound .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgraound .no").classList.add("active");
  }
}

//  Variable To Controle The Background Interval
document.querySelector(".toggle-settings #font").onclick = function () {
  // Toggle Class Fa-Spin For Routation On Self
  this.classList.toggle("fa-spin");

  //  Toggle Class Open On Maun Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".color-list li");

//  Loop On All List Items

colorsLi.forEach((li) => {
  //  Click On Every List Items
  li.addEventListener("click", (e) => {
    // set Color On Root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch Random Background Opation
const randombackEl = document.querySelectorAll(".random-backgraound span");

//  Loop On All spans
randombackEl.forEach((span) => {
  //  Click On Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgraoundOption = true;
      randomaizeImgs();

      localStorage.setItem("backgground_Option", true);
    } else {
      backgraoundOption = false;
      clearInterval(backgraoundInterval);
      localStorage.setItem("backgground_Option", false);
    }
  });
});

// Select Landing page Element

let landingPage = document.querySelector(".landibg-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];

// Function To Randomaize Imgs
function randomaizeImgs() {
  if (backgraoundOption === true) {
    backgraoundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Cackground Imgs Url

      landingPage.style.backgroundImage =
        "url('./img/" + imgsArray[randomNumber] + "')";
    }, 1000);
  }
}

randomaizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offest Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height    // offsetHeight   بتحسبلك بالبكسل البوردر والبادينج المارجن
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height        // innerHeight  بتحسبلك ارتفاع الصفحه الي انت فيهه
  let windowHeight = this.innerHeight;

  // Window ScrollTop       //  pageYOffset   بيرجع البكسل الخاص ب الجزء الذي تعمله سكرول
  let windowScrollTop = this.pageYOffset;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - 100
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let Overlay = document.createElement("div");

    // Add Class To Overlay
    Overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(Overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Creat Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To THe Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Soource
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Box
    document.body.appendChild(popupBox);

    // Create The Close Span
    let clossButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text Close Buttone
    clossButton.appendChild(closeButtonText);

    // Add Class To Close Button
    clossButton.className = "closs-button";

    // Add Close Button To Popup Box
    popupBox.appendChild(clossButton);
  });
});

// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "closs-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All links

const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// Handle Active Stats
function handleActive(ev) {
  //  Remove active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //  Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem(".bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem(".bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem(".bullets-option", "none");
    }
    handleActive(e);
  });
});

// Reset Button

document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  // localStorage.removeItem("color-option")
  // localStorage.removeItem("background-option")
  // localStorage.removeItem("bullets-option")

  // Reload Window
  window.location.reload();
};

// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "Open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open

    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "Open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
