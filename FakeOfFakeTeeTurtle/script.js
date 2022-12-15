// get the pagination links
var pageLinks = document.querySelectorAll('.pagination a.page-link');

// loop through each pagination link
for (var i = 0; i < pageLinks.length; i++) {
  // add a click event listener to each pagination link
  pageLinks[i].addEventListener('click', function(event) {
    // prevent the default behavior of the link
    event.preventDefault();

    // get the page number of the clicked link
    var pageNumber = parseInt(event.target.textContent);

    // update the active page number
    updateActivePage(pageNumber);
  });
}

function updateActivePage(pageNumber) {
  // get the current active page number
  var currentActivePage = document.querySelector('.pagination .active a.page-link');

  // remove the active class from the current active page
  currentActivePage.classList.remove('active');

  // add the active class to the new active page
  var newActivePage = document.querySelector('.pagination a.page-link:nth-child(' + pageNumber + ')');
  newActivePage.classList.add('active');

  // update the content of the grid
  updateGridContent(pageNumber);
}

function updateGridContent(pageNumber) {
  // get the grid cells
  var gridCells = document.querySelectorAll('.container .row .col-3');

  // loop through each grid cell
  for (var i = 0; i < gridCells.length; i++) {
    // update the content of each grid cell
    gridCells[i].innerHTML = 'Page ' + pageNumber + ' - Cell ' + (i + 1);
  }
}
