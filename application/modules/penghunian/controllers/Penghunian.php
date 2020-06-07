<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Penghunian extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        $this->load->model('Penghunian_Model');
    }
    public function index()
    {
        $data['title']     = "SIRUSUN v3.0";
        $data['title2'] = "Dashboard";
        $data['jumlah_tb'] = $this->db->query('SELECT tb, sum(tb) AS total FROM tb_bangunan')->row();
        $data['huni'] = $this->Penghunian_Model->jumlah_huni();
        $data['belum_huni'] = $this->Penghunian_Model->jumlah_belum_huni();

        // $data['tb_huni'] = $this->db->query('SELECT tb,ta,
        // sum(tb) AS total,
        // sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
        // sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
        // FROM tb_bangunan GROUP BY ta')->result();

        // $data['tb_bast'] = $this->db->query('SELECT tb,ta,id_posisi_dokumen_aset,
        // sum(tb) AS total,
        // sum(case when id_posisi_dokumen_aset= "10" then tb else 0 end) AS bast
        // FROM tb_bangunan GROUP BY ta')->result();

        // $data['diagram_pengelolaan'] = $this->db->query('SELECT tb,ta,
        // sum(tb) AS total,
        // sum(case when id_posisi_dokumen_aset= "1" then tb else 0 end) AS belum,
        // sum(case when id_posisi_dokumen_aset= "2" OR id_posisi_dokumen_aset = "3" OR id_posisi_dokumen_aset = "4" OR id_posisi_dokumen_aset = "5" OR id_posisi_dokumen_aset = "6" OR id_posisi_dokumen_aset = "7" OR id_posisi_dokumen_aset = "8" then tb else 0 end) AS proses,
        // sum(case when id_posisi_dokumen_aset= "9" OR id_posisi_dokumen_aset = "10" then tb else 0 end) AS sudah_bast
        // FROM tb_bangunan')->row();


        $this->load->view('layout/header', $data);
        $this->load->view('index', $data);
        $this->load->view('layout/footer', $data);
    }
}
