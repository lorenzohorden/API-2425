import './index.css';

console.log('Hello, world!');

const items = document.querySelectorAll(".genre");
const slots = document.querySelectorAll(".genre-box");

items.forEach((item) => {
    item.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", item.id);
    });
});

slots.forEach((slot) => {
    slot.addEventListener("dragover", e => {
        e.preventDefault();
    });

    slot.addEventListener("drop", e => {
        e.preventDefault();

        const droppedGenreId = e.dataTransfer.getData("text/plain");
        const droppedGenre = document.getElementById(droppedGenreId);

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