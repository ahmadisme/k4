<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Auth extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
    }

    public function index()
    {
        $this->form_validation->set_rules('email', 'Email', 'required|trim|valid_email');
        $this->form_validation->set_rules('password', 'Password', 'required|trim');

        if ($this->form_validation->run() == false) {
            $data['title'] = "Login";
            $this->load->view('auth/login2', $data);
        } else {
            $this->_login();
        }
    }

    private function _login()
    {
        $email = $this->input->post('email');
        $password = $this->input->post('password');

        $user = $this->db->get_where('tb_user', ['email' => $email])->row();

        if ($user) {
            if ($user->is_active == 1) {
                if (password_verify($password, $user->password)) {
                    $data = [
                        'email' => $user->email,
                        'role_id' => $user->role_id,
                        'id' => $user->id,
                    ];
                    $this->session->set_userdata($data);
                    if ($user->role_id == 1) {
                        redirect('welcome');
                    } else {
                        redirect('user');
                    }
                } else {
                    $this->session->set_flashdata('message', '<div class="alert alert-danger" role="alert">
          Wrong password
          </div>');
                    redirect('auth');
                }
            } else {
                $this->session->set_flashdata('message', '<div class="alert alert-danger" role="alert">
            User not active
          </div>');
                redirect('auth');
            }
        } else {
            $this->session->set_flashdata('message', '<div class="alert alert-danger" role="alert">
            No user
          </div>');
            redirect('auth');
        }
    }

    public function register()
    {
        $this->form_validation->set_rules('name', 'Name', 'required|trim');
        $this->form_validation->set_rules('email', 'Email', 'required|trim|valid_email|is_unique[tb_user.email]', ['is_unique' => 'Email has been already registered']);
        $this->form_validation->set_rules('password1', 'Password', 'required|trim|matches[password2]|min_length[3]', ['matches' => "Password don't match"]);
        $this->form_validation->set_rules('password2', 'Password', 'required|trim|matches[password1]');

        if ($this->form_validation->run() == false) {
            $data['title'] = "Register";
            $this->load->view('auth/register', $data);
        } else {
            $data = [
                'name' => htmlspecialchars($this->input->post('name', true)),
                'email' => htmlspecialchars($this->input->post('email', true)),
                'image' => 'default.jpg',
                'password' => password_hash($this->input->post('password1'), PASSWORD_DEFAULT),
                'role_id' => 2,
                'is_active' => 1,
                'date_created' => time()
            ];
            $this->db->insert('tb_user', $data);
            $this->session->set_flashdata('message', '<div class="alert alert-success" role="alert">
            Registration Success
          </div>');

            redirect('auth');
        }
    }

    public function logout()
    {
        $this->session->unset_userdata('email');
        $this->session->unset_userdata('role_id');
        $this->session->set_flashdata('message', '<div class="alert alert-success" role="alert">
        Logged Out
      </div>');
        redirect('auth');
    }
}
