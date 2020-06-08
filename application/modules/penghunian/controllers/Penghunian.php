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

        $data['rekap_tahun_anggaran'] = $this->db->query('SELECT ta,
            sum(tb) AS total,
            sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
            sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            GROUP BY ta')->result();

        $data['rekap_penerima_manfaat'] = $this->db->query('SELECT nama_penerima_manfaat,
            sum(tb) AS total,
            sum(case when status_huni= "Huni" then tb else 0 end) AS huni,
            sum(case when status_huni= "Belum Huni" then tb else 0 end) AS belum_huni
            FROM tb_bangunan
            GROUP BY nama_penerima_manfaat')->result();


        $this->load->view('layout/header', $data);
        $this->load->view('index', $data);
        $this->load->view('layout/footer', $data);
    }
}
