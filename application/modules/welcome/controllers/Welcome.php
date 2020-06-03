<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Welcome extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
        $this->load->model('welcome_model');
    }
    public function index()
    {
        $data['title']     = "SIRUSUN v3.0";
        $data['title2'] = "Dashboard";
        $data['id_provinsi'] = $this->welcome_model->get_id();

        $this->load->view('layout/header', $data);
        $this->load->view('blank', $data);
        $this->load->view('layout/footer', $data);
    }

    public function get_data()
    {
        $data = $this->welcome_model->get_data();
        echo json_encode($data);
    }

    public function get_nama_provinsi()
    {
        $id = $this->input->post('id');
        $data = $this->welcome_model->get_nama_provinsi($id);
        echo json_encode($data);
    }
}
