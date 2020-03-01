// doAlert.js

// alert feature object
doAlert = {
  // use sweetalert to confirm when delete
  delete_alert(form) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this restaurant!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isDelete) => {
        if (isDelete) {
          form.submit();
        }
      });
  },
  create_alert() {
    const nameInput = document.querySelector('input[id="name"]')
    if (nameInput.value === '') {
      event.preventDefault();

      swal({
        title: "Please add more information!",
        text: "Restaurant Chinese Name is a required field!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })

      return false
    }
  },
}

window.addEventListener('scroll', function (event) {
  const toTop = document.querySelector('#toTop')
  toTop.style.setProperty('top', `calc(${window.scrollY}px + 75vh)`)
})
