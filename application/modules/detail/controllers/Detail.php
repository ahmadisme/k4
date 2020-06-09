<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Detail extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
    }
    public function detail_tb()
    {
        $data['title']     = "SIRUSUN v3.0";
        $data['title2'] = "Dashboard";
        $id = $this->uri->segment(3);
        $data['detail'] = $this->db->get_where('tb_bangunan', ['id' => $id])->row();

        $this->load->view('layout/header', $data);
        $this->load->view('detail_tb', $data);
        $this->load->view('layout/footer', $data);
    }
}
