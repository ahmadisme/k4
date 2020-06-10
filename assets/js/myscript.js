const flashData = $('.flash-data').data('flashdata');

if (flashData) {
    Swal.fire({
        title: 'notif',
        text: 'berhasil' + flashData,
        type: 'success',
        icon: 'success'
    });
}