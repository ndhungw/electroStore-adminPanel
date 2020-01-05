const Handlebars = require("handlebars");

//Create pagination
Handlebars.registerHelper('createPagination',
function (totalPage, currentPage){
  let arr = '';
  let i = 1;
  while(i <= totalPage){
    arr = arr.concat(`<li class="page-item ${i === currentPage ?'active' : ''}"><a class="page-link" href="/members/?page=${i}&limit=5">${i}</a></li>`);
    i++;
  }
  let result = `<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="page-item ${currentPage - 1 < 1 ? 'disabled' : ''}"><a class="page-link" href="/members?page=${currentPage - 1}&limit=5">Previous</a></li>
    ${arr}
    <li class="page-item ${currentPage + 1 > totalPage ? 'disabled' : ''}"><a class="page-link" href="/members?page=${currentPage + 1}&limit=5">Next</a></li>
  </ul>
</nav>`;
  //console.log(result);
  return result;
}
);

//Display message error
Handlebars.registerHelper('displayErrorMessage',
function (errors){
  if(typeof errors != 'undefined') {
    let s = ''
    errors.forEach(error => {
      let makedupMsg = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        ${error.msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
      s = s.concat(s,makedupMsg);
    });
    return s
  }else{
    console.log('no error')
  }
});

Handlebars.registerHelper('displayFlashMessage', 
function(successMsg, errorMsg, error) {
  if (successMsg != '') {
    return `<div class="alert alert-success alert-dismissible fade show" role="alert">
        ${successMsg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
  }

  if (errorMsg != '') {
    return `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        ${errorMsg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
  }

  if (error != '') {
    return `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        ${error}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
  }
});