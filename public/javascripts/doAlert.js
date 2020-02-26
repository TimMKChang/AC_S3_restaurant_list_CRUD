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
}
