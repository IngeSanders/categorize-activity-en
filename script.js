function addDragListeners(card) {
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', card.outerHTML);
    e.dataTransfer.setData('id', card.id);
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
}

document.querySelectorAll('.card').forEach(addDragListeners);

document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('dragover', e => {
    e.preventDefault();
  });

  cat.addEventListener('drop', e => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (dragging) cat.appendChild(dragging);
  });
});

document.getElementById('submit-btn').addEventListener('click', () => {
  let correct = 0;
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const category = card.parentElement.id;
    const expected = card.getAttribute('data-category');
    if (category === expected) correct++;
  });

  const feedback = document.getElementById('feedback');
  if (correct === cards.length) {
    feedback.innerText = "✅ Everything is in the right place!";
    feedback.style.color = "green";
  } else {
    feedback.innerText = "❌ Not everything is correct. Try again.";
    feedback.style.color = "red";
  }
});

document.getElementById('reset-btn').addEventListener('click', () => {
  const cardContainer = document.getElementById('card-container');
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => {
    cardContainer.appendChild(card);
  });

  const feedback = document.getElementById('feedback');
  feedback.innerText = "";
});
