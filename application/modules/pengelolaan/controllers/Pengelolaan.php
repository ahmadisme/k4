<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pengelolaan extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();


        $this->load->library('upload');
    }

    public function index()
    {


        $data['title'] = "Pengelolaan";
        $data['title']     = "SIRUSUN v3.0";
        $data['title2'] = "Dashboard";
        $data['jumlah_tb'] = $this->db->query('SELECT ta,tb,
        sum(tb) AS total,
        sum(case when nama_posisi_dokumen_aset= "Belum bisa di proses Serah Terima Aset" then tb else 0 end) AS belum,
        sum(case when nama_posisi_dokumen_aset= "Kementerian Keuangan" OR nama_posisi_dokumen_aset = "Lengkap Dokumen Eksternal" OR nama_posisi_dokumen_aset = "Pengembalian Dari Setditjen ke Ditrusun" OR nama_posisi_dokumen_aset = "Proses di Setneg" OR nama_posisi_dokumen_aset = "Proses Pemberkasan ke Satker" OR nama_posisi_dokumen_aset = "Proses Pemberkasan ke Sekjen" OR nama_posisi_dokumen_aset = "Proses Pemberkasan ke Setditjen" then tb else 0 end) AS proses,
        sum(case when nama_posisi_dokumen_aset= "Proses Pembuatan BAST di Setditjen" OR nama_status_bangunan = "Telah diterbitkan SK Penghapusan & BAST" then tb else 0 end) AS sudah_bast
        FROM tb_bangunan')->row();




        $this->load->view('layout/header', $data);
        $this->load->view('index', $data);
        $this->load->view('layout/footer', $data);
    }
}
