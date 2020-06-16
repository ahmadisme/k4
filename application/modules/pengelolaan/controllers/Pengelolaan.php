<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pengelolaan extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('Pengelolaan_Model');
        $this->load->library('upload');
    }

    function data_bangunan()
    {
        $data = $this->Pengelolaan_Model->bangunan_list();
        echo json_encode($data);
    }
    function data_bangunan_belum_bisa_proses()
    {
        $data = $this->Pengelolaan_Model->bangunan_list_belum_bisa_proses();
        echo json_encode($data);
    }
    function data_bangunan_proses()
    {
        $data = $this->Pengelolaan_Model->bangunan_list_proses();
        echo json_encode($data);
    }
    function data_bangunan_bast()
    {
        $data = $this->Pengelolaan_Model->bangunan_list_bast();
        echo json_encode($data);
    }
    function data_bangunan_tahun_anggaran()
    {
        $data = $this->Pengelolaan_Model->bangunan_list_tahun_anggaran();
        echo json_encode($data);
    }

    public function index()
    {


        $data['title'] = "Pengelolaan";
        $data['title']     = "SIRUSUN v3.0";
        $data['title2'] = "Dashboard";
        $data['jumlah_tb'] = $this->db->query('SELECT tb,ta,
        sum(tb) AS total,
        sum(case when id_posisi_dokumen_aset= "1" then tb else 0 end) AS belum,
        sum(case when id_posisi_dokumen_aset= "2" OR id_posisi_dokumen_aset = "3" OR id_posisi_dokumen_aset = "4" OR id_posisi_dokumen_aset = "5" OR id_posisi_dokumen_aset = "6" OR id_posisi_dokumen_aset = "7" OR id_posisi_dokumen_aset = "8" then tb else 0 end) AS proses,
        sum(case when id_posisi_dokumen_aset= "9" OR id_posisi_dokumen_aset = "10" then tb else 0 end) AS sudah_bast
        FROM tb_bangunan')->row();




        $this->load->view('layout/header', $data);
        $this->load->view('index', $data);
        $this->load->view('layout/footer', $data);
    }
}
