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

<script>
    $(document).ready(function() {
        $('#1').DataTable({
            "iDisplayLength": 5,
            "aLengthMenu": [
                [5, 10, 15, -1],
                [5, 10, 15, "All"]
            ]
        });
    });
</script>
<script>
    $(document).ready(function() {
        $('#2').DataTable({
            "iDisplayLength": 5,
            "aLengthMenu": [
                [5, 10, 15, -1],
                [5, 10, 15, "All"]
            ]
        });
    });
</script>

<script>
    am4core.ready(function() {
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("penghunian", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();

        chart.data = [{
                country: "Huni",
                litres: <?= $huni ?>
            },
            {
                country: "Belum Huni",
                litres: <?= $belum_huni ?>
            }

        ];

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.labels.template.fontSize = 23;
        pieSeries.labels.template.fontWeight = "bold";
        pieSeries.ticks.template.disabled = true;
        pieSeries.alignLabels = false;
        pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
        pieSeries.labels.template.radius = am4core.percent(-40);
        pieSeries.labels.template.fill = am4core.color("white");

    }); // end am4core.ready()
</script>

<script>
    am4core.ready(function() {
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("pengelolaan", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();

        chart.data = [{
            "country": "Belum Proses",
            "litres": <?= $diagram_pengelolaan->belum ?>,
            "color": am4core.color("#ff0000")
        }, {
            "country": "Proses",
            "litres": <?= $diagram_pengelolaan->proses ?>,
            "color": am4core.color("#ffff00")
        }, {

            "country": "Sudah BAST",
            "litres": <?= $diagram_pengelolaan->sudah_bast ?>,
            "color": am4core.color("#00ff00")
        }];

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.propertyFields.fill = "color";
        pieSeries.ticks.template.disabled = true;
        pieSeries.alignLabels = false;
        pieSeries.labels.template.fontSize = 23;
        pieSeries.labels.template.fontWeight = "bold";
        pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
        pieSeries.labels.template.radius = am4core.percent(-40);
        pieSeries.labels.template.fill = am4core.color("white");

    }); // end am4core.ready()
</script>

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