<!-- Header -->
<div class="header bg-default pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center py-4">
            </div>
            <!-- Card stats -->
        </div>
    </div>
</div>
<!-- Page content -->
<div class="container-fluid mt--6">
    <div class="row">
        <div class="col-xl-12">
            <div class="card bg-transparent">
                <div class="card-header bg-primary">
                    <div class="row align-items-center">
                        <div class="col">
                            <h6 class="text-light text-white text-uppercase ls-1 mb-1">Overview</h6>
                            <h5 class="h1 text-white mb-0">Penghunian</h5>
                        </div>
                    </div>
                </div>
                <div class="card-body">

                    <div class="nav-wrapper">
                        <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 active lebar100 bg-default" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><img src="<?= base_url('assets') ?>/img/flat.png" width="42" height="50">
                                    <h3>
                                        <font color="white"> Berdasarkan Tahun Anggaran</font>
                                    </h3>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 lebar100 bg-default" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><img src="<?= base_url('assets') ?>/img/flat.png" width="42" height="50">
                                    <h3>
                                        <font color="white"> Berdasarkan Penerima Manfaat</font>
                                    </h3>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 lebar100 bg-default" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false"><img src="<?= base_url('assets') ?>/img/flat.png" width="42" height="50">
                                    <h3>
                                        <font color="white">Persebaran </font>
                                    </h3>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="card shadow">
                        <div class="card-body">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                    <div class="table-responsive py-4">
                                        <table class="table table-flush" id="1">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>Tahun Anggaran</th>
                                                    <th>Total</th>
                                                    <th>Huni</th>
                                                    <th>Belum Huni</th>
                                                    <th width="100">Tools</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                                    <div class="table-responsive py-4">
                                        <table class="table table-flush" id="2">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>Penerima Manfaat</th>
                                                    <th>Total</th>
                                                    <th>Huni</th>
                                                    <th>Belum Huni</th>
                                                    <th width="100">Tools</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                                    <div id="container-penghunian"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>