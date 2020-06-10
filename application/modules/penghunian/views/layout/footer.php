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
        $('#1').dataTable({
            "autoWidth": false,
            "columns": [{
                    "width": "100%"
                },
                {
                    "width": "10%"
                },
                {
                    "width": "20%"
                },
            ]
        });
        $('#2').dataTable({
            "autoWidth": false,
            "columns": [{
                    "width": "100%"
                },
                {
                    "width": "10%"
                },
                {
                    "width": "20%"
                },

            ]
        });
        $('#3').dataTable({
            "autoWidth": false,
            "columns": [{
                    "width": "100%"
                },
                {
                    "width": "20%"
                },
                {
                    "width": "30%"
                },
                {
                    "width": "20%"
                }

            ]
        });
        $('#4').dataTable({
            "autoWidth": false,
            "columns": [{
                    "width": "100%"
                },
                {
                    "width": "20%"
                },
                {
                    "width": "30%"
                },
                {
                    "width": "20%"
                }

            ]
        });
        $('#5').dataTable({
            "autoWidth": false,
            "columns": [{
                    "width": "100%"
                },
                {
                    "width": "20%"
                },
                {
                    "width": "20%"
                },
                {
                    "width": "20%"
                },
                {
                    "width": "20%"
                }


            ]
        });
    });
</script>
<!-- <script>
    $(document).ready(function() {
        $('#2').dataTable({
            "autoWidth": false,
            "columns": [{
                    "width": "100%"
                },
                {
                    "width": "10%"
                },
                {
                    "width": "20%"
                },

            ]
        });
    });
</script> -->
<script>
    // Prepare demo data
    // Data is joined to map using value of 'hc-key' property by default.
    // See API docs for 'joinBy' for more info on linking data and map.
    var data = [
        ['id-3700', 0],
        ['id-ac', 1, <?= $aceh->huni ?>, <?= $aceh->belum_huni ?>, "Aceh"],
        ['id-ki', 2, <?= $kaltim->huni ?>, <?= $kaltim->belum_huni ?>, "Kalimantan Timur"],
        ['id-jt', 3, <?= $jateng->huni ?>, <?= $jateng->belum_huni ?>, "Jawa Tengah"],
        ['id-be', 4, <?= $bengkulu->huni ?>, <?= $bengkulu->belum_huni ?>, "Bengkulu"],
        ['id-bt', 5, <?= $banten->huni ?>, <?= $banten->belum_huni ?>, "Banten"],
        ['id-kb', 6, <?= $kalbar->huni ?>, <?= $kalbar->belum_huni ?>, "Kalimantan Barat"],
        ['id-bb', 7, <?= $babel->huni ?>, <?= $babel->belum_huni ?>, "Bangka Belitung"],
        ['id-ba', 8, <?= $bali->huni ?>, <?= $bali->belum_huni ?>, "Bali"],
        ['id-ji', 9, <?= $jatim->huni ?>, <?= $jatim->belum_huni ?>, "Jawa Timur"],
        ['id-ks', 10, <?= $kalsel->huni ?>, <?= $kalsel->belum_huni ?>, "Kalimantan Selatan"],
        ['id-nt', 11, <?= $ntt->huni ?>, <?= $ntt->belum_huni ?>, "Nusa Tenggara Timur"],
        ['id-se', 12, <?= $sulsel->huni ?>, <?= $sulsel->belum_huni ?>, "Sulawesi Selatan"],
        ['id-kr', 13, <?= $kepri->huni ?>, <?= $kepri->belum_huni ?>, "Kepulauan Riau"],
        ['id-ib', 14, <?= $papbar->huni ?>, <?= $papbar->belum_huni ?>, "Papua Barat"],
        ['id-su', 15, <?= $sumut->huni ?>, <?= $sumut->belum_huni ?>, "Sumatera Utara"],
        ['id-ri', 16, <?= $riau->huni ?>, <?= $riau->belum_huni ?>, "Riau"],
        ['id-sw', 17, <?= $sulut->huni ?>, <?= $sulut->belum_huni ?>, "Sulawesi Utara"],
        ['id-la', 18, <?= $malut->huni ?>, <?= $malut->belum_huni ?>, "Maluku Utara"],
        ['id-sb', 19, <?= $sumbar->huni ?>, <?= $sumbar->belum_huni ?>, "Sumatera Barat"],
        ['id-ma', 20, <?= $maluku->huni ?>, <?= $maluku->belum_huni ?>, "Maluku"],
        ['id-nb', 21, <?= $ntb->huni ?>, <?= $ntb->belum_huni ?>, "Nusa Tenggara Barat"],
        ['id-sg', 22, <?= $sultra->huni ?>, <?= $sultra->belum_huni ?>, "Sulawesi Tenggara"],
        ['id-st', 23, <?= $sulteng->huni ?>, <?= $sulteng->belum_huni ?>, "Sulawesi Tengah"],
        ['id-pa', 24, <?= $papua->huni ?>, <?= $papua->belum_huni ?>, "Papua"],
        ['id-jr', 25, <?= $jabar->huni ?>, <?= $jabar->belum_huni ?>, "Jawa Barat"],
        ['id-1024', 26, <?= $lampung->huni ?>, <?= $lampung->belum_huni ?>, "Lampung"],
        ['id-jk', 27, <?= $jakarta->huni ?>, <?= $jakarta->belum_huni ?>, "DKI Jakarta"],
        ['id-go', 28, <?= $gorontalo->huni ?>, <?= $gorontalo->belum_huni ?>, "Gorontalo"],
        ['id-yo', 29, <?= $yogya->huni ?>, <?= $yogya->belum_huni ?>, "D.I Yogyakarta"],
        ['id-kt', 30, <?= $kalteng->huni ?>, <?= $kalteng->belum_huni ?>, "Kalimantan Tengah"],
        ['id-sl', 31, <?= $sumsel->huni ?>, <?= $sumsel->belum_huni ?>, "Sumatera Selatan"],
        ['id-sr', 32, <?= $sulbar->huni ?>, <?= $sulbar->belum_huni ?>, "Sulawesi Barat"],
        ['id-ja', 33, <?= $jambi->huni ?>, <?= $jambi->belum_huni ?>, "Jambi"],
        ['id-ku', 34, <?= $kaltara->huni ?>, <?= $kaltara->belum_huni ?>, "Kalimantan Utara"]
    ];

    // Create the chart
    Highcharts.mapChart('container', {
        chart: {
            map: 'countries/id/id-all'
        },

        title: {
            text: 'Persebaran Rumah Susun di Indonesia'
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
            name: '<font size="5">Data Penghunian</font>',
            enableMouseTracking: true,
            keys: ['hc-key', 'rank', 'value1', 'value2', 'value3'],
            states: {

                hover: {
                    color: '#ffe5b4'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },

        }],
        tooltip: {
            useHTML: true,
            followPointer: false,
            style: {
                pointerEvents: "auto"
            },

            pointFormat: '<span><img src="<?= base_url('assets') ?>/img/flat.png" width="50" height="50"> <font size="5">Huni:  <b>{point.value1}</b>,<img src="<?= base_url('assets') ?>/img/flat_grey.png" width="50" height="50"> Belum Huni: <b>{point.value2}</b></span></br></br><a href="<?= base_url('penghunian') ?>/penghunian_provinsi/{point.rank}" target="_blank">Detail Provinsi {point.value3}</a></font>'
        }
    });
</script>



</body>

</html>