const voteForm = document.getElementById('voting-form');
const resultsList = document.getElementById('results-list');
const voteCountTable = document.getElementById('results-vote-count');
let votes = []; 
let candidatesVotes = { "Candidate 1": 0, "Candidate 2": 0, "Candidate 3": 0, "Candidate 4": 0 };
let editingIndex = -1; 


voteForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const dob = document.getElementById('dob').value;
  const candidate = document.getElementById('candidates').value;
  const voteDate = new Date().toLocaleString();

  if (candidate === '') {
    alert("Please select a candidate.");
    return;
  }

  const newVote = {
    firstName,
    lastName,
    dob,
    candidate,
    voteDate
  };

  if (editingIndex === -1) {
    // Add new vote if not editing
    votes.push(newVote);
    candidatesVotes[candidate]++;
  } else {
    // Update the existing vote if editing
    const oldVote = votes[editingIndex];
    candidatesVotes[oldVote.candidate]--; 
    votes[editingIndex] = newVote; 
    candidatesVotes[candidate]++; 
    editingIndex = -1; 
  }

  updateResultsTable(); 

  // Clear form
  voteForm.reset();
});

// Function to update the results table with votes
function updateResultsTable() {
  resultsList.innerHTML = ''; // Clear current results

  // Add each vote to the table
  votes.forEach((vote, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${vote.firstName} ${vote.lastName}</td>
      <td>${vote.voteDate}</td>
      <td>${vote.candidate}</td>
      <td class="actions">
        <button class="edit" onclick="editVote(${index})">Edit</button>
        <button class="delete" onclick="deleteVote(${index})">Delete</button>
      </td>
    `;
    resultsList.appendChild(row);
  });

  // Update vote count table
  voteCountTable.innerHTML = '';
  for (let candidate in candidatesVotes) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${candidate}</td>
      <td>${candidatesVotes[candidate]}</td>
    `;
    voteCountTable.appendChild(row);
  }
}

// Function to delete a vote
function deleteVote(index) {
  const deletedVote = votes[index];
  candidatesVotes[deletedVote.candidate]--; 
  votes.splice(index, 1); 

  updateResultsTable(); 
}
function editVote(index) {
  const vote = votes[index];
  document.getElementById('first-name').value = vote.firstName;
  document.getElementById('last-name').value = vote.lastName;
  document.getElementById('dob').value = vote.dob;
  document.getElementById('candidates').value = vote.candidate;


  editingIndex = index;

  const submitButton = document.querySelector('form button');
  submitButton.textContent = 'Save Changes';
}

// Function to reset form
function resetForm() {
  editingIndex = -1; 

  const submitButton = document.querySelector('form button');
  submitButton.textContent = 'Vote';
}

voteForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const dob = document.getElementById('dob').value;
  const candidate = document.getElementById('candidates').value;
  const voteDate = new Date().toLocaleString();

  const newVote = {
    firstName,
    lastName,
    dob,
    candidate,
    voteDate
  };

  if (editingIndex !== -1) {
    // Editing an existing vote
    const oldVote = votes[editingIndex];
    candidatesVotes[oldVote.candidate]--; 
    votes[editingIndex] = newVote; 
    candidatesVotes[candidate]++; 

    resetForm(); 
  } else {
    // Adding a new vote
    votes.push(newVote);
    candidatesVotes[candidate]++;
  }

  updateResultsTable(); 
  voteForm.reset(); 
});
