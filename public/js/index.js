// render function for all the kudos
const render = function (list) {

    // div emptier //
    $('#kudos').empty();
  
    // loops through appending each card kudo to divs//
    for (let i = 0; i < list.length; i++) {
      $('#kudos').append(
        // ${list[i]._id}     was going to use this to show ID but mongoose is ugly IDs
        `<div class="card mb-3">
          <div class="card-header " id="kudo-title"><h4> To: ${list[i].to}</h4></div>
          <div class="card-body">
            <h5 class="card-title"><h2>${list[i].title}</h2></h5>
              <p class="card-text">${list[i].body}</p>
          </div>
          <div class="card-footer">From: ${list[i].from}</div>
          <div class="card-header " id="kudo-title"><h6> kudo id: ${list[i]._id}</h6></div>
        </div>`
        );
    }
  }
  
  // kudo get all function //
  const getKudos = function () {
    $.get(`/api/kudos/`).then(function (data) {render(data)});
  }
  
  //get users call and append them to both the To and From dropdown menu//
  const getUsers = function () {
    $.get(`/api/user/`)
      .then(function (data) {
  
        //this loops through the user list and appends  each name to both of the dropdown lists//
        for (let i = 0; i < data.length; i++) {
          $('#kudo-from')
            .append(`<option value='${data[i]._id}'>${data[i].name}</option>`)
  
          $('#kudo-to')
            .append(`<option value='${data[i]._id}'>${data[i].name}</option>`)
        }
      });
  }
  
  // Kudo post function to db //
  const postKudo = function (event) {
  
  
    event.preventDefault();
    //div emptier//
    $('#kudoz').empty();
  
    // this makes sure that both the To and From have a selected value, otherwise error prompt//
    if ($('#kudo-from').val() && $('#kudo-to').val()) {
  
      // this is the input data from the fields to go to the server.  to and from val doesnt work due to id value in dropdown. had to use selected text();
      const kudo = {
        title: $('#kudo-title').val().trim(),
        body: $('#kudo-body').val().trim(),
        from: $('#kudo-from :selected').text(),
        to: $("#kudo-to :selected").text()
      }
  
      // post kudo req
      $.post('/api/kudos', kudo)
        .then(function (data) {
          console.log(kudo)
          // after successful submit, it will clear out all the values after pushing 'kudo' to server db//
          $('#kudo-title').val('');
          $('#kudo-body').val('');
          $('#kudo-from').val('');
          $('#kudo-to').val('');
          //hides modal after//
          $('.modal').modal('hide');
  
          // after this you want it to be "dynamic" so you call the render function once more.
          getKudos();
        }).fail(function (err) {
  
          // if you cant submit due to an error , prompt this message//
          $('#kudoz').append(`<div class='alert alert-danger'>There was an error with your submission. Please try again.</div>`)
        })
    } else {
  
      //catch error if they left either dropdown unselected//
      $('#kudoz').append(`<div class='alert alert-danger'>Make sure to select a user from both dropdowns.</div>`)
    }
  }
  
  // onload function calls to get kudos and users ready and/or rendered/
  getKudos();
  getUsers();
  
  // Click listener
  $(document).on('click', '#send-kudo', postKudo);