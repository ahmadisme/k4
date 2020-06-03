<?php
class welcome_model extends CI_Model
{
    public function get_data()
    {
        $id_page = "15";
        $hasil = $this->db->get_where('tb_provinsi', ['id_provinsi' => $id_page]);
        return $hasil->result();
    }

    public function get_id()
    {
        $this->db->from('tb_provinsi');
        $query = $this->db->get();
        return $query;
    }

    public function get_nama_provinsi($id)
    {
        $data = $this->db->get_where('tb_provinsi', ['id_provinsi' => $id]);
        return $data->result();
    }
}
