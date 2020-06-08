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

<script src="<?= base_url('assets/highmaps') ?>/maps/highmaps.js"></script>
<script src="<?= base_url('assets/highmaps') ?>/maps/modules/exporting.js"></script>
<script src="<?= base_url('assets/highmaps') ?>/mapdata/countries/id/kaltara.js"></script>
<script>
    $(document).ready(function() {
        $('#1').DataTable({
            "autoWidth": true,
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
            "autoWidth": true,
            "iDisplayLength": 5,
            "aLengthMenu": [
                [5, 10, 15, -1],
                [5, 10, 15, "All"]
            ]
        });
    });
</script>
<script>
    var data = [
        ['id-3700', 0],
        ['id-ac', 1],
        ['id-jt', 2],
        ['id-be', 3],
        ['id-bt', 4],
        ['id-kb', 5],
        ['id-bb', 6],
        ['id-ba', 7],
        ['id-ji', 8],
        ['id-ks', 9],
        ['id-nt', 10],
        ['id-se', 11],
        ['id-kr', 12],
        ['id-ib', 13],
        ['id-su', 14],
        ['id-ri', 15],
        ['id-sw', 16],
        ['id-ku', 17],
        ['id-la', 18],
        ['id-sb', 19],
        ['id-ma', 20],
        ['id-nb', 21],
        ['id-sg', 22],
        ['id-st', 23],
        ['id-pa', 24],
        ['id-jr', 25],
        ['id-ki', 26],
        ['id-1024', 27],
        ['id-jk', 28],
        ['id-go', 29],
        ['id-yo', 30],
        ['id-sl', 31],
        ['id-sr', 32],
        ['id-ja', 33],
        ['id-kt', 34]
    ];

    // Create the chart
    Highcharts.mapChart('container', {
        chart: {
            map: 'countries/id/id-all'
        },

        title: {
            text: 'Persebaran Penghunian'
        },

        subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/id/id-all.js">Indonesia</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: data,
            name: 'Random data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
</script>



</body>

</html>