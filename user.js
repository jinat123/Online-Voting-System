const jobForm = document.getElementById('job-form');
const jobList = document.getElementById('job-list');

// Handle form submission
jobForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const jobTitle = document.getElementById('job-title').value;
  const company = document.getElementById('company').value;
  const location = document.getElementById('location').value;
  const salary = document.getElementById('salary').value;
  const jobType = document.getElementById('job-type').value;
  const description = document.getElementById('description').value;

  // Create a new row
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${jobTitle}</td>
    <td>${company}</td>
    <td>${location}</td>
    <td>${salary}</td>
    <td>${jobType}</td>
    <td>${description}</td>
    <td class="actions">
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </td>
  `;

  // Append row to table
  jobList.appendChild(row);

  // Clear form
  jobForm.reset();

  // Add event listeners for edit and delete buttons
  const editBtn = row.querySelector('.edit');
  const deleteBtn = row.querySelector('.delete');

  editBtn.addEventListener('click', () => toggleEditMode(row, editBtn));
  deleteBtn.addEventListener('click', () => deleteJob(row));
});

// Function to delete a job
function deleteJob(row) {
  row.remove();
}

// Function to toggle edit/save mode
function toggleEditMode(row, editBtn) {
  const cells = row.querySelectorAll('td');

  if (editBtn.textContent === 'Edit') {
    for (let i = 0; i < cells.length - 1; i++) {
      const input = document.createElement('input');
      input.type = i === 3 ? 'number' : 'text';
      input.value = cells[i].textContent;
      cells[i].textContent = '';
      cells[i].appendChild(input);
    }
    editBtn.textContent = 'Save';
  } else {
    for (let i = 0; i < cells.length - 1; i++) {
      const input = cells[i].querySelector('input');
      cells[i].textContent = input.value;
    }
    editBtn.textContent = 'Edit';
  }
}
