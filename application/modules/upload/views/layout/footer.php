</div>
<!-- Argon Scripts -->
<!-- Core -->
<script src="<?= base_url('assets/argon/') ?>assets/vendor/jquery/dist/jquery.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/js-cookie/js.cookie.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js"></script>
<!-- Optional JS -->
<script src="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-buttons/js/buttons.html5.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-buttons/js/buttons.flash.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-buttons/js/buttons.print.min.js"></script>
<script src="<?= base_url('assets/argon/') ?>assets/vendor/datatables.net-select/js/dataTables.select.min.js"></script>
<!-- Argon JS -->
<script src="<?= base_url('assets/argon/') ?>assets/js/argon.min9f1e.js?v=1.1.0"></script>
<!-- Demo JS - remove this in your project -->
<script src="<?= base_url('assets/argon/') ?>assets/js/demo.min.js"></script>

<script src="<?= base_url('assets/amcharts4/') ?>core.js"></script>
<script src="<?= base_url('assets/amcharts4/') ?>charts.js"></script>
<script src="<?= base_url('assets/amcharts4/') ?>themes/animated.js"></script>
<!-- <script type="text/javascript">
    $(document).ready(function() {
        tampil_data_provinsi();

        $('#mydata').dataTable({
            "autoWidth": false,
        });


        function tampil_data_provinsi() {
            $.ajax({
                type: 'ajax',
                url: '<?= base_url('welcome') ?>/get_data',
                async: false,
                dataType: 'json',
                success: function(data) {
                    var html = '';
                    var i;
                    for (i = 0; i < data.length; i++) {
                        html += '<tr>' +
                            '<td>' + data[i].id + '</td>' +
                            '<td>' + data[i].id_provinsi + '</td>' +
                            '<td>' + data[i].nama_provinsi + '</td>' +
                            '</tr>';
                    }
                    $('#show_data').html(html);
                }

            });
        }

    });
</script> -->

<!-- <script>
    $(document).ready(function() {
        $('#provinsi').change(function() {
            var id = $(this).val();
            $.ajax({
                url: "<?php echo base_url('welcome'); ?>/get_nama_provinsi",
                method: "POST",
                data: {
                    id: id
                },
                async: false,
                dataType: 'json',
                success: function(data) {
                    var html = '';
                    var i;
                    for (i = 0; i < data.length; i++) {
                        html += '<option>' + data[i].nama_provinsi + '</option>';
                    }
                    $('#nama_provinsi').html(html);

                }
            });
        });
    });
</script> -->

</body>

</html>