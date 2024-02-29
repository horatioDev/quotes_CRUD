const updateBtns = document.querySelectorAll('#update-btn');
const deleteBtns = document.querySelectorAll('#delete-btn');
const cancelBtns = document.querySelectorAll('#cancel-btn');
const saveBtns = document.querySelectorAll('#save-btn');

updateBtns.forEach(updateBtn => {
  updateBtn.addEventListener('click', _ => {
    // get the id from url parameter
    const quoteId = updateBtn.dataset.id;
    console.log('clicked UPDATE btn', quoteId);
    window.location.href =`/quotes/${quoteId}/edit`;
  });
})

function getEditFormData() {
  const form = document.getElementById('editQuoteForm');
  const quoteFormData = {}
  const editForm = new FormData(form);
  console.log('ef',editForm)
  for(const [key, val] of editForm.entries()) {
    quoteFormData[key] = val;
  }
  console.log(quoteFormData)
  return quoteFormData;
}
// handle when a user clicks "Save Changes" on the Edit Quote page
saveBtns.forEach(saveBtn => {
  saveBtn.addEventListener("click", _=> {
    const quoteId = saveBtn.dataset.id;
    const quoteUpdatedData = getEditFormData();
    // send PUT request to server with updated information
    fetch(`/quotes/${quoteId}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quoteUpdatedData)
      }).then(_=> {
        alert('Your changes have been saved!')
      })
      .catch(err => console.error(err))
  })

})

// saveBtns.forEach(saveBtn => {
//   saveBtn.addEventListener('click', _ => {
//     const quoteId = saveBtn.dataset.id;
//     // const quoteUpdatedData = getEditFormData();
//     console.log('id', quoteId, quoteUpdatedData)

//     fetch(`/quotes/${quoteId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ quoteUpdatedData })
//     }).then(_=> {
      //   alert('Your changes have been saved!')
      // })
      // .catch(err => console.error(err))

//   });
// });

// 


cancelBtns.forEach(cancelBtn => {
  cancelBtn.addEventListener('click', _ => {

  });
});

deleteBtns.forEach(deleteBtn => {
  deleteBtn.addEventListener('click', _ => {
    const quoteId = deleteBtn.dataset.id;
    // const quoteDeleteData = getEditFormData();
    console.log(quoteId)
    fetch(`/quotes/${quoteId}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(quoteDeleteData)
    })
      .then(res => {
        if (res.ok) {
          console.log(res)
          return res.json()
        }
      })
      .then(data => {
        console.log('Deleted:', data)
        alert('Your changes have been saved!')
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while deleting the quote. Please try again later.'); 
      })
  });
});