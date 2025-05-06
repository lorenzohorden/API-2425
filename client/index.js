import './index.css';

console.log('Hello, world!');

const items = document.querySelectorAll(".genre");
const slots = document.querySelectorAll(".genre-box");

items.forEach((item) => {
    item.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", item.id);
    });
});


let elements = document.querySelectorAll("fieldset")
const formQuestions = Array.from(elements).map(fieldset => fieldset.id)

console.log(formQuestions)

slots.forEach((slot) => {
    slot.addEventListener("dragover", e => {
        e.preventDefault();
    });

    slot.addEventListener("drop", e => {
        e.preventDefault();

        // get question id
        let questionId = e.srcElement.id
        if(e.srcElement.classList[0] != "genre-box") {
            questionId = e.srcElement.parentElement.id
        }
        console.log(e)

        const droppedGenreId = e.dataTransfer.getData("text/plain");
        const droppedGenre = document.getElementById(droppedGenreId);

        console.log(droppedGenreId)
        console.log(questionId)

        console.log(document.querySelector(`input[name=${questionId}][value=${droppedGenreId}]`))
        document.querySelector(`input[name=${questionId}][value=${droppedGenreId}]`).checked = true

        const currentChild = slot.querySelector(".genre");

        if (currentChild && currentChild !== droppedGenre) {
            // Er zit al iets in dit slot -> swap
            swapGenres(droppedGenre, currentChild);
        } else {
            // Slot is leeg -> gewoon toevoegen
            slot.appendChild(droppedGenre);
        }
    });
});

function swapGenres(droppedDiv, otherDiv) {
    const droppedDivParent = droppedDiv.parentElement;
    const otherDivParent = otherDiv.parentElement;

    // Wissel van plek
    droppedDivParent.appendChild(otherDiv);
    otherDivParent.appendChild(droppedDiv);
}


function selectThreeGenres() {
    const checkboxes = document.querySelectorAll('input[name="genre"]');
    const submitBtn = document.getElementById('submitBtn');
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const checked = document.querySelectorAll('input[name="genre"]:checked');
  
        if (checked.length === 3) {
          // Disable the rest
          checkboxes.forEach(box => {
            if (!box.checked) {
              box.disabled = true;
            }
          });
          submitBtn.disabled = false;
        } else {
          // Re-enable all and disable submit if not exactly 3
          checkboxes.forEach(box => box.disabled = false);
          submitBtn.disabled = true;
        }
      });
    });
  
    document.getElementById("genreForm").addEventListener("submit", (e) => {
      e.preventDefault(); // voorkom echt versturen, optioneel
      const selected = [...document.querySelectorAll('input[name="genre"]:checked')]
        .map(cb => cb.value);
      alert("Geselecteerde genres: " + selected.join(", "));
    });
}

function shuffleGenres() {
    const tracks = document.querySelectorAll(".spotify-track")
    const genreBoxes = document.querySelectorAll(".genre-box")

    const numbers = [0, 1, 2];
    // Fisher-Yates shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    for (let i = 1; i < items.length+1; i++) {
        genreBoxes[numbers[i-1]].style.gridColumn = `${i} / ${i + 1}`
        tracks[numbers[i-1]].style.gridColumn = `${i} / ${i + 1}`
    }
}

function popOver() {
    const popover = document.querySelector("#popover")
    const closeButton = document.querySelector("#popover button")
    if(popover){
        popover.showPopover()

        // check answers
        const correctGenres = document.querySelectorAll(".popover-genre")
        const answers = document.querySelectorAll(".answer")
        console.log(correctGenres, answers)

        for (let i = 0; i < answers.length; i++) {
            if (correctGenres[i].innerHTML === answers[i].innerHTML) {
                console.log(answers[i].innerHTML)
                console.log(correctGenres[i].innerHTML)
                answers[i].style.color = "green"
            } else {
                answers[i].style.color = "red"
            }
        }

        closeButton.addEventListener("click", () => {
            popover.style.display = "none"
        })
    }
}

popOver()
shuffleGenres()
selectThreeGenres()